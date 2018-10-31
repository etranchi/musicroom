import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';

class Setting extends Component {
	constructor(props) {
		super(props);
		// let user;
		// axios.get('https://192.168.99.100:4242/user/me',
		// 	null, 
		// })
		// .then((resp) => {
		// 	console.log('user ->');
		// 	console.log(resp);
		// }).
		// catch((err) => {
		// 	console.log('err ->');
		// 	console.log(err);
		// })
	}
	render() {
	return (
		<div>
			'Setting component'
		</div>
	);
  }
}

export default Setting;