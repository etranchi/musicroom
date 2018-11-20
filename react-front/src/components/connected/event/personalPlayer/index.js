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
                <Row style={{height:'100px', width:'100%'}} >
                    <Col span={3} style={{'backgroundColor': 'red', height:'100px'}}></Col>
                    <Col span={5}>
                        <TrackInformation  updateParentState={this.updateState} track={this.props.tracks[this.state.currentTracksID]}/>
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
