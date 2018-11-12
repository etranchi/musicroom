import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import {Button, Col, Row} from 'antd';
import EditSetting from './edit';
const DZ = window.DZ;

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: props.state.user,
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
			axios.get('https://192.168.99.100:4242/user/login/deezer?access_token=' + localStorage.getItem("token") + '&deezerToken=' + response.authResponse.accessToken)
			.then(resp => {
				that.props.updateParent({ user: resp.data })
				that.setState({ user: resp.data })
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
    		this.props.updateParent({ user: resp.data })
    		this.setState({ user: resp.data })
    	})
    	.catch(err => {
    		console.log(err);
    	})
    }
	render() {
		const token = this.state.user.deezerToken
		console.log(this.props.state);
		if (this.props.state.currentComponent == 'editSetting')
			return (<EditSetting state={this.props.state} updateParent={this.props.updateParent}/>)
		else
		{
			return (
			<div>
			<Row type="flex" justify="space-between">
			<Col>
				{!token ? (<Button onClick={this.loginDeezer.bind(this)}>Link Deezer</Button>): (<Button onClick={this.logoutDeezer.bind(this)}>Unlink Deezer</Button>)}
					</Col>
					<Col>
				<Button onClick={this.props.updateParent.bind(this,{'currentComponent': 'editSetting'})}>Edit</Button>
				</Col>
				</Row>
				<p> Login: {this.state.user.login}</p>
				<p> email: {this.state.user.email}</p>
				<p> Status: {this.state.user.status}</p>
			</div>
		);
		}
  }
}

export default Setting;

