import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';
import { Icon, Button, Input, Upload, message, Layout, Col, Row, Divider} from 'antd';

const {Content} = Layout;

class Player extends Component {
	constructor(props) {
		super(props);

		this.state = {
		};
    
    this.player = {
        'position': 'fixed',
        'bottom': '12px',
        'height': '80px',
        'latitude': 0,
        'longitude': 0,
        'width':"100%",
        'right':0,
        'displayUser' : false,
    }
}

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}



	render() {
        console.log("Player : State : ", this.props)
		return (
				<Content style={this.player}> 
				<Row>
                    <Col >
                    {
                        this.props.state.playlistId ? 
                        <iframe title="deezerplayer" scrolling="no" frameBorder="0" allowtransparency="true" src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id="
                        + this.props.state.playlistId
                        + "&app_id=1"} width="100%"></iframe> : null
                    }
                    </Col>
                </Row>
				</Content>
		);
	}
}

export default Player;
