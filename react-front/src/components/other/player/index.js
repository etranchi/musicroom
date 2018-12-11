import React, { Component } from 'react';
import Progress from "./progress"
import Control from "./control"
import Options from "./options"
import TrackInformation from "./trackInformation"
import './styles.css';
import {Layout} from 'antd';

export default class Player extends Component {
	constructor(props) {
        super(props);
		this.state = {
            currentTracksID:0,
        };
    }
    updateState = (value) =>  {
        this.setState(value)
    }
	render() {
        console.log("CREATOR : ", this.props.isCreator) 
        return ( 
            <Layout.Footer className='player' style={{backgroundColor:this.props.color ? this.props.color : 'white'}}>
                <div className='defaultComponentProperty default'> 
                    <TrackInformation  updateParentState={this.updateState} track={this.props.tracks[this.state.currentTracksID]}/>
                </div>
                <div className='defaultComponentProperty control'>
                    <div style={{height:'50px'}}><Control isCreator={this.props.isCreator} isAdmin={this.props.isAdmin}updateParentState={this.updateState} tracks={this.props.tracks} roomID={this.props.roomID}/></div>
                    <div style={{height:'30px'}}><Progress isCreator={this.props.isCreator} strokesColor={this.props.strokesColor} updateParentState={this.updateState} tracks={this.props.tracks}/></div>
                </div>
                <div className='defaultComponentProperty default'> 
                    <Options strokesColor={this.props.strokesColor} tracks={this.props.tracks}/>  
                </div>
            </Layout.Footer>
        )
    }
}
