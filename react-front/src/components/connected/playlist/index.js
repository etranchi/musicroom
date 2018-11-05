import React, { Component } from 'react';
import './styles.css';
import List from './list'
import Tracks from './tracks'
import SearchBar from '../searchbar'
import axios from 'axios'

class Playlist extends Component {
	constructor(props){
		super(props);
		console.log('before');
		console.log(this.props);
	}
	updateTracks(item){
		axios.get('https://192.168.99.100:4242/playlist/'+ item.id)
		.then((resp) => {
			console.log('resp =>');
			console.log(resp.data.tracks.data)
			this.props.updateParent({'currentComponent': 'tracks', 'data': resp.data.tracks.data});
		})
		.catch((err) => {
			console.log('Playlist error');
			console.log(err);
		})
		
		
	}
	render() {
	return (
		<div>
		<SearchBar updateTracks={this.updateTracks.bind(this)}/>
		{this.props.state.currentComponent === 'playlist'? <List updateParent={this.props.updateParent}/> : null}
		{this.props.state.currentComponent === 'tracks'? <Tracks tracks={this.props.state.data} updateParent={this.props.updateParent}/> : null}
		</div>
	);
  }
}

export default Playlist;