import React, { Component } from 'react';
import { Card, Avatar, Icon, Input } from 'antd';
import './styles.css';

class PreviewCardEvent extends Component {
	constructor(props) {
        super(props);
		this.card = {
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
            width: '25%',
		}
    }
    
    openCard = (e) => {
        console.log("OPEN")
        this.props.updateParent({'currentComponent': 'cardEvent', 'data': this.props.event})
    }
	render() {
        return (
                <Card title={this.props.event.title} style={this.card}>
                    <Card.Grid style={this.gridStyleProfile}>
                        <Card.Meta
                        style= {this.profileStyle}
                            avatar={<Avatar src={"https://192.168.99.100:4242/eventPicture/" +  this.props.event.picture} />}
                            title= {this.props.event.creator && this.props.event.creator.login ? this.props.event.creator.login : "Aucun" }
                        />
                        <div style={this.descritpionBlockStyle}>
                            <b> { this.props.event.descritpion ? this.props.event.descritpion : "Aucune descritpion ..." }</b>
                        </div>
                        <div style={this.iconEditionBlockStyle}>
                        <Icon style={this.iconEditionStyle} onClick={this.openCard.bind(this)} type="setting" theme="outlined" />
                        <Icon style={this.iconEditionStyle} type="edit" theme="outlined" />
                        <Icon style={this.iconEditionStyle} type="delete" theme="outlined" />
                        </div>
                    </Card.Grid>
                    <Card.Grid style={this.gridStyleInfo}>
                    <div style={this.iconBlockStyle}>
                        <Icon  style={this.iconStyle} type="pushpin" theme="outlined" />
                        <b style={this.iconNameStyle}>Paris {/* {this.this.props.event.address.v} */} </b>
                    </div>
                    <div style={this.iconBlockStyle}>
                        <Icon  style={this.iconStyle} type="clock-circle" theme="outlined" />
                        <b style={this.iconNameStyle}> { this.props.event.date_creation ? this.props.event.date_creation : " à définir .." }</b>
                    </div>
                    <div style={this.iconBlockStyle}>
                        <Icon  style={this.iconStyle} type={ this.props.event.public ? "unlock" : "lock" } theme="outlined" />
                        <b style={this.iconNameStyle}> { this.props.event.public ? " Public" : " Privé" }</b>
                    </div>
                    <div style={this.iconBlockStyle}>
                        <Icon style={this.iconStyle} type="user" theme="outlined" />
                        <b style={this.iconNameStyle}> { this.props.event.members.count ? this.props.event.members.count + " participants" : "0 participant" }</b>
                    </div>
                    </Card.Grid>
                    <Card.Grid style={this.gridStylePicture}>
                        <img style={ this.eventPicture} alt="example" src={"https://192.168.99.100:4242/eventPicture/" +  this.props.event.picture} />
                    </Card.Grid>
                </Card>
        )
	}
}

export default PreviewCardEvent;

