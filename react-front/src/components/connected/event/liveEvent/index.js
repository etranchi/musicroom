import React, { Component } from 'react';
import './styles.css';
import defaultTrackImg from '../../../../assets/track.png'
import Track from '../../../templates/track'
import moment from 'moment'
import axios from 'axios'
import { Col, Row, Icon , Card, Avatar} from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PersonalPlayer from '../../event/personalPlayer'
import { moveMusic, socket, blockSocketEvent, unblockSocketEvent, getEventLive, updateScore} from '../../sockets';

const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
  
	return result;
  };


  export default class LiveEvent extends Component {
	constructor(props){
		super(props);
		this.state = {
			playlist: [],
			initLoading: true,
			loading: false,
			isBlocked: false
        }
        this.roomID = this.props.roomID;
    }
    componentDidMount() {
        socket.on('blockPlaylist', (playlistId) => {
            if (playlistId === this.state.playlist._id) 
                this.state.isBlocked = true
        })
        socket.on('alreadyBlocked', (playlistId) => {
            if (playlistId === this.state.playlist._id)
                this.state.isBlocked = true
        })
        socket.on('unblockPlaylist', (playlistId) => {
            if (playlistId === this.state.playlist._id) 
                this.state.isBlocked = !this.state.playlist._id
        })

        /*              Live Event              */
        socket.on('getEventLive', (tracks) => {
            this.savePlaylist(tracks);
        })

        socket.on('updateScore', (tracks) => {
            this.savePlaylist(tracks);
        })
        /**************************************/
    }
	componentWillMount() {
        this.setState({
            initLoading: false,
            playlist: this.props.playlist
        }, () => {
            console.log("CREATE EVENT LIVE", this.state.playlist.tracks.data)
            getEventLive(this.state.playlist.tracks.data, this.roomID)
        });
	}

    savePlaylist = (tracks) => {
        let playlist = this.state.playlist;
        playlist.tracks.data = tracks;
        this.setState({playlist:playlist})
    }
    callSocket = (type, id, value) => {

        console.log("Je suis ici : ", type, this.state.playlist.tracks.data)
        if (type === 'updateScore') {
            console.log("Enter")
            updateScore(this.state.playlist.tracks.data, id, value, this.roomID)
        }
    }

    sortTracks = (tracks) => {
        let playlist = this.state.playlist;
        tracks.sort((a, b) => { return a.like < b.like ? 1 : -1 })
        playlist.tracks.data = tracks;
        this.setState({playlist:playlist})
    }
    onDragStart = () => {
		blockSocketEvent(this.state.playlist._id, this.roomID)
	}
	
	onDragEnd = (result) => {
		unblockSocketEvent(this.state.playlist._id, this.roomID)
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


		return(
            <div>
                {this.state.playlist.tracks.data.length > 0 && <PersonalPlayer  tracks={this.state.playlist.tracks.data}></PersonalPlayer>}
                <Row>
                    <Col span={6}>
                    </Col>
                    <Col span={12}>
                        <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                            <Droppable droppableId="droppable" isDropDisabled={this.state.isBlocked}>
                            {
                                (provided, snapshot) =>  (
                                    <Row>
                                        <div ref={provided.innerRef} className="collection">
                                            {
                                                this.state.playlist.tracks.data.map((item, index) =>  (
                                                    <Col span={24}>
                                                        <Draggable key={item.id} draggableId={item.id} index={index} >
                                                        {
                                                            (provided, snapshot) => (
                                                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                                                    <Track track={item} callSocket={this.callSocket}/>
                                                                </div>
                                                            )
                                                        }
                                                        </Draggable>
                                                    {/* </li> */}
                                                    </Col>
                                                ))
                                            }
                                            
                                        {provided.placeholder}
                                        </div>
                                    </Row>
                                )
                            }
                            </Droppable>
                        </DragDropContext>
                    </Col>
                    <Col span={6}></Col>
                </Row>
            </div>
		)
  }
}
