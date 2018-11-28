import React, { Component } from 'react';
import './styles.css';
import Track from '../../../templates/track'
import axios from 'axios'
import { Col, Row } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PersonalPlayer from '../../event/personalPlayer'
import {socket, getRoomPlaylist, joinRoom, updateScore} from '../../sockets';

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
        };
        this.roomID = this.props.roomID;
    }
    componentDidMount = () => {
        socket.on('createEventLive', (tracks) => {
            this.sortTracks(tracks);
        });
        socket.on('joinRoom', (msg) => {
        });
        socket.on('getRoomPlaylist', (tracks) => {
            this.savePlaylist(tracks);
        });
        socket.on('updateScore', (tracks) => {
            this.savePlaylist(tracks);
        });

        /**************************************/
    }
    componentWillMount = () => {
        this.setState({
            initLoading: false,
            playlist: this.props.playlist
        }, () => {
            joinRoom(this.props.roomID);
            getRoomPlaylist(this.props.roomID);
        });
    }
    savePlaylist = tracks => {
        let playlist = this.state.playlist;
        playlist.tracks.data = tracks;
        this.setState({playlist:playlist});
    }
    callSocket = (type, id, value) => {
        if (type === 'updateScore') {
            updateScore(this.roomID, id, value)
        }
    }
    onDragEnd = (result) => {
        if (!result.destination) return;
        let state = this.state;
        const items = reorder(
            this.state.playlist.tracks.data,
            result.source.index,
            result.destination.index
        );
        state.playlist.tracks.data = items;
        axios.put(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist._id, 
            this.state.playlist,
            {'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        )
        .then(resp => {
            this.setState(items);
        })
        .catch(err => {
            console.log(err);
        })
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        {this.state.playlist.tracks.data.length > 0 && <PersonalPlayer  tracks={this.state.playlist.tracks.data}></PersonalPlayer>}
                    </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                <br/>
                <Row>
                    <Col span={6}/>
                    <Col span={12}>
                        <DragDropContext onDragEnd={this.onDragEnd}>
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
                </Row>
            </div>
        )
    }
}
