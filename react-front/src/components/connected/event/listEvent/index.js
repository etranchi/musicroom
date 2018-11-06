import React, { Component } from 'react';
import { Card, Avatar, Icon } from 'antd';
import './styles.css';
import axios from 'axios'
import PreviewCard from '../previewCardEvent'

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
			events: []
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
		axios.get('https://192.168.99.100:4242/event')
		.then((resp) => {
			this.setState({events: resp.data})
		})
		.catch((err) => {
			console.log('Events error', err);
		})
	}

	// deleteEvent = () => {
	// 	axios.delete('https://192.168.99.100:4242/event');
	// 	console.log("Event Trashed.");
	// }

    
	render() {
		console.log(this.state.events, this.state.events.length)
		if(this.state.events.length === 0 ) {
			console.log("IVI")
			return <div>Loading...</div>
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
								<PreviewCard event={event} updateParent={this.props.updateParent}/>
							)
						})
				}
				</div>
			);
		}
	}
}

export default ListEvent;

