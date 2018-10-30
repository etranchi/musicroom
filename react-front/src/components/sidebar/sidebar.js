import React, { Component } from 'react';
import './sidebar.css';

class Sidebar extends Component {
	update = (e) => {
		this.props.onUpdate(e);
	}
	render() {
	return (
	  <div className="sidebar">
	    <ul>
		    <li
			onClick={this.update.bind(this, "login")}>
			login
			</li>
			<li
			onClick={this.update.bind(this, "register")}>
			register
			</li>
	    </ul>
	  </div>
	);
	}
}

export default Sidebar;
