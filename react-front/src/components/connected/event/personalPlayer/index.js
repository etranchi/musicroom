import React, { Component } from 'react';
import Progress from "./progress"
import Control from "./control"
import Options from "./options"
import TrackInformation from "./trackInformation"
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

	render() {
        console.log(this.props.tracks)
        console.log("Playlist : ", this.props.tracks[this.state.currentTracksID])
        console.log(this.state)
        return (
<<<<<<< HEAD
                <Row style={{height:'100px', width:'100%'}} >
                    <Col span={3} style={{'backgroundColor': 'red', height:'100px'}}></Col>
                    <Col span={5}>
                        <TrackInformation  updateParentState={this.updateState} track={this.props.tracks[this.state.currentTracksID]}/>
=======
            <Content style={{height:'100px'}}>
                <Row style={{'backgroudColor':'black'}}>
                    <Col span={4}></Col>
                    <Col span={1}>
                        <img alt="playlist" src={this.props.tracks[this.state.currentTracksID].album.cover_small}/>
                    </Col>
                    <Col span={1}>
                        <b> {this.props.tracks[this.state.currentTracksID].title_short}</b>
                        <p> {this.props.tracks[this.state.currentTracksID].artist.name} </p>
>>>>>>> dbaf8656d0bb767ab864432600a1e763a5e75186
                    </Col>
                    <Col span={1} style={{'backgroundColor': 'red', height:'100px'}}></Col>
                    <Col span={6}>
                        <div style={{padding:'5% 0 0 0', 'height':'80px'}}>
                            <Control updateParentState={this.updateState} tracks={this.props.tracks}/>
                            <Progress updateParentState={this.updateState} tracks={this.props.tracks}/>
                        </div>
                     </Col>
                    <Col span={1} style={{'backgroundColor': 'red', height:'100px'}}></Col>
                    <Col span={4}>
                        <Options updateParentState={this.updateState} tracks={this.props.tracks}/>
                     </Col>
                     <Col span={4} style={{'backgroundColor': 'red', height:'100px'}}></Col>
                </Row>
        )
    }
}
