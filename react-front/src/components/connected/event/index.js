import React, { Component } from 'react';
import Create from './createEvent';
import List from './listEvent';
import CardEvent from './cardEvent';
import ListCloseEvent from './listCloseEvent';
import PersonalPlayer from './personalPlayer';
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



	render() {
		if (this.props.state.currentComponent === "cardEvent") {
			return (<CardEvent state={this.props.state} updateParent={this.props.updateParent} />)
		}
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
								<Tabs.TabPane  tab="Liste de vos Events" key="1">
									{this.props.state.currentComponent === 'event'? <List state={this.props.state} updateParent={this.props.updateParent}/> : null}
								</Tabs.TabPane>
								<Tabs.TabPane tab="Créer un Event" key="2">
									{this.props.state.currentComponent === 'createEvent'? <Create state={this.props.state} updateParent={this.props.updateParent}/> : null}
								</Tabs.TabPane>
								<Tabs.TabPane tab="Liste des évents à proximité" key="3">
									{this.props.state.currentComponent === 'listCloseEvent'? <ListCloseEvent state={this.props.state} updateParent={this.props.updateParent}/> : null}
								</Tabs.TabPane>
								<Tabs.TabPane tab="Personal Player" key="4">
									{this.props.state.currentComponent === 'Player'? <PersonalPlayer/> : null}
								</Tabs.TabPane>
							</Tabs>
						</StickyContainer>
					</Row>
					
				</Content>
			</Layout>
		);
	}
}

export default Event;