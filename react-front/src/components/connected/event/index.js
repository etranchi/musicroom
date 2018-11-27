import React, { Component } from 'react';
import { Card, Avatar, Icon, Divider, Modal, Row, Col, Button } from 'antd';
import Create from './createEvent';
import List from './listEvent';
import ListCloseEvent from './listCloseEvent';
import PersonalPlayer from './personalPlayer';
import CardEvent from './cardEvent';
import LiveEvent from './liveEvent';
import './styles.css';

class Event extends Component {

	constructor(props) {
		super(props)
		this.state = {
			currentSubView: 'listEvent'
		}

		this.selectedMenu = {
			'backgroundColor':'#00897b',
			'opacity':1,
			'color':'white'
		  }	
	}
	componentDidMount() {
	}

	changeView = (value) => {
		this.setState({currentSubView : value})
	}


	
	render() {
		if (this.props.state.currentComponent === 'cardEvent' && this.state.currentSubView)
			this.setState({currentSubView:''})
		return (
			<div>
				{
					this.props.state.currentComponent === 'event' ?
						<Row style={{height:'160px'}}>
							<Col span={1}/>
							<Col span={7}  style={this.state.currentSubView === 'createEvent' ? this.selectedMenu : null} className="cardStyle" >
								<div className="SimpleBgHover">
									<b className="textStyle" onClick={this.changeView.bind(this, 'createEvent')}>  Nouvelle Évènement </b>
								</div>
							</Col>
							<Col span={7} style={this.state.currentSubView === 'listEvent' ? this.selectedMenu : null} className="cardStyle" >
								<div className="SimpleBgHover">
									<b className="textStyle" onClick={this.changeView.bind(this, 'listEvent')}>  Liste Évènements </b>
								</div>
							</Col>
							<Col span={7} style={this.state.currentSubView === 'listcloseEvent' ? this.selectedMenu : null} className="cardStyle" >
								<div className="SimpleBgHover">
									<b className="textStyle" onClick={this.changeView.bind(this, 'listcloseEvent')}>  Évènements à proximités </b>
								</div>
							</Col>					
							<Col span={2}/>
						</Row>
						:
						null 
				}
				{this.props.state.currentComponent === 'cardEvent' && <CardEvent state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.state.currentSubView === 'createEvent' && <Create state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.state.currentSubView === 'listEvent' && <List state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.state.currentSubView === 'listcloseEvent' && <ListCloseEvent state={this.props.state} updateParent={this.props.updateParent}/>}
				{this.state.currentSubView === 'personalPlayer' && <PersonalPlayer strokeColor={'#e0e0e0'} color={'#d84315'} tracks={this.props.state.data.events[0].playlist.tracks.data}/>}
				{this.state.currentSubView === 'liveEvent' && <LiveEvent state={this.props.state} roomID={this.props.state.data.event._id} playlist={this.props.state.data.event.playlist}/>}
			</div>
		);
	}
}

export default Event;