import React, { Component } from 'react';
import './styles.css';
import defaultTrackImg from '../../../../assets/track.png'
import Track from '../../../templates/track'
import moment from 'moment'
import axios from 'axios'
import { Col, Row, Icon , Card, Avatar} from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PersonalPlayer from '../../event/personalPlayer'
import { moveMusic, socket, blockSocketEvent, unblockSocketEvent} from '../../sockets';
import {getRoomPlaylist, joinRoom, updateScore} from '../../sockets';

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
        socket.on('joinRoom', (msg) => {
            console.log("joinRoom : ", msg)
        })
        socket.on('getRoomPlaylist', (tracks) => {
            console.log("getRoomPlaylist : ", tracks)
            this.savePlaylist(tracks);
        })

        socket.on('updateScore', (tracks) => {
            console.log("Update score : ", tracks)
            this.savePlaylist(tracks);
        })

        /**************************************/
    }
	componentWillMount() {
        this.setState({
            initLoading: false,
            playlist: this.props.playlist
        }, () => {
            joinRoom(this.props.roomID);
            getRoomPlaylist(this.props.roomID);
        });
	}

    savePlaylist = (tracks) => {
        let playlist = this.state.playlist;
        playlist.tracks.data = tracks;
        playlist.tracks.data.forEach((music) => {
            console.log(music.like)
        })
        this.setState({playlist:playlist})
    }
    callSocket = (type, id, value) => {
        console.log("Callsocket : ")
        console.log(type, id, value)
        if (type === 'updateScore') {
            console.log("Update score")
            updateScore(this.roomID, id, value)
        }
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
                                                    <Col span={24} key={index}>
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
