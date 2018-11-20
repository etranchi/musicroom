import React, { Component } from 'react';
import Progress from "./progress"
import './styles.css';
import { Tabs, Layout, Row, Col, Icon} from 'antd';


const {Content } = Layout;
const { DZ } = window
class PersonalPlayer extends Component {

	constructor(props) {
        super(props);
		this.state = {
            isPlaying:false,
            repeat:false,
            currentTracksID:0,
            tracksID:0,
            tracks:'',
        }

        let tracksID    = []
        let tracks      = []
        console.log(this.props.playlist.tracks.data)
        for (let i = 0; i < this.props.playlist.tracks.data.length; i++) {
            console.log("LALALA")
            console.log(this.props.playlist.tracks.data[i])
            tracksID.push(this.props.playlist.tracks.data[i].id)
            tracks.push(this.props.playlist.tracks.data[i])
        }
        this.setState({'tracksID':tracksID, 'tracks':tracks})
        DZ.player.playTracks(tracksID)
        DZ.player.setVolume(50)

    }

    componentWillMount = () => {
        let tracksID    = []
        let tracks      = []
        console.log(this.props.playlist.tracks.data)
        for (let i = 0; i < this.props.playlist.tracks.data.length; i++) {
            console.log("LALALA")
            console.log(this.props.playlist.tracks.data[i])
            tracksID.push(this.props.playlist.tracks.data[i].id)
            tracks.push(this.props.playlist.tracks.data[i])
        }
        this.setState({'tracksID':tracksID, 'tracks':tracks}, () => {
            DZ.player.playTracks(tracksID)
            DZ.player.setVolume(50)     
        })    
    }

    deezerPlay = () => {
        this.setState({isPlaying:!this.state.isPlaying}, () => {
            DZ.player.play()
            this.state.isPlaying ?  DZ.player.play() :  DZ.player.pause()
        });
    }

    deezerNextTracks = () => {
        DZ.player.next()
    }

    deezerPrevTracks = () => {
        DZ.player.prev()
    }

    isPlaying = () => {
        console.log("1 : playing")
        this.setState({ isPlaying:true}, () => {
            DZ.player.playTracks([536421002])
            DZ.player.play()
            DZ.player.setVolume(50)
            console.log(this.state)
        })
        // this.setState(
        //     { isPlaying: !DZ.player.isPlaying() },
        //     () => DZ.player.isPlaying() ? DZ.player.pause() : DZ.player.play()
        // );
    }

    changeTrack = (value) => {
        this.setState({
            isPlaying: true,
            trackIndex:this.state.repeat ? this.state.trackIndex : this.state.trackIndex + value,
            track:this.props.playlist.tracks.data[this.state.trackIndex]
        }, () => {
            DZ.player.pause()
            DZ.player.playTracks(this.state.track.id)
        });
    }


    setVolume = (vol) => {

        DZ.player.setVolume(vol)
    }
	
	render() {
        console.log("Playlist : ", this.props.playlist)
        console.log(this.state.tracks[this.state.currentTracksID])
        return (
            <Content>
                <Row style={{'backgroudColor':'black'}}>
                    <Col span={1}>
                        <img alt="playlist" src={this.state.tracks[this.state.currentTracksID].album.cover_small} />
                    </Col>
                    <Col span={1}>
                        <b> {this.state.tracks[this.state.currentTracksID].title_short}</b>
                        <p> {this.state.tracks[this.state.currentTracksID].artist.name} </p>
                    </Col>
                    <Col span={1}>
                        <Icon className="playerLike" type="heart" />
                    </Col>
                    <Col span={3}></Col>
                    <Col span={8}>
                        <Icon onClick={this.deezerPrevTracks}   className="playerAction" type="step-backward" />
                        <Icon onClick={this.deezerPlay}         className="playerAction" type={this.state.isPlaying ? "pause" : "caret-right"}/>
                        <Icon onClick={this.deezerNextTracks}   className="playerAction" type="step-forward" />
                        <Progress />
                     </Col>
                    <Col span={3}></Col>
                    <Col span={4}> Options</Col>
                </Row>
                {/* <div className="controlers" {...this.state.attribut}>
                    <input type="button" onClick={this.playTrack.bind(this, 302127)} value="Play Daft Punk - Discovery"/>
                    <input type="button" onClick={this.playTrack.bind(this, 301775)} value="Play Daft Punk - Homework"/>
                    <br/>
                    <input type="button" onClick={this.isPlaying} value="play"/>
                    <input type="button" onClick={this.isPlaying} value="pause"/>
                    <input type="button" onClick={this.changeTrack}value="prev"/>
                    <input type="button" onClick={this.changeTrack} value="next"/>
                    <br/>
                    <input type="button" onClick={this.setVolume.bind(this, 30)} value="set Volume 20"/>
                    <input type="button" onClick={this.setVolume.bind(this, 30)} value="set Volume 80"/>
                    <br/><br/><br/>
                </div>
                <div id="slider_seek" className="progressbarplay" >
                    <div className="bar" style={{"width": "0%"}}></div>
                </div>
                <br/> event_listener : <br/>
                <pre id="event_listener" style={{"height":"100px","overflow":"auto"}}></pre> */}
            </Content>
        )
    }
}

export default PersonalPlayer;