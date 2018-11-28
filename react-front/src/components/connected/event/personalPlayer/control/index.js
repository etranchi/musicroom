import React, { Component } from 'react';
import './styles.css';
import {Row, Col} from 'antd';
import {socket, updatePlayer} from '../../../sockets'


const { DZ } = window
export default class PersonalPlayer extends Component {

	constructor(props) {
        super(props);
		this.state = {
            isPlaying : true,
            repeat: false,
            random: false,
            currentTracksID: 0,
            tracksID: [],
            tracks: [],
        }
    }

    updateState = (value) =>
    {
        console.log(value)

        if (value === 'repeat' && this.state.random)
        {
            this.setState({repeat:true, random:false})
            console.log('1')
        }
        else if (value === 'random' && this.state.repeat)
        {
            console.log('2')
            this.setState({random:true, repeat:false})
        }
        else
            this.setState({[value]:!this.state[value]})
    }
    componentWillMount = () => {
        let tracksID    = []

        this.props.tracks.forEach(track => {
            tracksID.push(track.id)
        });
        this.setState({'tracksID':tracksID, 'tracks':this.props.tracks}, () => {
            DZ.player.playTracks(tracksID)
            DZ.player.pause()
            DZ.player.setVolume(50)     
        })    
    }

    componentDidMount = () => {
        socket.on('updatePlayer', (event) => {
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
            
        })
    }

    playTrack = () => {
        this.setState({isPlaying:!this.state.isPlaying}, () => {
            this.state.isPlaying ?  DZ.player.play() :  DZ.player.pause()     
        });
        console.log("play/pause");
    }

    nextTrack = () => {
        let index = this.state.currentTracksID + 1;
        if (index > this.state.tracks.length)
            return ;
        this.setState({currentTracksID:index})
        this.props.updateParentState({currentTracksID:index})
        DZ.player.next()
        console.log("currentIndex : " + index);
        console.log("next");
    }

    prevTrack = () => {
        let index = this.state.currentTracksID - 1;
        if (index < 0)
            return ;
        this.setState({currentTracksID:index})
        this.props.updateParentState({currentTracksID:index})
        DZ.player.prev()
        console.log("prev");
        console.log(this.props);
    }

    playerUpdate = (event) => {
        updatePlayer(this.props.roomID, event);
    }

	render() {
        return (
                <Row style={{height:'inherit', margin:'3% 0 0 0'}}>
                    <Col span={3}></Col>
                    <Col span={3}>
                        <i  onClick={this.updateState.bind(this, 'random')} style={this.state.random ? {color:"#4caf50"} : {color:"#424242"}} className="fas fa-random playerSubAction"></i>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <i  onClick={() => {this.playerUpdate("prev")}}   className="fas fa-backward playerAction"></i>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <i  onClick={() => {this.playerUpdate("play")}} className={this.state.isPlaying ? "fas fa-pause-circle playerAction" : "fas fa-play-circle playerAction"}></i>  
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <i onClick={() => {this.playerUpdate("next")}}   className="fas fa-forward playerAction"></i>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={3}>
                        <i onClick={this.updateState.bind(this, 'repeat')} style={this.state.repeat ? {color:"#4caf50"} : {color:'#424242'}} className="fas fa-redo-alt playerSubAction"></i>
                    </Col>
                </Row>
        )
    }
}
