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
	render() {
	return (
		<div>
		<button onClick={this.props.updateParent.bind(this,{'token':''})}>disconnect</button>
		<Sidebar updateParent={this.props.updateParent}/>
		{this.props.currentComponent === 'event'? <Event/> : null}
		{this.props.currentComponent === 'playlist'? <Playlist/> : null}
		{this.props.currentComponent === 'setting'? <Setting/> : null}
		</div>
	);
  }
}

export default Connected;