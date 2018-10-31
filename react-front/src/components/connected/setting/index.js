import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';

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
		}).
		catch((err) => {
			this.setState({error: err})
			console.log(err);
		})
	}
	render() {
	return (
		<div>
			<p> Login: {this.state.user.login}</p>
			<p> email: {this.state.user.email}</p>
			<p> Status: {this.state.user.status}</p>
		</div>
	);
  }
}

export default Setting;