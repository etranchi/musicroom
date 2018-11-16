import React, { Component } from 'react';
import './styles.css';
import axios from 'axios'
import defaultTrackImg from '../../../../assets/track.png'
import moment from 'moment'
import { Input } from 'antd'

class EditPlaylist extends Component {
	constructor(props){
		super(props);
		this.state = {
			playlist: {title:'',tracks:{data:[]}},
			isloading: false
		}
	}
	componentDidMount() {
		this.setState({isloading: true});
		axios.get('https://192.168.99.100:4242/playlist/' + this.props.state.id, {'headers':{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((resp) => {
			this.setState({playlist:resp.data, isloading:false})
		})
		.catch((err) => {
			this.setState({playlist:{tracks: {data:[]}}, isloading:false})
			console.log('Playlist error');
			console.log(err);
		})
	}

	handleChange = (e) =>{
		console.log('trying to update Title')
		// var toto = [...this.state.playlist]
		// toto.title = e.target.value
		// console.log(toto);
		this.setState({playlist:[...this.state.playlist, {title:e.target.value}]});
	}

	render() {
		console.log(this.state);
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
				<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'tracks'})}>Back</a>
				<Input value={this.state.playlist.title} onChange={(e) => this.handleChange(e)}></Input>
				<ul className="collection">
						{this.state.playlist.tracks.data.map((val, i) => {
							return (
								<li className="collection-item avatar" key={i}>
									<img src={val.album ? val.album.cover_small || defaultTrackImg : defaultTrackImg} alt="" className="circle"/>
									<span className="title">Title: {val.title} - Duration: {moment.utc(val.duration * 1000).format('mm:ss')}</span>
									<p>Album: {val.album ? val.album.title : ""}</p>
								</li>
							);
						})}
					</ul>
			</div>
		);
  }
}

export default EditPlaylist;