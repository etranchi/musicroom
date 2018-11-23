import React, { Component } from 'react';
import './styles.css';
import Event from './event'
import Playlist from './playlist'
import Setting from './setting'
import Player from './player'
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
			if (navigator.geolocation && !this.props.state.data.userCoord) {
			this.props.state.data.userCoord = {}
			navigator.geolocation.getCurrentPosition( (position ) => {
				this.props.state.data.userCoord.lat = position.coords.latitude
				this.props.state.data.userCoord.lng = position.coords.longitude
				this.props.updateParent({'data': this.props.state.data})
			}, (err) => {
				axios.get('https://geoip-db.com/json/')
				.then((location) => {
					this.props.state.data.userCoord.lat = location.data.latitude
					this.props.state.data.userCoord.lng = location.data.longitude
					this.props.updateParent({'data': this.props.state.data})
					console.log("This Location : ", this.props.state.data.userCoord)
				})
			});
		}
				this.setState({height: window.innerHeight + 'px'});
		}
		toggle(){
				this.setState({
					collapsed: !this.state.collapsed,
				});
		}



	render() {
	return (
        <Layout> 
          	<Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: this.state.height }}>
				{this.props.state.currentComponent === 'event' || this.props.state.currentComponent === 'cardEvent'? <Event state={this.props.state} updateParent={this.props.updateParent}/> : null}
				{this.props.state.currentComponent === 'playlist' || this.props.state.currentComponent === 'createPlaylist' || this.props.state.currentComponent === 'tracks' || this.props.state.currentComponent === 'editPlaylist' ? <Playlist state={this.props.state} updateParent={this.props.updateParent}/> : null}
				{this.props.state.currentComponent === 'setting' || this.props.state.currentComponent === 'editSetting'? <Setting state={this.props.state} updateParent={this.props.updateParent}/> : null}
				{this.props.state.playlistId ? <Player state={this.props.state} /> : null }
			</Content>
        </Layout>
		
	);
  }
}

export default Connected;