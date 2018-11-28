import React, { Component } from 'react';
import './styles.css';
import PreviewCard from '../previewCardEvent'
import { Layout, Row, Col, Button } from 'antd';
import axios from 'axios'

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
			loading:true,
			myEvents: [],
			friendEvents: [],
			allEvents: []
		}
		console.log("list event constructor");		
	}
	

	componentDidMount = () => {
		console.log("list event did mount");
		this.getEvents(ret => {
			this.setState({
				myEvents: ret.myEvents, 
				friendEvents:ret.friendEvents, 
				allEvents: ret.allEvents, 
				loading:false
			})
		});
	}

	getEvents = (callback) => {
		axios.get(process.env.REACT_APP_API_URL + '/event')
		.then(resp => {
			console.log('response get Events');
			console.log(resp.data);
			if (callback)
				callback(resp.data);
			else
			{
				this.setState({
					myEvents: resp.data.myEvents, 
					friendEvents:resp.data.friendEvents, 
					allEvents: resp.data.allEvents, 
					loading:false
				})
			}
		})
		.catch(err => {
				this.setState({
					myEvents: [], 
					friendEvents:[], 
					allEvents: [], 
					loading:false
				})
		})
	}

	

	render() {
		console.log("list event render");
		if( this.state.loading === true ) {
			return (
				<div className="preloader-wrapper active loader">
					<div className="spinner-layer spinner-red-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div><div className="gap-patch">
						<div className="circle"></div>
					</div><div className="circle-clipper right">
						<div className="circle"></div>
					</div>
					</div>
				</div>
			);
		}
		else{
		return (
				<Layout>
					<Layout.Content style={{width:'82%', margin: '0 8% 0 10%'}}>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.myEvents.length > 0 ? <h1 style={{fontSize:'36px'}}> Mes événements : </h1> : null }
						{
							this.state.myEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent} getEvents={this.getEvents}/> )
							})
						}
					</div>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.friendEvents.length > 0 ? <h1 style={{fontSize:'36px'}}>  Evénement ou je participe : </h1> : null }
						{
							this.state.friendEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent} getEvents={this.getEvents}/> )
							})
						}
					</div>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.allEvents.length > 0 ? <h1 style={{fontSize:'36px'}}> Tous les évenements : </h1> : null }
						{
							this.state.allEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent} getEvents={this.getEvents}/> )
								})
						}
					</div>
					</Layout.Content>
				</Layout>
			);
		}
	}
}

export default ListEvent;

