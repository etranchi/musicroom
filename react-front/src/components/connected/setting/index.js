import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';
import {Button} from 'antd'

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			error: {}
		}
		this.getUser();
	}

	getUser() {
		axios.get('https://192.168.99.100:4242/user/me', 
		{'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
		.then((resp) => {
			this.setState({user:resp.data});
		})
		.catch((err) => {
			this.setState({error: err})
			console.log(err);
		})
	}
	loginDeezer () {
        const script = document.createElement("script");

        script.async = true;
        script.type = 'text/javascript'
        script.text = "DZ.init({app_id  : '310224', channelUrl : 'https://localhost:3000'});\
        DZ.ready(function(sdk_options){\
          console.log('DZ SDK is ready', sdk_options);\
        });\
        DZ.login(function(response) {\
          if (response.authResponse) {\
            console.log(response.authResponse);\
            console.log('Welcome!  Fetching your information.... ');\
			var xhttp = new XMLHttpRequest();\
			xhttp.open('GET', 'https://192.168.99.100:4242/user/login/deezer?access_token=" + localStorage.getItem('token') + "', true);\
			xhttp.setRequestHeader('Content-Type', 'application/json');\
			xhttp.setRequestHeader('Authorization', 'Bearer " + localStorage.getItem('token') + "');\
			xhttp.send();\
            DZ.api('/user/me', function(response) {\
              console.log(response);\
              console.log('Good to see you, ' + response.name + '.');\
            });\
          } else {\
            console.log('User cancelled login or did not fully authorize.');\
          }\
        }, {perms: 'basic_access,email,offline_access,manage_library,delete_library'});"

        document.body.appendChild(script);
    }
	// loginDeezer() {
	// 	
	// }
	render() {
	return (
		<div>
		<Button onClick={this.loginDeezer}>Login Deezer</Button>
			<p> Login: {this.state.user.login}</p>
			<p> email: {this.state.user.email}</p>
			<p> Status: {this.state.user.status}</p>
		</div>
	);
  }
}

export default Setting;

