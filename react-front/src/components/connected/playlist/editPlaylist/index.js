import React, { Component } from 'react';
import './styles.css';
import axios from 'axios'
import { Input, Button, Col, Row } from 'antd'

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
  
	return result;
  };
  

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
			console.log('ici');
			console.log(resp.data);
			this.setState({playlist:resp.data, isloading:false})
		})
		.catch((err) => {
			this.setState({playlist:{tracks: {data:[]}}, isloading:false})
			console.log('Playlist error');
			console.log(err);
		})
	}

	handleChange = (e) =>{
		var tmp = this.state.playlist;
		tmp.title = e.target.value;
		this.setState({playlist: tmp});
	}

	save = () =>{
		console.log('toto');
		console.log(this.state.playlist);
		axios.put('https://192.168.99.100:4242/playlist/' + this.state.playlist._id || this.state.playlist.id, 
			this.state.playlist,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		)
		.then(resp => {
			this.props.updateParent({'currentComponent':'tracks'})
		})
		.catch(err => {
			console.log(err);
		})
		console.log('ici');
	}

	delete = () => {
		axios.delete('https://192.168.99.100:4242/playlist/' + this.state.playlist._id || this.state.playlist.id,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		)
		.then(resp => {
			this.props.updateParent({'currentComponent':'playlist', id:null})
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {
		console.log(this.state.playlist);
		console.log('before render');
		console.log('geoignroengre');
		if( this.state.isloading === true ) {
			return (
				<div>
					<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'tracks'})}>Back</a>
					<div>No tracks</div>
				</div>
			);
		}
		return (
			<div>
				
				<Row type="flex" justify="space-between">
					<Col>
						<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'tracks'})}>Back</a>
					</Col>
					<Col>
						<a href="#!" className="btn waves-effect" style={{'backgroundColor': 'red'}} onClick={this.delete}>Delete</a>
					</Col>
				</Row>
				<Input value={this.state.playlist.title} onChange={(e) => this.handleChange(e)}></Input>
				<Button onClick={this.save}>
							Save
						</Button>
				</div>
		);
  }
}

export default EditPlaylist;