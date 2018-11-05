import React, { Component } from 'react';
import {Tabs, Tab} from 'react-materialize'
import Create from './createEvent';
import List from './listEvent';
import './styles.css';

class Event extends Component {
	render() {
	return (
		<Tabs className='tab-demo z-depth-1'>
			<Tab title="Créer un Event"> <Create /> </Tab>
			<Tab title="Liste de vos Events" active><List /></Tab>
			<Tab title="Liste des évents à proximité" ></Tab>
			<Tab title="Mes invitations"> </Tab>
		</Tabs>
	);
  }
}

export default Event;