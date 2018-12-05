import React, { Component } from 'react';
import '../reset.css';
import '../App.css'
import Connection from './connection'
import Connected from './connected'
import Menu from './other/menu'
import FooterLegacy from './other/footerLegacy'
import "antd/dist/antd.css";
import axios from 'axios'
import {Button, Layout} from 'antd';

const { Header, Content, Footer } = Layout

class Front extends Component {
    constructor(props) {
		super(props);
		this.state = {
			currentComponent: localStorage.getItem('token') && localStorage.getItem('token').length > 0 ? 'event' : 'login',
      token: localStorage.getItem('token'),
      'data': [],
      'id': null,
      'user': null,
      'playlistId': null,
      'selected':'event'
    }
    
	}

  updateState = (val) => {
    // console.log("old state ->");
    // console.log(this.state);
    // console.log("new state ->");
    // console.log(val);
    // console.log('end update parent');
    this.setState(val);
  }
  
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token && !this.state.user)
    {
      axios.get(process.env.REACT_APP_API_URL + '/user/me', 
      {'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
      .then((resp) => {
        this.setState({user:resp.data, token:localStorage.getItem('token')});
      })
      .catch((err) => {
        console.log(err);
    })
    }
  }

  logout = () => {
    localStorage.setItem('token', '');
    this.updateState({'token': '', 'currentComponent': 'login'})
  }

	render() {
        const token = localStorage.getItem('token')
		return (
          <Layout className="App">
            <Header className="HeaderApp">
              <img alt="headerImg" className="HeaderImage" src="/header.png"></img>
              {token && <div className="disconnect"><Button className="disconnect" type="primary" onClick={this.logout}>Disconnect</Button></div>}
              {token && <Menu  state={this.state} updateParent={this.updateState}/>}
            </Header>
            <Content style={{backgroundColor:'#263238 !important'}}>
              <div id="dz-root"></div>
              {token && <Connected updateParent={this.updateState} state={this.state} logout={this.logout}/>}
              {!token && <Connection updateParent={this.updateState} state={this.state}/>}
            </Content>
            <Footer style={{backgroundColor:'#263238'}}>
              <FooterLegacy />
            </Footer>
          </Layout>
		);
	}
}

export default Front;
