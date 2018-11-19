import React, { Component } from 'react';
import './styles.css';
import axios from 'axios'
import defaultTrackImg from '../../../../assets/track.png'
import moment from 'moment'
import { Input, Button, Icon } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SearchBar from '../../searchbar'

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

	deleteTrack = (index) => {
		var state = this.state;
		state.playlist.tracks.data.splice(index,1);
    	this.setState(state);
	}
	
	addTrack = (item) => {
		var state = this.state;
		state.playlist.tracks.data.push(item);
		this.setState(state);
	}
	
	onDragEnd = (result) => {
		// dropped outside the list
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
		console.log('items');
		console.log(items);
		this.setState(items);

	}

	render() {
		console.log(this.state.playlist);
		console.log('before render');
		if( this.state.isloading === true ) {
			return (
				<div>
					<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'playlist', 'data': []})}>Back</a>
					<div>No tracks</div>
				</div>
			);
		}
		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
            >
              {this.state.playlist.tracks.data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <li className="collection-item avatar" key={index} >
						<img src={item.album ? item.album.cover_small || defaultTrackImg : defaultTrackImg} alt="" className="circle"/>
						<span className="title">Title: {item.title} - Duration: {moment.utc(item.duration * 1000).format('mm:ss')}</span>
						<p>Album: {item.album ? item.album.title : ""}</p>
						<Icon type="close" onClick={() => this.deleteTrack(index)}></Icon>
					</li>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        	</Droppable>
      	</DragDropContext>
		);
  }
}

{/* <div>
				<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'tracks'})}>Back</a>
				<Button onClick={this.delete}>
						Delete playlist
					</Button>
				<Input value={this.state.playlist.title} onChange={(e) => this.handleChange(e)}></Input>
				<ul className="collection">
						{this.state.playlist.tracks && this.state.playlist.tracks.data.map((val, i) => {
							return (
								<li className="collection-item avatar" key={i} >
									<img src={val.album ? val.album.cover_small || defaultTrackImg : defaultTrackImg} alt="" className="circle"/>
									<span className="title">Title: {val.title} - Duration: {moment.utc(val.duration * 1000).format('mm:ss')}</span>
									<p>Album: {val.album ? val.album.title : ""}</p>
									<Icon type="close" onClick={() => this.deleteTrack(i)}></Icon>
								</li>
							);
						})}
					</ul>
					<SearchBar state={this.props.state} type="tracks" addTrack={this.addTrack}/>
					<Button onClick={this.save}>
						Save
					</Button>
			</div> */}

export default EditPlaylist;