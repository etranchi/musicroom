import React, { Component } from 'react';
import defaultTrackImg from '../../../../assets/track.png'
import moment from 'moment'
import axios from 'axios'
import { Col, Row, Icon, Layout, Select, message } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Player from '../../../other/player'
import SearchBar from '../../../other/searchbar'
import Error from '../../../other/errorController'
import { leavePlaylist, joinPlaylist, updatePlaylist, socket, blockSocketEvent } from '../../../other/sockets';

const reorder = (list, startIndex, endIndex) => {
	console.log("IN REORDER")
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
  
	return result;
  };

class Tracks extends Component {
	constructor(props){
		super(props);
		this.state = {
			playlist: {title:'',tracks:{data:[]}},
			initLoading: true,
			loading: false,
			isBlocked: true,
			playlists:[]
		}
	}
	componentDidMount() {
		socket.on('blockPlaylist', () => {
			console.log("JE BLOCK LA PLAYLIST POUR TOUS LES AUTRES")
			this.getPlaylist((res) => {
				this.setState({
				initLoading: false,
				playlist: res.data,
				isBlocked: true
				});
			});
		})
		socket.on('playlistUpdated', () => {
			console.log("playlistUpdated socket event")
			this.getPlaylist((res) => {
				this.setState({
					initLoading: false,
					playlist: res.data,
					isBlocked: !res.data._id
				});
			});
		})
		this.getPlaylists((res) => {
			this.setState({
			  playlists: res.data,
			});
		});

		this.getPlaylist((res) => {
			res.data._id && joinPlaylist(res.data._id)
			this.setState({
			  initLoading: false,
			  playlist: res.data,
			  isBlocked: !res.data._id
			});
		});	
	}

	componentWillUnmount() {
		leavePlaylist(this.state.playlist._id)
	}

	getPlaylist = (callback) => {
		axios.get(process.env.REACT_APP_API_URL + '/playlist/' + this.props.state.id, 
		{'headers':{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((resp) => {
			callback(resp);
		})
		.catch((err) => {
			this.setState({playlist:{tracks: {data:[]}}, isloading:false})
			console.log('Playlist error');
			console.log(err);
		})
	}

	getPlaylists = (callback) => {
		axios.get(process.env.REACT_APP_API_URL + '/playlist', 
		{'headers':{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((resp) => {
			console.log("get playlists");
			console.log(resp.data);
			callback(resp)
		})
		.catch((err) => {
			this.setState({playlists: [], loading:false})
			console.log('Playlist error');
			console.log(err);
		})
	}

	delete = () => {
		axios.delete(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist._id,
		{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then(() => {
			this.props.updateParent({'currentComponent':'playlist', id:null})
		})
		.catch(err => {
			console.log(err);
		})
	}

	deleteTrack = (index) => {
		console.log("Je suis lock ? " + this.state.isBlocked)
		if (this.state.playlist.id)
		{
			axios.delete(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist.id + '/' + this.state.playlist.tracks.data[index].id, 
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
			.then(() => {
				var state = this.state;
				state.playlist.tracks.data.splice(index,1);
				this.setState(state);
				updatePlaylist(this.state.playlist._id)
			})
			.catch(err => {
				console.log(err);
			})
		}
		else if (this.state.isBlocked === false) {
			var state = this.state;
			state.playlist.tracks.data.splice(index,1);
			axios.put(process.env.REACT_APP_API_URL + '/playlist/' + (this.state.playlist._id || this.state.playlist.id), 
			this.state.playlist,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
			.then(() => {
				this.setState(state);
				updatePlaylist(this.state.playlist._id)
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
	
	addTrack = (item) => {
		var state = this.state;
		state.playlist.tracks.data.push(item);
		this.setState(state);
		axios.put(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist._id,
		this.state.playlist,
		{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then(() => {
			this.setState(state);
			message.success("Music Successfully added");
		})
		.catch(err => {
			Error.display_error(err);
		})
	}

	onDragStart = () => {
		console.log("BLOCK SOCKET")	
		blockSocketEvent(this.state.playlist._id)
	}
	
	onDragEnd = (result) => {
		console.log("In DRAG END")
		if (!result.destination) {
		  return;
		}
		var state = this.state;
		const items = reorder(
		  this.state.playlist.tracks.data,
		  result.source.index,
		  result.destination.index
		);
		state.playlist.tracks.data = items;
		axios.put(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist._id, 
		this.state.playlist,
		{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then(() => {
			updatePlaylist(this.state.playlist._id)
			this.setState(items);
		})
		.catch(err => {
			console.log(err);
		})
	}
	handleChange = (array) => {
		axios.put(process.env.REACT_APP_API_URL + '/playlist/' + (this.state.playlists[array[0]]._id || this.state.playlists[array[0]].id)  + '/track',
		 {id: array[1].id},
		 {'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.catch(err => {
			console.log("[error] add track to playlist");
			console.log(err);
		})
	  }

	render() {
		console.log(this.state);
		return(
		<div>
			
			<Row type="flex" justify="space-between">
				<Col>
					<a 
					href="#!" 
					className="btn waves-effect waves-teal" 
					onClick={() => this.props.updateParent({'currentComponent': 'playlist'})}>Back
					</a>
				</Col>
				<Col>
					{this.state.playlist._id && 
					<a 
					href="#!" 
					className="btn waves-effect" 
					style={{'backgroundColor':'orange'}} 
					onClick={() => this.props.updateParent({'currentComponent': 'editPlaylist'})}>Edit
					</a>}
				</Col>
			</Row>
			<Layout.Content>
				<h3 style={{'textAlign':'center', 'fontSize': '20px'}}>{this.state.playlist.title}</h3>
				<DragDropContext 
					onDragEnd={this.onDragEnd} 
					onDragStart={this.onDragStart}>
					<Droppable 
						droppableId="droppable" 
						isDragDisabled={this.state.isBlocked} 
						isDropDisabled={this.state.isBlocked}>
						{(provided, snapshot) => (
							<div
							ref={provided.innerRef}
							>
							<ul className="collection">
							{this.state.playlist.tracks.data.map((item, index) => (
								<li className="collection-item avatar" key={index}>
								<Draggable 
									key={item.id} 
									draggableId={item.id} 
									index={index} >
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}>
									{<Icon 
										type="close" 
										style={{'float':'right', 'color':'red','cursor':'pointer'}} 
										onClick={() => this.deleteTrack(index)}>
									</Icon>}
									<span>
										<img 
											src={item.album ? item.album.cover_small || defaultTrackImg : defaultTrackImg} 
											alt="" 
											className="circle"/>
										<span className="title">{item.title} - Duration: {moment.utc(item.duration * 1000).format('mm:ss')}</span>
										<p style={{'fontStyle':'italic'}}>{item.album ? item.album.title : ""}</p>
									</span>
									<Select style={{ width: 120 }} onChange={this.handleChange}>
										{this.state.playlists.map((playlist, i) => {
											return ( <Select.Option value={[i, item]} >{playlist.title} </Select.Option> )})
										}
									</Select>
									</div>
								)}
								</Draggable>
								</li>
							))}
							</ul>
							{provided.placeholder}
							</div>
						)}
					</Droppable>
      			</DragDropContext>
				<SearchBar type="tracks" updateParent={this.props.updateParent} addTrack={this.addTrack}/>
				{this.state.playlist.tracks.data.length > 0 && 
					<Player  tracks={this.state.playlist.tracks.data}/>
				}
				</Layout.Content>
		</div>
		)
  }
}

export default Tracks;