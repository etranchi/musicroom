import React, { Component } from 'react';
import './styles.css';
import axios from 'axios'
import PreviewCard from '../previewCardEvent'

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
			events: [],
			loading:false
		}
		this.onLoad = false;
		this.getEvents()
	}
	getEvents() {
		console.log('REQUEST')
		this.setState({loading:true});
		axios.get('https://192.168.99.100:4242/event')
		.then((resp) => {
			this.setState({events: resp.data.reverse(),loading:false})
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
		if (this.props.state.currentComponent != "listEvent" && this.onLoad === false) {
			this.onLoad = true;
		}
		if(this.state.loading === true ) {
			this.onLoad = false;
			return <div>Loading...</div>
		}
		else
		{
			{this.props.updateParent.bind(this,{'currentComponent': 'listEvent', 'data': this.state.events})}
			return (
				<div>
				{
					this.state.events.map((event, key) => {
							return (
								<PreviewCard key={key} event={event} updateParent={this.props.updateParent}/>
							)
						})
				}
				</div>
			);
		}
	}
}

export default ListEvent;

