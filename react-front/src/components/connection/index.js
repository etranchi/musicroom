import React, { Component } from 'react';
import './styles.css';
import Login from './login'
import Register from './register'
import {Row,  Col, Menu, Icon} from 'antd'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class Connection extends Component {

  constructor(props) {
    super(props)

    this.state = {
      current:"mail"
    }
  }
  responseFacebook(response) {
    if (response.accessToken)
    {
      axios.get('https://192.168.99.100:4242/user/login/facebook', {'headers':{'Authorization':'Bearer '+ response.accessToken}})
      .then((resp) => {
        localStorage.setItem('token', resp.data.token)
        this.props.updateParent({'token':resp.data.token, 'currentComponent': 'event', 'user': resp.data.user});
      })
      .catch((err) => {
        console.log(err);
      })
    }
      
      console.log(response.accessToken);
  }
  responseGoogle(response){
    console.log(response);
    if (response.tokenObj.id_token)
    {
      axios.get('https://192.168.99.100:4242/user/login/google', {'headers':{'access_token':response.accessToken}})
      .then((resp) => {
        localStorage.setItem('token', resp.data.token)
        this.props.updateParent({'token':resp.data.token, 'currentComponent': 'event', 'user': resp.data.user});
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }
  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={10}></Col>
          <Col span={4}>
            <div style={{textAlign:'center'}}>
              <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
              >
                <Menu.Item key="login" onClick={this.props.updateParent.bind(this, {'currentComponent': 'login'})}>
                  <Icon type="login" />Login
                </Menu.Item>
                <Menu.Item key="register" onClick={this.props.updateParent.bind(this,{'currentComponent': 'register'})}>
                <Icon type="form" /> Register
                </Menu.Item>
              </Menu>
            </div>
          </Col>
         </Row>
       	  {this.props.state.currentComponent === 'register'? <Register updateParent={this.props.updateParent}/> : null}
          {this.props.state.currentComponent === 'login'? <Login updateParent={this.props.updateParent}/> : null}
         <Row style={{height:'80px'}}>
          <Col span={8}></Col>
          <Col span={3}>
            <FacebookLogin
              appId="711181125906087"
              autoLoad={false}
              fields="name,email,picture" 
              cssClass="facebook_button"
              callback={this.responseFacebook.bind(this)} />
          </Col>
          <Col span={2}></Col>
          <Col span={3}>
            <GoogleLogin
              clientId="479103948820-tb38ba04oig61ogfdjgs6s07u9ph626o.apps.googleusercontent.com"
              className="google_button"
              onSuccess={this.responseGoogle.bind(this)}
              onFailure={this.responseGoogle.bind(this)}/>
          </Col>
         </Row>
      </div>
    );
  }
}


export default Connection;
