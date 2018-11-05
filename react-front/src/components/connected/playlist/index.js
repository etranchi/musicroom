import React, { Component } from 'react';
import './styles.css';
import List from './list'
import Tracks from './tracks'
import SearchBar from '../searchbar'

class Playlist extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	current: {name: 'list', id: '', tracks: []}
		// }
		// this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	// componentDidUpdate(prevProps){
	// 	if (this.state.current.name === 'tracks')
	// 		// this.setState({current: {name: 'list'}})
	// 		this.state.current.name = 'list'
	// }

	// updateState = (val) => {
	// 	this.setState(val);
	// };

	render() {
		console.log('event index');
	return (
		<div>
		<SearchBar/>
		{this.props.state.currentComponent === 'playlist'? <List updateParent={this.props.updateParent}/> : null}
		{this.props.state.currentComponent === 'tracks'? <Tracks tracks={this.props.state.data} updateParent={this.props.updateParent}/> : null}
		{/* {this.state.current.name === 'music'? <Setting/> : null} */}
		</div>
	);
  }
}

export default Playlist;