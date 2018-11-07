import React, { Component, Redirect } from 'react';
import './styles.css';
import Login from './login'
import Register from './register'
import {Button} from 'antd'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';

class Connection extends Component {
  loginFacebook(){
    // return <Redirect to='https://192.168.99.100:4242/user/login/facebook'/>;
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
      this.props.updateParent({'token':resp.data.token, 'currentComponent': 'event'});
    })
    .catch((err) => {
      console.log(err);
    })
  }
    
    console.log(response.accessToken);
}
  render() {
    return (
      <div>
      	<div style={{'textAlign':'center', 'margin': '1em'}}>	
        <FacebookLogin
          appId="711181125906087"
          autoLoad={false}
          fields="name,email,picture" 
          callback={this.responseFacebook.bind(this)} />
        {this.props.state.currentComponent === 'register'? <Button type="primary" onClick={this.loginFacebook}>facebook</Button> : null}
      	{this.props.state.currentComponent === 'register'? <Button type="primary" onClick={this.props.updateParent.bind(this, {'currentComponent':'login'})}>Login</Button> : null}
      	{this.props.state.currentComponent === 'login'? <Button type="primary" onClick={this.props.updateParent.bind(this, {'currentComponent':'register'})}>Register</Button> : null}
      	</div>
       	{this.props.state.currentComponent === 'register'? <Register updateParent={this.props.updateParent}/> : null}
       	{this.props.state.currentComponent === 'login'? <Login updateParent={this.props.updateParent}/> : null}
      </div>
    );
  }
}

export default Connection;
