import React, { Component } from 'react';
import './styles.css';
import { Layout, Row, Col, Divider} from 'antd';
import Map from './map'
import axios from 'axios'
import geolib from 'geolib'
import PreviewCard from '../previewCardEvent'

class listCloseEvent extends Component {
	constructor(props) {
        super(props);

        this.state = {
            events: [],
            loading: false,
            center: {
                lat:48.856614,
                lng:2.3522219
            }
        }

    }
    componentWillMount() {

		this.setState({loading:true});
		axios.get('https://192.168.99.100:4242/event')
		.then((resp) => {
			this.setState({events: resp.data.reverse(),loading:false})
		})
		.catch((err) => {
			this.setState({events: [],loading:false})
			console.log('Events error', err);
		})
    }
    
	render() {
        const {Footer, Content } = Layout;
		if(this.state.loading === true ) {
			this.onLoad = false;
			return <div>Loading...</div>
		}
		else
		{
            return (
                <div>
                    <Layout>
                        <Content>
                            <Row>
                                <Col span={6}></Col>
                                <Col span={12}>
                                <Map  state={this.props.state} center={this.state.center} updateParent={this.props.updateParent}/>
                                </Col>
                                <Col span={6}></Col>
                            </Row>
                            <Divider />
                            <div style={{width:'82%', margin: '0 8% 0 10%'}}>
                                {
                                    this.props.state.data.events.map((event, key) => {
                                        return (
                                            <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/>
                                        )
                                    })
                                }
                            </div>
                        </Content>
                        <Footer>

                        </Footer>
                    </Layout>

            </div>
            );
        }
  }
}

export default listCloseEvent;
