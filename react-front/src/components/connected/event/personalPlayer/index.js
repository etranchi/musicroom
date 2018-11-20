import React, { Component } from 'react';
import Progress from "./progress"
import Control from "./control"
import './styles.css';
import { Tabs, Layout, Row, Col, Icon} from 'antd';


const {Content } = Layout;

/* Deezer Schema Playlist :  

    playlist = {
        ...,
        ...,
        ...,
        tracks {
            data : [ { tracks1 }, { tracks2 }
            ]
        }
    }
*/

export default class PersonalPlayer extends Component {

	constructor(props) {
        super(props);
		this.state = {
            currentTracksID:0,
        }

    }

    updateState = (value) =>  {
        this.setState({value})
        console.log("Personal player old state : ", this.state)
        this.setState(value, () =>{
            console.log("Personal player new state : ", this.state)
        })
    }




    // isPlaying = () => {
    //     console.log("1 : playing")
    //     this.setState({ isPlaying:true}, () => {
    //         DZ.player.playTracks([536421002])
    //         DZ.player.play()
    //         DZ.player.setVolume(50)
    //         console.log(this.state)
    //     })
    //     // this.setState(
    //     //     { isPlaying: !DZ.player.isPlaying() },
    //     //     () => DZ.player.isPlaying() ? DZ.player.pause() : DZ.player.play()
    //     // );
    // }

    // changeTrack = (value) => {
    //     this.setState({
    //         isPlaying: true,
    //         trackIndex:this.state.repeat ? this.state.trackIndex : this.state.trackIndex + value,
    //         track:this.props.playlist.tracks.data[this.state.trackIndex]
    //     }, () => {
    //         DZ.player.pause()
    //         DZ.player.playTracks(this.state.track.id)
    //     });
    // }

	render() {
        console.log(this.props.tracks)
        console.log("Playlist : ", this.props.tracks[this.state.currentTracksID])
        console.log(this.state)
        return (
            <Content style={{height:'100px'}}>
                <Row style={{'backgroudColor':'black'}}>
                    <Col span={4}></Col>
                    <Col span={1}>
                        <img alt="playlist" src={this.props.tracks[this.state.currentTracksID].album.cover_small} />
                    </Col>
                    <Col span={1}>
                        <b> {this.props.tracks[this.state.currentTracksID].title_short}</b>
                        <p> {this.props.tracks[this.state.currentTracksID].artist.name} </p>
                    </Col>
                    <Col span={1}>
                        <Icon className="playerLike" type="heart" />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={6}>
                        <div style={{margin:'0 0 0 40%'}}>
                            <Control updateParentState={this.updateState} tracks={this.props.tracks}/>
                        </div>
                        <Progress updateParentState={this.updateState} tracks={this.props.tracks}/>
                     </Col>
                    <Col span={3}></Col>
                    <Col span={3}> Options</Col>
                </Row>
            </Content>
        )
    }
}
