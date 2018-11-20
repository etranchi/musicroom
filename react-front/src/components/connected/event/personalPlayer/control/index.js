import React, { Component } from 'react';
import './styles.css';
import {Layout, Row, Col, Icon} from 'antd';


const {Content } = Layout;
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

	render() {
        return (
            <Content>
                <Row>
                    <Col span={6}></Col>
                    <Col span={1}>
                        <i  onClick={this.updateState.bind(this, 'random')} style={this.state.random ? {color:"#00695c"} : {color:"#424242"}} className="fas fa-random playerSubAction"></i>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={1}>
                        <Icon  onClick={this.prevTrack}   className="playerAction" type="step-backward" />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={1}>
                        <Icon  onClick={this.playTrack}   className="playerAction" type={this.state.isPlaying ? "pause" : "caret-right"}/>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={1}>
                        <Icon  onClick={this.nextTrack}   className="playerAction" type="step-forward" />
                    </Col>
                    <Col span={1}></Col>
                    <Col span={1}>
                        <i onClick={this.updateState.bind(this, 'repeat')} style={this.state.repeat ? {color:"#00695c"} : {color:'#424242'}} className="fas fa-redo-alt playerSubAction"></i>
                    </Col>
                </Row>
            </Content>
        )
    }
}
