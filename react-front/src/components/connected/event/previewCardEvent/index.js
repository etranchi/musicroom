import React, { Component } from 'react';
import { Card, Avatar, Icon, Divider } from 'antd';
import './styles.css';
import geolib from 'geolib'

class PreviewCardEvent extends Component {
	constructor(props) {
        super(props);
		this.card = {
            textAlign: 'center',
			minHeight:"300px",
			margin: "5% 0 0 0"
		}
		this.gridStyleProfile = {
			minHeight:"300px",
			width: '25%',
            textAlign: 'center',
            padding: "0 0 0 0"
        };
        this.profileStyle = {
            minHeight: "50px",
            margin: "8% 0 0 8%",
        }
        this.iconEditionBlockStyle = {
            width: '25%',
        }
        this.descritpionBlockStyle = {
		}
        this.gridStyleInfo = {
			minHeight:"300px",
			width: '25%',
            textAlign: 'center',
		};
		this.gridStylePicture = {
            width: '50%',
           minHeight:"300px",
			padding: "0 0 0 0"
		};
		this.eventPicture = {
			height:"300px",
			width: '100%'
        };
		this.iconStyle = {
			fontSize: '18px',
			float: "left"
		}
		this.iconEditionStyle = {
			padding: "0 7% 0 7% ",
			fontSize: '18px',
		}
		this.iconEditionBlockStyle = {
            position: 'absolute',
            bottom: '0',
            width:"220px"
        }
        this.iconBlockStyle = {
            padding : "20% 0 0 0 "
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
                cover={ <img alt="eventPicture" src={"https://192.168.99.100:4242/eventPicture/" +  this.props.event.picture} />}
                actions={[<Icon  onClick={this.openCard.bind(this)} type="setting" theme="outlined"/>, <Icon type="edit" theme="outlined"/>, <Icon type="ellipsis" theme="outlined" />]}
            >
                <Card.Meta
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

            </Card>
        )
	}
}

export default PreviewCardEvent;

