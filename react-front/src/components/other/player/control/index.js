import React, { Component } from 'react';
import './styles.css';
import {Row, Col} from 'antd';
import {socket, updatePlayer, updateStatus} from '../../sockets'

const { DZ } = window

export default class Player extends Component {

	constructor(props) {
        super(props);
		this.state = {
            isPlaying : true,
            repeat: false,
            random: false,
            currentTracksID: 0,
            tracksID: [],
            tracks: [],
        };
    }
    componentWillMount = () => {
        let tracksID    = [];
        let getPlay     = 0;
        this.props.tracks.forEach(track => { 
            if (track.status === 1) getPlay = tracksID.length;
            tracksID.push(track.id) 
        });
        this.props.updateParentState({currentTracksID:getPlay})
        this.setState({tracksID:tracksID, tracks:this.props.tracks, currentTracksID:getPlay}, () => {
            DZ.player.playTracks(tracksID, getPlay)
            DZ.player.setVolume(50)
        });
    }
    componentDidMount = () => {
        socket.on('updatePlayer', (event) => {
            console.log("Socket : updatePlayer receive data : ", event)
            switch (event){
                case "next":
                    this.nextTrack();
                    break;
                case "suiv":
                    this.nextTrackSuiv();
                    break;
                case "prev":
                    this.prevTrack();
                    break;
                case "play":
                    this.playTrack();
                    break;
                case "changePosition":
                    this.setState({isPlaying:true});
                    DZ.player.play();
                    break;
                default:
                    break;
            }     
        })
        socket.on('updateStatus', (tracksNew) => {
            console.log("Socket : updateStatus receive data : ", tracksNew)
            this.setState({tracks:tracksNew})
        });
        socket.on('updateScore', (tracksNew) => {
            console.log("Socket : updateScore receive data : ", tracksNew)
            this.setState({tracks:tracksNew}, () => {
                console.log(tracksNew)
            })  
        });
    }
    updateState = value =>
    {
        if (value === 'repeat' && this.state.random && (this.props.isAdmin || this.props.isCreator)) this.setState({repeat:true, random:false})
        else if (value === 'random' && this.state.repeat && (this.props.isAdmin || this.props.isCreator)) this.setState({random:true, repeat:false})
        else this.setState({[value]:!this.state[value]})
    }
    playTrack = () => {
        this.setState({isPlaying:!this.state.isPlaying}, () => {
            this.state.isPlaying ?  DZ.player.play() :  DZ.player.pause()
            console.log("play/pause set state");
        });
        console.log("play/pause");
    }
    nextTrack = () => {
        let index = this.state.currentTracksID + 1;
        if (index >= this.state.tracks.length)
            return ;     
        if (index - 1 >= 0 && this.props.roomID) {
            console.log(this.state.tracks[index])
            console.log(this.state.tracks[index]._id)
            updateStatus(this.props.roomID, -1, this.state.tracks[index]._id, this.state.tracks[index-1]._id)
        }
        this.setState({currentTracksID:index});
        this.props.updateParentState({currentTracksID:index});

        DZ.player.next();
        DZ.player.seek(0);
    }
    nextTrackSuiv = () => {
        let index = this.state.currentTracksID + 1;
        if (index >= this.state.tracks.length)
            return ;     
        if (index - 1 >= 0 && this.props.roomID) {
            updateStatus(this.props.roomID, -1, this.state.tracks[index]._id, this.state.tracks[index-1]._id)
        }
        this.setState({currentTracksID:index});
        this.props.updateParentState({currentTracksID:index});
        DZ.Event.subscribe('tracklist_changed', e => {
            DZ.player.next();
            DZ.player.seek(0);
        })
    }

    prevTrack = () => {
        let index = this.state.currentTracksID - 1;
        if (index < 0)
            return ;
        if (index + 1 < this.state.tracks.length  && this.props.roomID)
            updateStatus(this.props.roomID, 1, this.state.tracks[index]._id, this.state.tracks[index + 1]._id)
        this.setState({currentTracksID:index})
        this.props.updateParentState({currentTracksID:index})
        DZ.player.prev();
        DZ.player.seek(0);
    }

    playerUpdate = (event) => {
        console.log("PLayer update : ", this.props)
        if (this.props.isCreator || this.props.isAdmin) {
            if (this.props.roomID)
                updatePlayer(this.props.roomID, event);
            else
            {
                switch (event){
                    case "next":
                        this.nextTrack();
                        break;
                    case "prev":
                        this.prevTrack();
                        break;
                    case "play":
                        this.playTrack();
                        break;
                    default:
                        break;
                } 
            }
        }
    }

	render() {
        return (
            <Row style={{height:'inherit', margin:'3% 0 0 0'}}>
                <Col span={3}/>
                <Col span={3}>
                    <i onClick={this.updateState.bind(this, 'random')} style={this.state.random ? {color:"#4caf50"} : {color:"#424242"}} className="fas fa-random playerSubAction"></i>
                </Col>
                <Col span={1}/>
                <Col span={3}>
                    <i onClick={() => {this.playerUpdate("prev")}} className="fas fa-backward playerAction"></i>
                </Col>
                <Col span={1}/>
                <Col span={3}>
                    <i onClick={() => {this.playerUpdate("play")}} className={this.state.isPlaying ? "fas fa-pause-circle playerAction" : "fas fa-play-circle playerAction"}></i>  
                </Col>
                <Col span={1}/>
                <Col span={3}>
                    <i onClick={() => {this.playerUpdate("next")}} className="fas fa-forward playerAction"></i>
                </Col>
                <Col span={1}/>
                <Col span={3}>
                    <i onClick={this.updateState.bind(this, 'repeat')} style={this.state.repeat ? {color:"#4caf50"} : {color:'#424242'}} className="fas fa-redo-alt playerSubAction"></i>
                </Col>
            </Row>
        )
    }
}
