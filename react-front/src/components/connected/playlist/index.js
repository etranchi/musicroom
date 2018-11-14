import React, { Component } from 'react';
import './styles.css';
import List from './list'
import Tracks from './tracks'
import CreatePlaylist from './createPlaylist'

class Playlist extends Component {
	render() {
		console.log(this.props.state);
	return (
		<div>
		{this.props.state.currentComponent === 'playlist'? <List updateParent={this.props.updateParent}/> : null}
		{this.props.state.currentComponent === 'tracks'? <Tracks state={this.props.state} updateParent={this.props.updateParent}/> : null}
		{this.props.state.currentComponent === 'createPlaylist'? <CreatePlaylist state={this.props.state} updateParent={this.props.updateParent}/> : null}
		</div>
	);
  }
}

export default Playlist;