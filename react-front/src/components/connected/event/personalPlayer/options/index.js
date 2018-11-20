import React, { Component } from 'react';
import './styles.css';
import {Layout, Row, Col, Icon, Progress} from 'antd';


const {Content } = Layout;
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
            <Content>
                <Row style={{height:'80px', padding:'12% 0 0 5%'}}>
                    <Col span={1}>
                        <i class="fas fa-bars"></i>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={1}>
                        <i onClick={this.muteVolume} className={this.state.mute ? "fas fa-volume-mute" : "fas fa-volume-up" }></i>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={12}>
                        <Progress  onClick={this.changeVolume.bind(this)} percent={this.state.volume}  showInfo={false}/>
                    </Col>
                </Row>
            </Content>
        )
    }
}
