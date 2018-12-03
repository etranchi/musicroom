import React, { Component } from 'react';
import './styles.css';
import Track from '../../../templates/track'
import { Col, Row } from 'antd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Player from '../../../other/player'
import {socket, getRoomPlaylist, updateScore, updateTracks, updateTrack, blockSocketEvent} from '../../../other/sockets';;

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
            },
            isCreator: false,
            isAdmin: false,
        };
        this.roomID = this.props.roomID;
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
            this.setState({rotate: {active:false, id:0, liked: false}});
            this.savePlaylist(tracks);
        });
        /**************************************/
        if (this.props.state.data.event.creator.email === this.props.state.user.email)
            this.setState({isCreator:true})
        else  {
            this.setState({ isAdmin:this.isUser(this.props.state.data.event.adminMembers) })
        }
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
    isUser = tab => 
    {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].email === this.props.state.user.email)
                return true;
        }
        return false;
    }
    callSocket = (type, OldTrack, value) => {

        let me          = this.props.state.user;
        let index       = -1;

        if      (OldTrack.userLike   && (index = OldTrack.userLike.indexOf(me._id)) !== -1)   OldTrack.userLike.splice(0, index)
        else if (OldTrack.userUnLike && (index = OldTrack.userUnLike.indexOf(me._id)) !== -1) OldTrack.userUnLike.splice(0, index)
        updateTrack(this.roomID,  OldTrack)
        this.setState({rotate: {active:true, id:OldTrack._id, liked: value > 0 ? true : false}}, () => {
            updateScore(this.roomID, OldTrack._id, value, this.props.state.user._id)
        })

    }
    onDragStart = () => {
        blockSocketEvent(this.roomID)
	}
	onDragEnd = (result) => {
        if (!result.destination) return;
		let state = this.state;
		const items = reorder( this.state.playlist.tracks.data, result.source.index, result.destination.index );
        state.playlist.tracks.data = items;
        updateTracks(this.roomID, items)
	}
    render() {
        return (
            <div>
                <Row>
                    <Col span={8}> 
                        <a href="#!" className="btn waves-effect waves-teal" onClick={this.props.openCardEvent.bind(this, this.props.state.data.event)}>Back</a> 
                    </Col> 
                </Row>
                <Row>
                    <Col span={24}>
                        {this.state.playlist.tracks.data.length > 0 && <Player  tracks={this.state.playlist.tracks.data} roomID={this.props.roomID}/>}
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
                            <Droppable droppableId="droppable" isDragDisabled={!(this.state.isAdmin || this.state.isCreator)} isDropDisabled={!(this.state.isAdmin || this.state.isCreator)} >
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
