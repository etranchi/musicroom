import React, { Component } from 'react';
import './styles.css';
import List from './list'
import Tracks from './tracks'
import SearchBar from '../searchbar'
import axios from 'axios'

class Playlist extends Component {
	constructor(props){
		super(props);
	}
	render() {
	return (
		<div>
		<SearchBar updateParent={this.props.updateParent}/>
		{this.props.state.currentComponent === 'playlist'? <List updateParent={this.props.updateParent}/> : null}
		{this.props.state.currentComponent === 'tracks'? <Tracks state={this.props.state} updateParent={this.props.updateParent}/> : null}
		</div>
	);
  }
}

export default Playlist;