import React, { Component } from 'react';
import './styles.css';
import Sidebar from './sidebar'
import Event from './event'
import Playlist from './playlist'
import Setting from './setting'

class Connected extends Component {
	constructor(props) {
		super(props);
	}
	deleteToken() {
		localStorage.setItem('token', '');
		this.props.updateParent({'token': ''})
	}

	render() {
	return (
		<div>
		<button onClick={this.deleteToken.bind(this)}>disconnect</button>
		<Sidebar updateParent={this.props.updateParent}/>
		{this.props.state.currentComponent === 'event'? <Event state={this.props.state} updateParent={this.props.updateParent}/> : null}
		{this.props.state.currentComponent === 'playlist' || this.props.state.currentComponent === 'tracks'? <Playlist state={this.props.state} updateParent={this.props.updateParent}/> : null}
		{this.props.state.currentComponent === 'setting'? <Setting state={this.props.state} updateParent={this.props.updateParent}/> : null}
		</div>
	);
  }
}

export default Connected;