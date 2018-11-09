import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';
import {Button} from 'antd'
const DZ = window.DZ;

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			error: {}
		}
		this.getUser();
		this.loginDeezer = this.loginDeezer.bind(this);
		this.logoutDeezer = this.logoutDeezer.bind(this);
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
		const that = this;
		DZ.init({
		    appId  : '310224',
		    channelUrl : 'https://localhost:3000',
		  });
        DZ.login(function(response) {
          if (response.authResponse) {
			axios.get('https://192.168.99.100:4242/user/login/deezer?access_token=' + localStorage.getItem("token"))
			.then(resp => {
				that.props.updateParent({ user: { ...that.state.user, deezerToken: resp.data.deezerToken} } )	
			})
			.catch(err => {
				console.log(err);
			})
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, {perms: 'basic_access,email,offline_access,manage_library,delete_library'});
    }

    logoutDeezer() {
    	axios.delete('https://192.168.99.100:4242/user/login/deezer', {'headers':{'Authorization' : 'Bearer ' + localStorage.getItem('token')}})
    	.then(resp => {
    		this.props.updateParent({ user: { ...this.state.user, deezerToken: null} } )
    	})
    	.catch(err => {
    		console.log(err);
    	})
    }
	render() {
		const token = this.props.state.user.deezerToken
	return (
		<div>
		{!token ? (<Button onClick={this.loginDeezer.bind(this)}>Login Deezer</Button>): (<Button onClick={this.logoutDeezer.bind(this)}>Logout Deezer</Button>)}
			<p> Login: {this.state.user.login}</p>
			<p> email: {this.state.user.email}</p>
			<p> Status: {this.state.user.status}</p>
		</div>
	);
  }
}

export default Setting;

