import React, { Component } from 'react';
import {Row, Col, Progress } from 'antd';

const { DZ } = window;

export default class Progressor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            percent:0
        };
        this.elapsed    = React.createRef()
        this.duration   = React.createRef()
        this.progress   = React.createRef()
    }
    convertTime = time => {
        let min = Math.floor(time / 60)
        let s   = Math.floor(time % 60)
        return `${min}:${(s < 10 ? '0' : '') + s}`
    }
    showPosition = () => {
        DZ.Event.subscribe('player_position', e => {
            if (this.elapsed.current && this.duration.current && e[1]) {
                e[1] && this.setState({percent:e[0]/e[1] * 100}, () => {
                    this.elapsed.current.textContent = this.convertTime(e[0]);
                    this.duration.current.textContent = this.convertTime(e[1]);
                });
            }
        });
    }
    changeSeek = ({ target, clientX }) => {
        const { x, width } = target.getBoundingClientRect();
        this.setState({percent:(clientX - x) / width * 100}, () => {
            DZ.player.seek((clientX - x) / width * 100);
        });
    }
    componentDidMount() {
        this.showPosition();
    }
    render() {
        return (
            <Row style={{height:'inherit'}}>
                <Col span={3} style={{textAlign:'center'}}>
                    <b ref={this.elapsed}>0:00</b>
                </Col>
                <Col span={18}>
                    <Progress  strokeColor={this.props.stokeColor ? this.props.stokeColor : '#bdbdbd'} onClick={this.changeSeek.bind(this)} percent={this.state.percent}  showInfo={false}/>
                </Col>
                <Col span={3} style={{textAlign:'center'}}>
                    <b ref={this.duration}>0:00</b>
                </Col>
            </Row>
        );
    }
}