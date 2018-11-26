import React, { Component } from 'react';
import './styles.css';
import {Row, Col,Progress} from 'antd';


const { DZ } = window
export default class PersonalPlayer extends Component {

	constructor(props) {
        super(props);
		this.state = {
            volume: 50,
            mute:false
        }
    }

    changeVolume = ({ target, clientX }) => {
        const { x, width } = target.getBoundingClientRect()
        const volume = (clientX - x) / width * 100
        this.setState({percent:volume}, () => {
            DZ.player.setVolume(volume)
        })
    }

    muteVolume = () => {
        this.setState({mute:!this.state.mute})
    }
	
	render() {
        return (
            <Row style={{padding:'20% 0 0 0'}}>
                <Col span={1}>
                    <i className="fas fa-bars"></i>
                </Col>
                <Col span={2}></Col>
                <Col span={1}>
                    <i onClick={this.muteVolume} className={this.state.mute ? "fas fa-volume-mute" : "fas fa-volume-up" }></i>
                </Col>
                <Col span={2}></Col>
                <Col span={16}>
                    <Progress strokeColor={this.props.stokeColor ? this.props.stokeColor : '#bdbdbd'} onClick={this.changeVolume.bind(this)} percent={this.state.volume}  showInfo={false}/>
                </Col>
            </Row>
        )
    }
}
