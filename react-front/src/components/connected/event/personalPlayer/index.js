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
    }

	render() {
<<<<<<< HEAD
        return ( 
            <div className='player' style={{backgroundColor:this.props.color ? this.props.color : 'white'}}>
                <div className='defaultComponentProperty' style={{float:'left', minWidth:"300px"}}> 
                    <TrackInformation  updateParentState={this.updateState} track={this.props.tracks[this.state.currentTracksID]}/>
                </div>
                <div className='defaultComponentProperty'></div>
                <div className='defaultComponentProperty' style={{minWidth:"600px"}}>
                    <div style={{height:'50px'}}><Control updateParentState={this.updateState} tracks={this.props.tracks}/></div>
                    <div style={{height:'30px'}}><Progress strokesColor={this.props.strokesColor} updateParentState={this.updateState} tracks={this.props.tracks}/></div>
                </div>
                <div className='defaultComponentProperty'></div>
                <div className='defaultComponentProperty' style={{float:'right', minWidth:"300px"}}> 
                    <Options strokesColor={this.props.strokesColor} updateParentState={this.updateState} tracks={this.props.tracks}/>  
                </div>
            </div>
=======
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
>>>>>>> 6a8baaa84b8f636cb398d9f6010d8fe39aa2a4c7
        )
    }
}
