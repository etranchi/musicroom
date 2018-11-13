import React, { Component } from 'react';
import { Card, Avatar, Icon } from 'antd';
import './styles.css';

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
    
    openCard = (e) => {
        this.props.state.data.event = this.props.event;
        this.props.updateParent({'currentComponent': 'cardEvent', 'data': this.props.state.data})
    }
	render() {
        let userPicture = this.props.event.creator.facebookId ? this.props.event.creator.picture : "https://192.168.99.100:4242/eventPicture/" + this.props.event.creator.picture
    
        return (
            <Card
                className="zoomCard"
                style={{ width: 300, display: "inline-block", margin: "1% 2% 0 "}}
                cover={ <img src={"https://192.168.99.100:4242/eventPicture/" +  this.props.event.picture} />}
                actions={[<Icon  onClick={this.openCard.bind(this)} type="setting" theme="outlined"/>, <Icon type="edit" theme="outlined"/>, <Icon type="ellipsis" theme="outlined" />]}
            >
                <Card.Meta
                avatar={<Avatar size={116} src={userPicture} />}
                title= {this.props.event.creator && this.props.event.creator.login ? this.props.event.creator.login : "Aucun" }
                description={ this.props.event.date_creation ? this.props.event.date_creation :  " A venir ... " }
                />

            </Card>
        )
	}
}

export default PreviewCardEvent;

