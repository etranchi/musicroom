import React, { Component } from 'react';
import {Tabs, Tab} from 'react-materialize'
import Create from './createEvent';
import List from './listEvent';
import CardEvent from './completCardEvent';
import './styles.css';

class Event extends Component {
	render() {
		if (this.props.state.currentComponent === "cardEvent") {
			return (<CardEvent state={this.props.state} updateParent={this.props.updateParent} />)
		}
		else {
			return (
				<Tabs className='tab-demo z-depth-1'>
					<Tab title="Créer un Event"> <Create state={this.props.state} updateParent={this.props.updateParent}/> </Tab>
					<Tab title="Liste de vos Events" active><List state={this.props.state} updateParent={this.props.updateParent}/></Tab>
					<Tab title="Liste des évents à proximité" ></Tab>
					<Tab title="Mes invitations"> </Tab>
				</Tabs>
			);
		}
	}
}

export default Event;