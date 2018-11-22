import React, { Component } from 'react';
import './styles.css';
import defaultTrackImg from '../../../../assets/track.png'
import Track from '../../../templates/track'
import moment from 'moment'
import axios from 'axios'
import { Col, Row, Icon , Card, Avatar} from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PersonalPlayer from '../../event/personalPlayer'
import { moveMusic, socket, blockSocketEvent, unblockSocketEvent, createEventLive, dislike, like } from '../../sockets';

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


        /* Live Event */
        socket.on('createEventLive', (tracks) => {
            this.sortTracks(tracks);
        })
        socket.on('like', (tracks) => {
            console.log("liked : ", tracks)
            this.sortTracks(tracks);
        })
        socket.on('dislike', (tracks) => {
            console.log("Disliked : ", tracks)
            this.sortTracks(tracks);
        })
        
        
	}
	componentWillMount() {
        this.setState({
            initLoading: false,
            playlist: this.props.playlist
        }, () => {
            console.log("CREATE EVENT LIVE", this.state.playlist.tracks.data)
            createEventLive(this.state.playlist.tracks.data)
        });
	}

    callSocket = (type, content) => {

        console.log("Call socket : ", type, content)
        if (type === 'dislike') {
            console.log('1')
            dislike(content)
        }
        // else if (type === 'dislike') {
        //     console.log('2')
        //     like(content)
        // }
        // else if (type === 'createEventLive') {
        //     console.log('3')
        //     createEventLive(content)
        // }
    }
    sortTracks = (tracks) => {
        let tmpPlay = this.state.playlist
        let tmp = tracks
        for (let i = 0; i < tmp.length - 1 ; i++)
        {
            console.log(tmp[i].like)
            if (tmp[i].like < tmp[i+1].like) {
                console.log("switch")
                let obj = tmp[i]
                tmp[i] = tmp[i+1]
                tmp[i+1] = obj
                i = 0;
            }
        }
        tmpPlay.tracks.data = tmp
        this.setState({playlist:tmpPlay})
    }
    onDragStart = () => {
		blockSocketEvent(this.state.playlist._id)
	}
	
	onDragEnd = (result) => {
		unblockSocketEvent(this.state.playlist._id)
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
        socket.on('blockPlaylist', (playlistId) => {
			console.log("JE BLOCK LA PLAYLIST POUR TOUS LES AUTRES")
			if (playlistId === this.state.playlist._id) {
				this.state.isBlocked = true
			}
		})
		socket.on('alreadyBlocked', (playlistId) => {
			console.log("LA PLAYLIST EST LOCK")
			if (playlistId === this.state.playlist._id) {
				this.state.isBlocked = true
			}
		})
		socket.on('unblockPlaylist', (playlistId) => {
			console.log("JE DEBLOCK LA PLAYLIST")
			if (playlistId === this.state.playlist._id) {
				this.state.isBlocked = !this.state.playlist._id
			}
        })
        /* */
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
