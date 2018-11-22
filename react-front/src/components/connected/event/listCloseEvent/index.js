import React, { Component } from 'react';
import './styles.css';
import { Layout, Row, Col, Divider} from 'antd';
import Map from './map'
import axios from 'axios'
import List from '../listEvent'

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
		axios.get(process.env.REACT_APP_API_URL + '/event')
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
                            <List state={this.props.state} updateParent={this.props.updateParent}/>
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
