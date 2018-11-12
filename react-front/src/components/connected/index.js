import React, { Component } from 'react';
import './styles.css';
import Event from './event'
import Playlist from './playlist'
import Setting from './setting'
import List from './event/listEvent'
import { Layout, Menu, Icon, Button, Row, Col } from 'antd';
import {  } from 'antd';

const { Header, Sider, Content } = Layout;


class Connected extends Component {
	constructor(props){
		super(props);
		this.state = {
	    collapsed: true,
	    height: props.height
	  };
	}

	deleteToken() {
		localStorage.setItem('token', '');
		this.props.updateParent({'token': '', 'currentComponent': 'login'})
	}

	componentWillMount(){
	    this.setState({height: window.innerHeight + 'px'});
	  }


  	toggle(){
	    this.setState({
	      collapsed: !this.state.collapsed,
	    });
	}


	render() {
	return (
		<Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" onClick={this.props.updateParent.bind(this, {'currentComponent':'event'})}>
	            <Icon type="calendar" />
	            <span >Event</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={this.props.updateParent.bind(this, {'currentComponent':'playlist'})}>
            <Icon type="bars" />
            <span>Playlist </span>
          </Menu.Item>
          <Menu.Item key="3" onClick={this.props.updateParent.bind(this, {'currentComponent':'setting'})}>
            <Icon type="tool" />
            <span>Setting</span>
          </Menu.Item>
        </Menu>
        </Sider>
        <Layout> 
          <Header style={{ background: '#fff', padding: 0 }}>
	          <Row type="flex" justify="space-between">
	          	<Col span={4}>
	           		<Icon
		              className="trigger"
		              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
		              onClick={this.toggle.bind(this)}
	            	/>
	            </Col>
	            <Col span={4}>
	           		<h1>Music Room</h1>
	            </Col>
	            <Col span={4} style={{'textAlign':'right'}}>
	            	<Button type="primary" onClick={this.deleteToken.bind(this)}>Disconnect</Button>
	            </Col>
		        </Row>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: this.state.height }}>
            {this.props.state.currentComponent === 'event' || this.props.state.currentComponent === 'cardEvent'? <Event state={this.props.state} updateParent={this.props.updateParent}/> : null}
	 					{this.props.state.currentComponent === 'playlist' || this.props.state.currentComponent === 'tracks'? <Playlist state={this.props.state} updateParent={this.props.updateParent}/> : null}
	 					{this.props.state.currentComponent === 'setting'? <Setting state={this.props.state} updateParent={this.props.updateParent}/> : null}
          </Content>
        </Layout>
      </Layout>
		
	);
  }
}

export default Connected;