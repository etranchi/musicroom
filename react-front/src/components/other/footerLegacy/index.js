import React, { Component } from 'react';
import "antd/dist/antd.css";
import Player from '../player'

export default class FooterLegacy extends Component {
	constructor(props) {
		super(props);
		this.state = {
        }
    }
  render() {
    console.log("footer : ")
    console.log(this.props.state.currentComponent)
    console.log(this.props.state.currentPlayerTracks)
    if ( this.props.state.currentPlayerTracks && this.props.state.currentPlayerTracks.tracks.length > 0) {
      console.log("ENTER")
      return (
        <Player  tracks={this.props.state.currentPlayerTracks.tracks}/> 
      )
    }
    else return ( <div></div> );
  }
}
