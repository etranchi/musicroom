import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios'
import './styles.css';

class Register extends Component {
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
		axios.post('https://192.168.99.100:4242/user', {
				'login':'jules',
				'email': this.state.email,
				'password': this.state.password
		})
		.then((resp) => {
			axios.put('https://192.168.99.100:4242/user/confirm', null, {'headers':{'Authorization': 'Bearer '+ resp.data.token}})
			.then((resp) => {
				localStorage.setItem('token', resp.data.token);
				console.log("confirm success");
				this.props.updateParent({'token':resp.data.token,'currentComponent': 'event'});
			})
			.catch((err) => {
				console.log("confirm error -> " + err)
			})

		})
		.catch((err) => {
			console.log(err);
		})
	}
	render() {
		return (
			<div className="Register">
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
				Register
				</Button>
			</form>
			</div>
		);
	}
}

export default Register;
