import React, { Component } from 'react';
import './reset.css';
import './App.css'
import Connection from './components/connection'
import Connected from './components/connected'
import "antd/dist/antd.css";
// import "./default.less";   // override variables here
import axios from 'axios'
import {Button, Layout, Menu, Icon} from 'antd';

const { Header, Content } = Layout

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentComponent: localStorage.getItem('token') && localStorage.getItem('token').length > 0 ? 'event' : 'login',
      token: localStorage.getItem('token'),
      'data': [],
      'id': null,
      'user': null,
      'playlistId': null
    }
    
	}

  updateState = (val) => {
    
    console.log("old state ->");
    console.log(this.state);
    console.log("new state ->");
    console.log(val);
    this.setState(val);
  }
  componentDidUpdate= () => {
    console.log(this.state);
  }
  
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token)
    {
      axios.get('https://192.168.99.100:4242/user/me', 
      {'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
      .then((resp) => {
        this.setState({user:resp.data, token:localStorage.getItem('token')});
        console.log(resp);
      })
      .catch((err) => {
        console.log(err);
    })
    }
  }
  deleteToken() {
    localStorage.setItem('token', '');
    this.updateState({'token': '', 'currentComponent': 'login'})
  }
  render() {
    const token = localStorage.getItem('token')
    return (
        <Layout className="App">
          <Header className="HeaderApp">
              <img className="HeaderImage" src="/header.png"></img>
              <div className="disconnect"> 
                	<Button type="primary" onClick={this.deleteToken.bind(this)}>Disconnect</Button>
              </div>
              <div className="navBar">
                  <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={this.updateState.bind(this, {'currentComponent':'event'})}>
                        <Icon type="calendar" />
                        <span><b>Event</b></span>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={this.updateState.bind(this, {'currentComponent':'playlist'})}>
                      <Icon size={16} type="bars" />
                      <span> <b>Playlist</b> </span>
                    </Menu.Item>
                    <Menu.Item key="3" onClick={this.updateState.bind(this, {'currentComponent':'setting'})}>
                      <Icon type="tool" />
                      <span><b>Setting</b></span>
                    </Menu.Item>
                  </Menu>
              </div>

          </Header>
          <Content>
              <div id="dz-root"></div>
              {token ? (
                <Connected updateParent={this.updateState} state={this.state}/>

              ) : (
                <Connection updateParent={this.updateState} state={this.state}/>
              )}

          </Content>
        </Layout>
      
    );
  }
}

export default App;
