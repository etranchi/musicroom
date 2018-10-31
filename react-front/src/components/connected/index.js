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
		{this.props.currentComponent === 'event'? <Event/> : null}
		{this.props.currentComponent === 'playlist'? <Playlist/> : null}
		{this.props.currentComponent === 'setting'? <Setting/> : null}
		</div>
	);
  }
}

export default Connected;