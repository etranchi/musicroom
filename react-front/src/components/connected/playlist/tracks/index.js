import React, { Component } from 'react';
import './styles.css';
import defaultTrackImg from '../../../../assets/track.png'
import moment from 'moment'
import axios from 'axios'
import { Col, Row, Icon } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PersonalPlayer from '../../event/personalPlayer'
import { moveMusic } from '../../sockets';


const reorder = (list, startIndex, endIndex) => {
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
    		loading: false
		}
	}
	componentDidMount() {
		this.getPlaylist((res) => {
			this.setState({
			  initLoading: false,
			  playlist: res.data
			});
		  });
		
	}

	getPlaylist = (callback) => {
		axios.get('https://192.168.99.100:4242/playlist/' + this.props.state.id, {'headers':{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((resp) => {
			callback(resp);
		})
		.catch((err) => {
			this.setState({playlist:{tracks: {data:[]}}, isloading:false})
			console.log('Playlist error');
			console.log(err);
		})
	}

	delete = () => {
		axios.delete('https://192.168.99.100:4242/playlist/' + this.state.playlist._id,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		)
		.then(resp => {
			this.props.updateParent({'currentComponent':'playlist', id:null})
		})
		.catch(err => {
			console.log(err);
		})
	}

	deleteTrack = (index) => {
		var state = this.state;
		state.playlist.tracks.data.splice(index,1);
		axios.put('https://192.168.99.100:4242/playlist/' + this.state.playlist._id, 
			this.state.playlist,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		)
		.then(resp => {
			this.setState(state);
		})
		.catch(err => {
			console.log(err);
		})
    	
	}
	
	addTrack = (item) => {
		var state = this.state;
		state.playlist.tracks.data.push(item);
		this.setState(state);
	}
	
	onDragEnd = (result) => {
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
		axios.put('https://192.168.99.100:4242/playlist/' + this.state.playlist._id, 
			this.state.playlist,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		)
		.then(resp => {
			this.setState(items);
			moveMusic(this.state.playlist._id)
		})
		.catch(err => {
			console.log(err);
		})

	}
	render() {
		console.log('ciyciy');
		return(
		<div>
			<Row type="flex" justify="space-between">
				<Col>
					<a href="#!" className="btn waves-effect waves-teal" onClick={() => this.props.updateParent({'currentComponent': 'playlist'})}>Back</a>
				</Col>
				<Col>
					{this.state.playlist._id && <a href="#!" className="btn waves-effect" style={{'backgroundColor':'orange'}} onClick={() => this.props.updateParent({'currentComponent': 'editPlaylist'})}>Edit</a>}
				</Col>
			</Row>
				<h3 style={{'textAlign':'center', 'font-size': '20px'}}>{this.state.playlist.title}</h3>
				<DragDropContext onDragEnd={this.onDragEnd}>
				<Droppable droppableId="droppable" isDropDisabled={!this.state.playlist._id}>
				{(provided, snapshot) => (
					<div
					ref={provided.innerRef}
					>
					<ul className="collection">
					{this.state.playlist.tracks.data.map((item, index) => (
						<li className="collection-item avatar">
						<Draggable key={item.id} draggableId={item.id} index={index} >
						{(provided, snapshot) => (
							<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							>
							
							<li className="collection-item avatar" key={index} >
							{this.state.playlist._id && <Icon type="close" style={{'float':'right', 'color':'red','cursor':'pointer'}} onClick={() => this.deleteTrack(index)}></Icon>}
								<span>
									<img src={item.album ? item.album.cover_small || defaultTrackImg : defaultTrackImg} alt="" className="circle"/>
									<span className="title">{item.title} - Duration: {moment.utc(item.duration * 1000).format('mm:ss')}</span>
									<p style={{'font-style':'italic'}}>{item.album ? item.album.title : ""}</p>
								</span>
								
							</li>
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
				{this.state.playlist.tracks.data.length > 0 && <PersonalPlayer  tracks={this.state.playlist.tracks.data}></PersonalPlayer>}
		</div>
		)
  }
}

export default Tracks;