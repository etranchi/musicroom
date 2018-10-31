import React, { Component } from 'react';
import './sidebar.css';

class Sidebar extends Component {

	handleClick() {
		console.log("coucou");
	        this.setState({
            	active: 'test'
        	});
	    }
	render() {
	return (
	  <div className="sidebar">
	    <ul>
	    <li onClick={this.handleClick}>toto</li>
	    <li onClick={this.handleClick}>titi</li>
	    </ul>
	  </div>
	);
	}
}

export default Sidebar;
