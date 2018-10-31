import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
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
			[event.target.id]: event.target.value
		});
	}

	handleSubmit = event => {
		event.preventDefault();
		axios.post('https://192.168.99.100:4242/user/login', {
				'email': this.state.email,
				'password': this.state.password
		})
		.then((resp) => {
			console.log('login success');
			localStorage.setItem('token', resp.data.token);
			this.props.updateParent({'token':resp.data.token});
		})
		.catch((err) => {
			console.log('login error');
			console.log(err);
		})
		console.log("attemp of login");
	}
	render() {

		return (
			<div className="Login">
			<form onSubmit={this.handleSubmit}>
				<FormGroup controlId="email" bsSize="large">
				<ControlLabel>Email</ControlLabel>
				<FormControl
				autoFocus
				type="email"
				value={this.state.email}
				onChange={this.handleChange}
				/>
				</FormGroup>
				<FormGroup controlId="password" bsSize="large">
				<ControlLabel>Password</ControlLabel>
				<FormControl
				value={this.state.password}
				onChange={this.handleChange}
				type="password"
				/>
				</FormGroup>
				<Button
				block
				bsSize="large"
				disabled={!this.validateForm()}
				type="submit"
				>
				Login
				</Button>
			</form>
			</div>
		);
	}
}

export default Login;
