import React, { Component } from 'react';
import Create from './createEvent';
import List from './listEvent';
import CardEvent from './cardEvent';
import ListCloseEvent from './listCloseEvent';
import axios from 'axios'
import './styles.css';
import { Tabs, Layout} from 'antd';

import { StickyContainer, Sticky } from 'react-sticky';

class Event extends Component {

	constructor(props) {
		super(props);
		this.state = {
		}
	}

	getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition( (position ) => {
				this.props.state.data.userCoord = {}
				this.props.state.data.userCoord.lat = position.coords.latitude
				this.props.state.data.userCoord.lng = position.coords.longitude
				this.props.updateParent({'data': this.props.state.data})
			});
		}
	}

	componentWillMount() {
		this.setState({loading:true});
		axios.get('https://192.168.99.100:4242/event')
		.then((resp) => {
			this.props.state.data.events = resp.data.reverse()
			this.props.updateParent({'data' : this.props.state.data})
		})
		.catch((err) => {
			this.setState({events: [],loading:false})
			console.log('Events error', err);
		})
	}

	render() {
		this.getLocation();
		if (this.props.state.currentComponent === "cardEvent") {
			return (<CardEvent state={this.props.state} updateParent={this.props.updateParent} />)
		}

		else {
			const { Header, Footer, Content } = Layout;
			const renderTabBar = (props, DefaultTabBar) => (
			<Sticky bottomOffset={80}>
				{({ style }) => (
				<DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
				)}
			</Sticky>
			);
			return (
				<Layout>
					<Header>
						<h1 style={{'textAlign':'center', fontSize:'28px'}}>Gestion des évènenements</h1>
					</Header>
					<Content>
						<StickyContainer>
								<Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
									<Tabs.TabPane tab="Créer un Event" key="1">
										<Create state={this.props.state} updateParent={this.props.updateParent}/>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Liste de vos Events" key="2">
										<List state={this.props.state} updateParent={this.props.updateParent}/>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Liste des évents à proximité" key="3">
										<ListCloseEvent state={this.props.state} updateParent={this.props.updateParent}/>
									</Tabs.TabPane>
								</Tabs>
						</StickyContainer>
					</Content>
					<Footer>

					</Footer>
				</Layout>
			);
		}
	}
}

export default Event;