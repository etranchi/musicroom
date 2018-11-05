import React, { Component } from 'react';
import { Card, Avatar, Icon } from 'antd';
import './styles.css';
import axios from 'axios'

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
			events: [],
			isloading:false
		}
		this.card = {
			minHeight:"300px",
			margin: "5% 0 0 0"
		}
		this.gridStyle = {
			minHeight:"300px",
			width: '25%',
			textAlign: 'center',
		};
		this.gridStylePicture = {
			width: '50%',
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
			margin: "50% 0 0 0"
		}
		this.iconBlockStyle = {
			margin: "8% 0 0 0"
		}
		this.descritpionBlockStyle = {
			margin: "50% 0 0 0"
		}
	}
		
	componentDidMount = () => {
		console.log('REQUEST')
		this.setState({loading:true});
		axios.get('https://192.168.99.100:4242/event')
		.then((resp) => {
			this.setState({events: resp.data,loading:false})
		})
		.catch((err) => {
			this.setState({events: [],loading:false})
			console.log('Events error', err);
		})
	}

	// deleteEvent = () => {
	// 	axios.delete('https://192.168.99.100:4242/event');
	// 	console.log("Event Trashed.");
	// }

    
	render() {
		console.log(this.state.events, this.state.events.length)
		if(this.state.isloading === true ) {
			console.log("IVI")

			return <div style={{'textAlign':'center'}} height={2} width={2}><Icon type='loading'/></div>
		}
		else
		{
			console.log("EVENT : ")
			return (
				<div>
				{ console.log(this.state.events)}
				{
					this.state.events.map((event) => {
							return (
									<Card title={event.title} style={this.card}>
										<Card.Grid style={this.gridStyle}>
											<Card.Meta
											avatar={<Avatar src={"https://192.168.99.100:4242/eventPicture/" +  event.picture} />}
											title= {event.creator && event.creator.login ? event.creator.login : "Aucun" }
											/>
											<div style={this.descritpionBlockStyle}>
												<b> { event.descritpion ? event.descritpion : "Aucune descritpion ..." }</b>
											</div>
											<div style={this.iconEditionBlockStyle}>
											<Icon style={this.iconEditionStyle} type="setting" theme="outlined" />
											<Icon style={this.iconEditionStyle} type="edit" theme="outlined" />
											<Icon style={this.iconEditionStyle} type="delete" theme="outlined" />
											</div>
										</Card.Grid>
										<Card.Grid style={this.gridStyle}>
										<div style={this.iconBlockStyle}>
											<Icon  style={this.iconStyle} type="pushpin" theme="outlined" />
											<b style={this.iconNameStyle}>Paris {/* {this.event.address.v} */} </b>
										</div>
										<div style={this.iconBlockStyle}>
											<Icon  style={this.iconStyle} type="clock-circle" theme="outlined" />
											<b style={this.iconNameStyle}> { event.date_creation ? event.date_creation : " à définir .." }</b>
										</div>
										<div style={this.iconBlockStyle}>
											<Icon  style={this.iconStyle} type={ event.public ? "unlock" : "lock" } theme="outlined" />
											<b style={this.iconNameStyle}> { event.public ? " Public" : " Privé" }</b>
										</div>
										<div style={this.iconBlockStyle}>
											<Icon style={this.iconStyle} type="user" theme="outlined" />
											<b style={this.iconNameStyle}> { event.members.count ? event.members.count + " participants" : "0 participant" }</b>
										</div>
										</Card.Grid>
										<Card.Grid style={this.gridStylePicture}>
											<img style={ this.eventPicture} alt="example" src={"https://192.168.99.100:4242/eventPicture/" +  event.picture} />
										</Card.Grid>
									</Card>
							)
						})
				}
				</div>
			);
		}
	}
}

export default ListEvent;

