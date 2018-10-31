import React, { Component } from 'react';
import {SideNav, SideNavItem, Button} from 'react-materialize'
import './styles.css';

class Connected extends Component {
	constructor(props) {
		super(props);
	}
	render() {
	return (
		<SideNav
		  trigger={<Button>SIDE NAV DEMO</Button>}
		  options={{ closeOnClick: true }}
		  >
		  <SideNavItem userView
		    user={{
		      background: 'img/office.jpg',
		      image: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10156644156494687&height=50&width=50&ext=1543582196&hash=AeRThegkHRm8__6S',
		      name: 'John Doe',
		      email: 'jdandturk@gmail.com'
		    }}
		  />
		  <SideNavItem href='#!icon' icon='cloud' onClick={this.props.updateParent.bind(this, {'currentComponent':'event'})}>Event</SideNavItem>
		  <SideNavItem divider />
		  <SideNavItem href='#!icon' icon='cloud' onClick={this.props.updateParent.bind(this, {'currentComponent':'playlist'})}>Playlist</SideNavItem>
		  <SideNavItem divider />
		  <SideNavItem href='#!icon' icon='cloud' onClick={this.props.updateParent.bind(this, {'currentComponent':'setting'})}>Setting</SideNavItem>
		</SideNav>
	)
  }
}

export default Connected;