import React, { Component } from 'react';
import './styles.css';
import {Layout, Row, Col, Icon} from 'antd';


const {Content } = Layout;
const { DZ } = window
class PersonalPlayer extends Component {

	constructor(props) {
        super(props);
		this.state = {
            isPlaying : true,
            repeat: false,
            currentTracksID: 0,
            tracksID: [],
            tracks: []
        }
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
    playTrack = () => {
        this.setState({isPlaying:!this.state.isPlaying}, () => {
            this.state.isPlaying ?  DZ.player.play() :  DZ.player.pause()
            
        });
    }

    nextTrack = () => {
        let index = this.state.currentTracksID + 1;
        if (index > this.state.tracks.length)
            return ;
        this.setState({currentTracksID:index})
        this.props.updateParentState({currentTracksID:index})
        DZ.player.next()
    }

    prevTrack = () => {
        let index = this.state.currentTracksID - 1;
        if (index < 0)
            return ;
        this.setState({currentTracksID:index})
        this.props.updateParentState({currentTracksID:index})
        DZ.player.prev()
    }


    setVolume = (vol) => {
        DZ.player.setVolume(vol)
    }
	
	render() {
        return (
            <Content>
                <Icon onClick={this.prevTrack}   className="playerAction" type="step-backward" />
                <Icon onClick={this.playTrack}   className="playerAction" type={this.state.isPlaying ? "pause" : "caret-right"}/>
                <Icon onClick={this.nextTrack}   className="playerAction" type="step-forward" />
            </Content>
        )
    }
}

export default PersonalPlayer;