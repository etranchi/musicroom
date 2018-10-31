import React, { Component } from 'react';
import "./LoginUser.css"
import axios from 'axios';



class LoginUser extends Component {
    constructor(props) {
        super();
        this.state = {
          email: "TUTU",
          password: "sdasdsasdasdas"
        }
    }

    handleChangeForm(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleLogin = event => {
        event.preventDefault()
        console.log(this.state)
        axios.post(`https://192.168.99.100:4242/user/login`, {email: this.state.email, password: this.state.password})
        .then(res => {
            console.log("Data : ", res.data)
            this.props.handleLoginUser("RIEN")
        })
        .catch((err) => {
            console.log("confirm error -> " + err)
        })
    }
      render() {
        return (
            <div className="PUser">
                <form onSubmit={this.handleLogin.bind(this)}>
                <div className="inputs">
                <label>
                    Email:  
                    <input type="text"  value={this.state.email} name="email" onChange={this.handleChangeForm.bind(this)} />
                </label>
                </div>
                <div className="inputs">
                <label>
                    Password:  
                    <input type="password" value={this.state.password} name="password" onChange={this.handleChangeForm.bind(this)}/>
                </label>
                </div>
                <div className="inputs">
                    <input type="submit" value="submit" />
                </div>
                </form>
          </div>
        );
    }
}

export default LoginUser;
