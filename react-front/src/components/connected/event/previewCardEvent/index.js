import React, { Component } from 'react';
import { Card, Avatar, Icon, Divider, Modal, Row, Col, Button } from 'antd';
import './styles.css';
import geolib from 'geolib'
import Map from "../simpleMap"

class PreviewCardEvent extends Component {
	constructor(props) {
        super(props);

    this.state = {
        visible: false,
        
    }

    }

    getDistance(coordA, coordB){
        const calc = geolib.getDistanceSimple(
            {latitude: coordA.lat, longitude: coordA.lng},
            {latitude: coordB.lat, longitude:coordB.lng}
        );
        return (calc/1000)
    }
    
    openCard = (e) => {
        this.props.state.data.event = this.props.event;
        this.props.updateParent({'currentComponent': 'cardEvent', 'data': this.props.state.data})
    }

    componentWillMount = () => {
        this.distance = this.getDistance(this.props.state.data.userCoord, this.props.event.location.coord).toFixed(0)
        this.date = this.props.event.event_date ? this.formatDateAnnounce(this.props.event.event_date) : "Inconnue"
    }
    openMap(val){
        let calc = geolib.getDistanceSimple(
            {latitude: this.props.state.data.userCoord.lat, longitude: this.props.state.data.userCoord.lng},
            {latitude: this.props.event.location.coord.lat, longitude:this.props.event.location.coord.lng}
        );
        this.setState({'distance':calc/1000});
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

        let classicDate = new Date(date).toLocaleDateString('fr-Fr')
        let timeEvent = new Date(date).getTime();
        let curTime = new Date(new Date()).getTime()
        let timeBeforeEvent = timeEvent - curTime;
        let dayTimeStamp = (3600 * 1000) * 24;
        let weekTimeStamp = dayTimeStamp * 7;

        if (timeBeforeEvent < 0) return "Out dated"
        if (timeBeforeEvent > weekTimeStamp)return "Le : " + classicDate
        else if (timeBeforeEvent === weekTimeStamp) return ("In one week")
        else {
           let day = timeBeforeEvent / dayTimeStamp
            if (day > 0) return ('Tomorow')
            else if (day < 0) return ("Today")
            else return ("In " + day + 'days')
        }
    }
	render() {
        const userPicture = this.props.event.creator.facebookId ? this.props.event.creator.picture : "https://192.168.99.100:4242/userPicture/" + this.props.event.creator.picture
        return (
            <Card
                className="zoomCard"
                style={{ width: 300, display: "inline-block", margin: "1% 2% 0 "}}
                cover={ <img onClick={this.openCard.bind(this)} alt="eventPicture" src={"https://192.168.99.100:4242/eventPicture/" +  this.props.event.picture} />}
                actions={[<Icon type="setting" theme="outlined"/>, <Icon type="edit" theme="outlined"/>, <i onClick={this.openMap.bind(this)} className="fas fa-map-marker"></i>]}
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
                            <p style={{textAlign:'center'}}>À {this.distance} km</p>
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

