import React, { Component } from 'react';
import Create from './createEvent';
import List from './listEvent';
import ListCloseEvent from './listCloseEvent';
import PersonalPlayer from './personalPlayer';
import CardEvent from './cardEvent';
import LiveEvent from './liveEvent';
import './styles.css';

class Event extends Component {
	render() {
		return (
			<div>
				{this.props.state.currentComponent === 'cardEvent' && <CardEvent state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.props.state.currentComponent === 'event' && <List state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.props.state.currentComponent === 'createEvent' && <Create state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.props.state.currentComponent === 'listcloseEvent' && <ListCloseEvent state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.props.state.currentComponent === 'personalPlayer' && <PersonalPlayer strokeColor={'#e0e0e0'} color={'#d84315'} tracks={this.props.state.data.events[0].playlist.tracks.data}/>}
				{this.props.state.currentComponent === 'liveEvent' && <LiveEvent state={this.props.state} roomID={this.props.state.data.event._id} playlist={this.props.state.data.event.playlist}/>}
			</div>
		);
	}
}

export default Event;