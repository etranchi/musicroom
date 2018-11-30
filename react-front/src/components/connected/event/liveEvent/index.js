import React, { Component } from 'react';
import './styles.css';
import Track from '../../../templates/track'
import axios from 'axios'
import { Col, Row } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PersonalPlayer from '../../event/personalPlayer'
import {socket, getRoomPlaylist, updateScore, updateTracks, updateTrack} from '../../sockets';

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
            isBlocked: false,
            rotate: {
                active:false,
                id: 0
            }
        };
        this.roomID = this.props.roomID;
        console.log("Live event : CONSTRUCTOR");
    }
    componentDidMount = () => {
        socket.on('getRoomPlaylist', (tracks) => {
            console.log("socket : receive data from getRoomPlaylist : ", tracks)
            this.savePlaylist(tracks);
        });
        socket.on('updateTrack', (msg) => {
            console.log("socket : receive data from updateTrack : ")
        });
        socket.on('updateScore', (tracks) => {
            console.log("socket : receive data from updateScore : ", tracks)
            this.setState({rotate: {active:false, id:0}}, () => {
                this.savePlaylist(tracks);
           });
        });
        /**************************************/
    }
    componentWillMount = () => {
        this.setState({
            initLoading: false,
            playlist: this.props.playlist
        }, () => {
            getRoomPlaylist(this.props.roomID);
        });
    }
    savePlaylist = tracks => {
        let playlist = this.state.playlist;
        playlist.tracks.data = tracks;
        this.setState({playlist:playlist});
    }
    callSocket = (type, OldTrack, value) => {

        let me          = this.props.state.user;
        let index    = -1;
        console.log("BEFORE : ", OldTrack.userLike)
        console.log("BEFORE : ", OldTrack.userUnLike)
        if (OldTrack.userLike && (index = OldTrack.userLike.indexOf(me._id)) != -1) {
            console.log("Enter userLike")
            OldTrack.userLike.splice(0, index)
        }
        else if (OldTrack.userUnLike && (index = OldTrack.userUnLike.indexOf(me._id)) != -1) {
            console.log("Enter userUnLike")
            OldTrack.userUnLike.splice(0, index)
        }
        console.log("AFTER : ", OldTrack.userLike)
        console.log("AFTER : ", OldTrack.userUnLike)
        updateTrack(this.roomID,  OldTrack)
        this.setState({rotate: {active:true, id:OldTrack._id}}, () => {
            updateScore(this.roomID, OldTrack._id, value, this.props.state.user._id)
        })

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
                        {this.state.playlist.tracks.data.length > 0 && <PersonalPlayer  tracks={this.state.playlist.tracks.data} roomID={this.props.roomID}></PersonalPlayer>}
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
                                                                    <Track userID={this.props.state.user._id} rotate={this.state.rotate} order={index} track={item} callSocket={this.callSocket}/>
                                                                </div>
                                                            )
                                                        }
                                                        </Draggable>
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
