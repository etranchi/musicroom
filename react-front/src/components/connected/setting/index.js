import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';

class Setting extends Component {
	constructor(props) {
		super(props);
		this.state = {user: {}}
		axios.get('https://192.168.99.100:4242/user/me', 
		{'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
		.then((resp) => {
			console.log(resp);
			this.setState({user:resp.data});
			console.log(this.state);
		}).
		catch((err) => {
			console.log('err ->');
			console.log(err);
		})
	}
	render() {
	return (
		<div>
			<p> Bienvenue {this.state.user.login}</p>
			'Setting component'
		</div>
	);
  }
}

export default Setting;