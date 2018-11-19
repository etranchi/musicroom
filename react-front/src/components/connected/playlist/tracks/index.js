import React, { Component } from 'react';
import './styles.css';
import defaultTrackImg from '../../../../assets/track.png'
import moment from 'moment'
import axios from 'axios'
import { Button } from 'antd'


class Tracks extends Component {
	constructor(props){
		super(props);
		this.state = {
			tracks: [],
			isloading: false
		}
	}
	componentDidMount() {
		this.setState({isloading: true});
		axios.get('https://192.168.99.100:4242/playlist/' + this.props.state.id, {'headers':{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((resp) => {
			this.setState({tracks: resp.data.tracks.data, isloading:false})
		})
		.catch((err) => {
			this.setState({tracks: [], isloading:false})
			console.log('Playlist error');
			console.log(err);
		})
	}
	render() {
		console.log(this.state)
		if( this.state.isloading === true ) {
			return (
				<div>
					<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'playlist', 'data': []})}>Back</a>
					<div>No tracks</div>
				</div>
			);
		}
		return (
			<div>
				<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'playlist', 'data': []})}>Back</a>
				<Button onClick={this.props.updateParent.bind(this,{'currentComponent': 'editPlaylist'})}>Edit</Button>
				<ul className="collection">
					{this.state.tracks.map((val, i) => {
						return (
							<li className="collection-item avatar" key={i}>
								<img src={val.album ? val.album.cover_small || defaultTrackImg : defaultTrackImg} alt="" className="circle"/>
								<span className="title">Title: {val.title} - Duration: {moment.utc(val.duration * 1000).format('mm:ss')}</span>
								<p>Album: {val.album ? val.album.title : ""}</p>
							</li>
						);
					})}
				</ul>
				<iframe title="deezerplayer" scrolling="no" frameBorder="0" allowtransparency="true" src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id="+this.props.state.id+"&app_id=310224"} width="700" height="350"></iframe>
			</div>
		);
  }
}

export default Tracks;