import React, { Component } from 'react';
import './styles.css';
import Login from './login'
import Register from './register'
import {Button} from 'antd'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';

class Connection extends Component {
  loginFacebook(){
    axios.get('https://192.168.99.100:4242/user/login/facebook', {'headers':{}})
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => {
      console.log(err);
    })
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
  render() {
    return (
      <div>
      	<div style={{'textAlign':'center', 'margin': '1em'}}>	
        <div>
      	{this.props.state.currentComponent === 'register'? <Button type="primary" onClick={this.props.updateParent.bind(this, {'currentComponent':'login'})}>Login</Button> : null}
      	{this.props.state.currentComponent === 'login'? <Button type="primary" onClick={this.props.updateParent.bind(this, {'currentComponent':'register'})}>Register</Button> : null}
        </div>
        <FacebookLogin
          appId="711181125906087"
          autoLoad={false}
          fields="name,email,picture" 
          callback={this.responseFacebook.bind(this)} />
        <GoogleLogin
          clientId="479103948820-tb38ba04oig61ogfdjgs6s07u9ph626o.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle.bind(this)}
          onFailure={this.responseGoogle.bind(this)}
        />
      	</div>
       	{this.props.state.currentComponent === 'register'? <Register updateParent={this.props.updateParent}/> : null}
       	{this.props.state.currentComponent === 'login'? <Login updateParent={this.props.updateParent}/> : null}
      </div>
    );
  }
}

export default Connection;
