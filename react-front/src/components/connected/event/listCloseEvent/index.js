import React, { Component } from 'react';
import './styles.css';
import { Layout, Row, Col, Divider, Spin } from 'antd';
import axios from 'axios'
import PreviewCard from '../previewCardEvent'
import List from '../listEvent'
import Map from '../map'

export default class listCloseEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            events: [],
            loading: true,
            displayCard:false,
            currentEvent: {}
        };
    }
    componentWillMount = () => {
        window.scrollTo(700, 700)
		axios.get(process.env.REACT_APP_API_URL + '/event')
		.then((resp) => {
            this.setState({events: resp.data.allEvents.reverse()}, () => {
                this.setState({loading:false});
            });
		})
		.catch((err) => {
			console.log('Events error', err);
		})
    }
    updateCurrentEvent = event => {
        this.setState({currentEvent:event, displayCard:true});
    }
	render() {
		if (this.state.loading)
			return <Spin tip=" Waiting events ..." size="large" > </Spin>
        else {
            return (
                <div>
                    <Row> 
                        <Col span={8}> 
                            <a href="#!" className="btn waves-effect waves-teal" onClick={() => this.props.changeView('listEvent')}>Back</a> 
                        </Col> 
                    </Row>
                    <Divider />
                    <Layout>
                        <Layout.Content>
                            <Row >
                                <Col span={2}/>
                                <Col span={14}>
                                    { this.state.loading === true  ?   <div style={{height:'650px', margin:'5% 0 0 0'}}>< Map updateCurrentEvent={this.updateCurrentEvent} state={this.props.state} events={this.state.events}/> </div>: null }
                                </Col>
                                <Col span={2}/>
                                <Col span={6}>
                                    { this.state.displayCard === true ? <div style={{margin:'20% 0 0 0'}}> <PreviewCard event={this.state.currentEvent} state={this.props.state} updateParent={this.props.updateParent} /></div> : null }
                                </Col>
                            </Row>
                            <Divider />
                            <List state={this.props.state} updateParent={this.props.updateParent} openCardEvent={this.props.openCardEvent}/>
                        </Layout.Content>
                    </Layout>
            </div>
            );
        }
    }
}
