import React, { Component } from 'react';
import Create from './createEvent';
import List from './listEvent';
import CardEvent from './cardEvent';
import ListCloseEvent from './listCloseEvent';
import PersonalPlayer from './personalPlayer';
import LiveEvent from './liveEvent';
import axios from 'axios'
import './styles.css';
import { Tabs, Layout, Row} from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';

const {Content } = Layout;
class Event extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}

		if (navigator.geolocation && !this.props.state.data.userCoord) {
			navigator.geolocation.getCurrentPosition( (position ) => {
				console.log(position);
				this.props.state.data.userCoord = {}
				this.props.state.data.userCoord.lat = position.coords.latitude
				this.props.state.data.userCoord.lng = position.coords.longitude
				this.props.updateParent({'data': this.props.state.data})
			});
		}
	}


	componentDidMount() {
		axios.get(process.env.REACT_APP_API_URL + '/event')
		.then((resp) => {
			this.props.state.data.events = (resp.data.length > 0) ? resp.data.reverse() : resp.data ;
			this.props.updateParent({'data' : this.props.state.data})
			console.log("ici");
			this.setState({loading:true});
		})
		.catch((err) => {
			this.setState({events: [],loading:false})
			console.log('Events error', err);
		})
	}
	render() {
		if (this.props.state.currentComponent === "cardEvent") {
			return (<CardEvent state={this.props.state} updateParent={this.props.updateParent} />)
		}
		if (!this.state.loading)
			return <p> OUPSI </p>
		else {
			const renderTabBar = (props, DefaultTabBar) => (
			<Sticky bottomOffset={80}>
				{({ style }) => (
				<DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#fff' }} />
				)}
			</Sticky>
			); 
			return (
				<Layout>
					<Content>
						<Row>
							<StickyContainer style={{'textAlign':'center'}}>
								<Tabs style={{'textAlign':'center'}} defaultActiveKey="1" renderTabBar={renderTabBar}>
									<Tabs.TabPane  tab="Créer un Event" key="1">
										<Create state={this.props.state} updateParent={this.props.updateParent}/>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Liste de vos Events" key="2" >
										<List state={this.props.state} updateParent={this.props.updateParent}/>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Liste des évents à proximité" key="3">
										<ListCloseEvent state={this.props.state} updateParent={this.props.updateParent}/>
									</Tabs.TabPane>
									<Tabs.TabPane tab="Personal Player" key="4">
									{
										this.props.state.data.events[0] && this.props.state.data.events[0].playlist ? <PersonalPlayer strokeColor={'#e0e0e0'} color={'#d84315'} tracks={this.props.state.data.events[0].playlist.tracks.data}/> : null
									}
									</Tabs.TabPane>
									<Tabs.TabPane tab="Live Event" key="5">
									{
										this.props.state.data.events[0] && this.props.state.data.events[0].playlist ?  <LiveEvent roomID={this.props.state.data.events[0]._id}playlist={this.props.state.data.events[0].playlist}/> : null
									}
									</Tabs.TabPane>
								</Tabs>
							</StickyContainer>
						</Row>
						
					</Content>
				</Layout>
			);
		}
	}
}

export default Event;