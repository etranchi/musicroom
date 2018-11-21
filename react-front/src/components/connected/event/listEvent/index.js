import React, { Component } from 'react';
import './styles.css';
import PreviewCard from '../previewCardEvent'
import { Layout} from 'antd';
import axios from 'axios'

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
			loading:false,
			myEvents: [],
			friendEvents: [],
			allEvents: []
		}
	}

	componentDidMount = () => {
		this.getEvents(ret => {
			this.setState({
				myEvents: ret.myEvents, 
				friendEvents:ret.friendEvents, 
				allEvents: ret.allEvents, 
				loading:true
			})
		});
	}

	getEvents = (callback) => {
		console.log('coucou');
		axios.get('https://192.168.99.100:4242/event')
		.then((resp) => {
			console.log('response get Events');
			console.log(resp.data);
			callback(resp.data);
		})
		.catch((err) => {
			console.log('Events error', err);
		})
	}

	render() {
		const {Content } = Layout;
		if (!this.state.loading) 
			return ( <p> OUPSI </p>)
		else {
			return (
				<Layout>
					<Content style={{width:'82%', margin: '0 8% 0 10%'}}>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.myEvents.length > 0 ? <h1 style={{fontSize:'36px'}}> Mes événements : </h1> : null }
						{
							this.state.myEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/> )
							})
						}
					</div>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.friendEvents.length > 0 ? <h1 style={{fontSize:'36px'}}>  Evénement ou je participe : </h1> : null }
						{
							this.state.friendEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/> )
							})
						}
					</div>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.allEvents.length > 0 ? <h1 style={{fontSize:'36px'}}> Tous les évenements : </h1> : null }
						{
							this.state.allEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/> )
								})
						}
					</div>
					</Content>
				</Layout>
			);
		}
	}
}

export default ListEvent;

