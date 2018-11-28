import React, { Component } from 'react';
import Progress from "./progress"
import Control from "./control"
import Options from "./options"
import TrackInformation from "./trackInformation"
import './styles.css';

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
        this.setState(value)
    }

	render() {
        return ( 
            <div className='player' style={{backgroundColor:this.props.color ? this.props.color : 'white'}}>

                <div className='defaultComponentProperty' style={{float:'left', minWidth:"300px"}}> 
                    <TrackInformation  updateParentState={this.updateState} track={this.props.tracks[this.state.currentTracksID]}/>
                </div>

                <div className='defaultComponentProperty'>
                </div>

                <div className='defaultComponentProperty' style={{minWidth:"600px"}}>
                    <div style={{height:'50px'}}><Control updateParentState={this.updateState} tracks={this.props.tracks} roomID={this.props.roomID}/></div>
                    <div style={{height:'30px'}}><Progress strokesColor={this.props.strokesColor} updateParentState={this.updateState} tracks={this.props.tracks}/></div>
                </div>
                
                <div className='defaultComponentProperty'>
                </div>

                <div className='defaultComponentProperty' style={{float:'right', minWidth:"300px"}}> 
                    <Options strokesColor={this.props.strokesColor} updateParentState={this.updateState} tracks={this.props.tracks}/>  
                </div>
            </div>
        )
    }
}
