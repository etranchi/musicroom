import React, { Component } from 'react';
import {Tabs, Tab} from 'react-materialize'
import Create from './createEvent';
import List from './listEvent';
import './styles.css';

class Event extends Component {
	constructor(props) {
		super(props);
	}
	render() {
	return (
		<Tabs className='tab-demo z-depth-1'>
			<Tab title="List de vos Events" active><List /></Tab>
			<Tab title="Créer un Event"> <Create /> </Tab>
		</Tabs>
	);
  }
}

export default Event;