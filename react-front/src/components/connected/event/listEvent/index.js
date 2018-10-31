import React, { Component } from 'react';
import {Collapsible, CollapsibleItem} from 'react-materialize'
import './styles.css';
import axios from 'axios'

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
					events: []
				}
		};
		
		componentDidMount = () => {
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
		if( this.state.events[0] === undefined ) {
			return <div>Loading...</div>
		}
		return (
			<Collapsible>
			{ console.log("Event : ", this.state.events) }
			{
				this.state.events.map((event) => {
						return (
							<CollapsibleItem header={event.title} icon="library_music">
								<img src={event.picture} ></img>
								<p>Date de création:</p>
								<p> Playlist name :</p>
								<p> Nombre de membres :</p>
								<p> Admins : </p>
								<p> Descrition : {event.descritpion} </p>
								{/* <i onClick={this.deleteEvent(event._id)} icon='filter_drama'>Delete</i>  */}
							</CollapsibleItem>
						);
					})
			}
			</Collapsible>
		);
  }
}

export default ListEvent;