import React, { Component } from 'react';
import {Button, Input, Layout, Col, Row, Divider} from 'antd';
import axios from 'axios'
import './styles.css';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};
	}
	validateForm() {
		return this.state.email.length > 0 && this.state.password.length > 0;
	}
	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}
	handleSubmit = event => {
		event.preventDefault();
		axios.post('https://192.168.99.100:4242/user/login', {
				'email': this.state.email,
				'password': this.state.password
		})
		.then((resp) => {
			console.log('login success', resp.data)
			localStorage.setItem('token', resp.data.token)
			this.props.updateParent({'token':resp.data.token, 'currentComponent': 'event', 'user': resp.data.user});
		})
		.catch((err) => { console.log('login error', err); })
	}
	render() {
		const {Content} = Layout;
		return (
			<Content>
			<Divider/>
			<Row>
				<Col span={10}></Col>
				<Col span={4}>
					<Input placeholder="Email" name= "email" value={this.state.email} onChange={this.handleChange}/>
				</Col>
			</Row>
			<Row>
				<Col span={10}></Col>
				<Col span={4}>
					<Input placeholder="Password" type="password" name= "password" value={this.state.password} onChange={this.handleChange}/>
				</Col>
			</Row>
			<Row>
				<Col span={11}></Col>
				<Col span={4}>
					<Button  onClick={this.handleSubmit.bind(this)}> Login </Button>
				</Col>
			</Row>
			<Divider />
			</Content>
		);
	}
}

export default Login;
