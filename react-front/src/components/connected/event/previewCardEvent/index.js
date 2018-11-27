import React, { Component } from 'react';
import { Card, Avatar, Icon, Divider, Modal, Row, Col, Button } from 'antd';
import './styles.css';
import geolib from 'geolib'
import Map from "../simpleMap"
import axios from 'axios'

class PreviewCardEvent extends Component {
	constructor(props) {
        super(props);

    this.state = {
        visible: false,
        distance: 0
    }

    }

    getDistance = (coordA, coordB) =>  {
        let R     = 6371; // km
        let dLat  = this.toRad(coordB.lat - coordA.lat);
        let dLon  = this.toRad(coordB.lng - coordA.lng);
        let lat1  = this.toRad(coordA.lng);
        let lat2  = this.toRad(coordB.lng);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c;
        return d.toFixed(0);
    }
   toRad = (Value) => {
        return Value * Math.PI / 180;
    }
    
    openCard = (e) => {
        this.props.state.data.event = this.props.event;
        this.props.updateParent({'currentComponent': 'cardEvent', 'data': this.props.state.data})
    }

    componentDidMount = () => {
        let distance = this.getDistance(this.props.event.location.coord, this.props.state.data.userCoord);
        this.setState({distance:distance})
        this.date = this.props.event.event_date ? this.formatDateAnnounce(this.props.event.event_date) : "Inconnue"
    }

    openMap(val){
        this.showModal();
    }
    showModal = () => {
        this.setState({visible: true});
    }
    handleOk = (e) => {
        this.setState({visible: false});
    }
    
    handleCancel = (e) => {
        this.setState({visible: false});
    }
    formatDateAnnounce = (date) => {
        let classicDate         = new Date(date).toLocaleDateString('fr-Fr')
        let timeEvent           = new Date(date).getTime();
        let curTime             = new Date(new Date()).getTime()
        let timeBeforeEvent     = timeEvent - curTime;
        let dayTimeStamp        = (3600 * 1000) * 24;
        let weekTimeStamp       = dayTimeStamp * 7;

        if (timeBeforeEvent < 0.0) return "Out dated"
        if (timeBeforeEvent > weekTimeStamp)return "Le : " + classicDate
        else if (timeBeforeEvent === weekTimeStamp) return ("In one week")
        else {
           let day = Math.round(timeBeforeEvent / dayTimeStamp)
            if (day === 1) return ('Tomorow')
            else if (day === 0) return ("Today")
            else return ("In " + day + 'days')
        }
    }
    delete = () => {
        console.log('couccou');
        console.log(this.props.event);
        axios.delete(process.env.REACT_APP_API_URL + '/event/'+ this.props.event._id, {headers:{Authorization: 'Bearer ' + localStorage.getItem('token')}})
        .then(resp => {
            console.log(resp);
            this.props.getEvents();
            console.log('deleted soit disant');
        })
        .catch(err => {
            console.log(err);
            console.log('not deleted');
        })
    }
	render() {
        
        const userPicture = this.props.event.creator.facebookId ? this.props.event.creator.picture : process.env.REACT_APP_API_URL + "/userPicture/" + this.props.event.creator.picture
        return (
            <Card
                className="zoomCard"
                style={{ width: 300, display: "inline-block", margin: "1% 2% 0 "}}
                cover={ <img onClick={this.openCard.bind(this)} alt="eventPicture" src={process.env.REACT_APP_API_URL + "/eventPicture/" +  this.props.event.picture} />}
                actions={[<Icon type="setting" theme="outlined"/>, <Icon type="edit" theme="outlined"/>, <i onClick={this.openMap.bind(this)} className="fas fa-map-marker"></i>,<i onClick={this.delete} className="fas fa-trash-alt"></i>]}
            >
                <Card.Meta
                    onClick={this.openCard.bind(this)}
                    avatar={<Avatar size={116} src={userPicture} />}
                    title= {this.props.event.creator && this.props.event.creator.login ? this.props.event.creator.login : "Aucun" }
                    description=
                    {
                        <div>
                            <p style={{textAlign:'center'}}>{this.date}</p>
                            <Divider />
                            <p style={{textAlign:'center'}}>À {this.state.distance} km</p>
                        </div>
                    }
                />
                
                <Modal
                    title={"Vous êtes à " + this.state.distance + "km"}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                
                    <Map state={this.props.state} openCard={this.openCard} event={this.props.event}/>
                    <Row>
					<Col span={11}></Col>
					<Col span={4}>
						<Button  onClick={this.openCard.bind(this)}> Voir l'évent </Button>
					</Col>
				</Row>
                
            </Modal>
            </Card>
        )
	}
}

export default PreviewCardEvent;

