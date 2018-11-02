import React, { Component } from 'react';
import './styles.css';
import List from './list'
import Tracks from './tracks'
import SearchBar from '../searchbar'

class Playlist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: {name: 'list', id: '', tracks: []}
		}
		// this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	componentDidUpdate(prevProps){
		if (this.state.current.name === 'tracks')
			// this.setState({current: {name: 'list'}})
			this.state.current.name = 'list'
	}

	updateState = (val) => {
		this.setState(val);
	};

	render() {
	return (
		<div>
		<SearchBar/>
		{this.state.current.name === 'list'? <List state={this.updateState}/> : null}
		{this.state.current.name === 'tracks'? <Tracks tracks={this.state.current.tracks} state={this.updateState}/> : null}
		{/* {this.state.current.name === 'music'? <Setting/> : null} */}
		</div>
	);
  }
}

export default Playlist;