import React, { Component } from 'react';
import './styles.css';
import Event from './event'
import Playlist from './playlist'
import Setting from './setting'
import axios from 'axios'
import { Layout} from 'antd';

const {Content} = Layout;


class Connected extends Component {
		constructor(props){
			super(props);
			this.state = {
				collapsed: true,
				height: props.height,
			};
		}

		componentWillMount(){
			this.getGeolocalisation();
			this.getEvents();
			this.getUser();
		}

		getUser = () => {
			axios.get(process.env.REACT_APP_API_URL + '/user/me', 
			{'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
			.then((resp) => {
				this.props.updateParent({user:resp.data});
			})
			.catch((err) => {
				console.log("error user");
			})
		}

		getGeolocalisation = () => {
			if (navigator.geolocation && !this.props.state.data.userCoord) {
				console.log("first if");
				this.props.state.data.userCoord = {}
				navigator.geolocation.getCurrentPosition( (position ) => {
					this.props.state.data.userCoord.lat = position.coords.latitude
					this.props.state.data.userCoord.lng = position.coords.longitude
					this.props.updateParent({'data': this.props.state.data})



				}, (err) => {
					console.log("error");
					console.log(err);
					axios.get('https://geoip-db.com/json/')
					.then(location => {
						this.props.state.data.userCoord.lat = location.data.latitude
						this.props.state.data.userCoord.lng = location.data.longitude
						this.props.updateParent({'data': this.props.state.data})
					})
					.catch(err => {
						console.log('error 2 ' + err);
						this.props.state.data.userCoord.lat = 0
						this.props.state.data.userCoord.lng = 0
						this.props.updateParent({'data': this.props.state.data})
						this.setState({})
					})
				});
			}
			this.setState({height: window.innerHeight + 'px'});
		}

		getEvents = () => {
			axios.get(process.env.REACT_APP_API_URL + '/event')
			.then((resp) => {
				this.props.state.data.events = (resp.data.length > 0) ? resp.data.reverse() : resp.data ;
				this.props.updateParent({'data' : this.props.state.data})
			})
			.catch((err) => {
				this.setState({events: []})
			})
		}

		toggle(){
				this.setState({
					collapsed: !this.state.collapsed,
				});
		}

		openCard = (event) => {
			this.props.state.data.event = event;
			this.props.updateParent({'currentComponent': 'cardEvent', 'data': this.props.state.data})
		}



	render() {
		return (
			
			<Layout> 
				<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: this.state.height }}>
					{this.props.state.data.userCoord.lat && this.props.state.data.userCoord.lng && (this.props.state.currentComponent === 'event' || this.props.state.currentComponent === 'createEvent' || this.props.state.currentComponent === 'liveEvent' || this.props.state.currentComponent === 'cardEvent')? <Event state={this.props.state} updateParent={this.props.updateParent}/> : null}
					{this.props.state.currentComponent === 'playlist' || this.props.state.currentComponent === 'createPlaylist' || this.props.state.currentComponent === 'tracks' || this.props.state.currentComponent === 'editPlaylist' ? <Playlist state={this.props.state} updateParent={this.props.updateParent}/> : null}
					{this.props.state.currentComponent === 'setting' || this.props.state.currentComponent === 'editSetting'? <Setting state={this.props.state} updateParent={this.props.updateParent}/> : null}
				</Content>
			</Layout>
			
		);
  }
}

export default Connected;