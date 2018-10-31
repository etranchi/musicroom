import React, { Component } from 'react';
import "./PostUser.css"
import axios from 'axios';


class PostUser extends Component {
    constructor(props) {
        super();
        this.state = {
          login: "TUTU",
          email: "TUTU@gmail.com",
          password: "sdasdsasdasdas"
        }


      }

      handleChangeForm(event) {
        this.setState({[event.target.name]: event.target.value});
      }
      
      handleSubmit = event => {
        event.preventDefault()
        console.log(this.state)
        axios.post(`https://192.168.99.100:4242/user/`, this.state)
        .then(res => {
          // localStorage.setItem('token', resp.data.token);
          let ret = {};
          console.log("res.data ", res.data)
          ret.token = res.data.token;
          axios.put('https://192.168.99.100:4242/user/confirm', null, {'headers':{'Authorization': 'Bearer '+ res.data.token}})
          .then((resp) => {
            console.log("confirm success");
            ret.login = this.state.login
            ret.email = this.state.email
            ret.password = this.state.password
            this.props.handlePostUser(ret);
          })
          .catch((err) => {
            console.log("confirm error -> " + err)
          })
        });
    }
      render() {
        return (
          <div className="PostUser">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className="inputs">
              <label>
                Login:  
                <input type="text"  value={this.state.login} name="login" onChange={this.handleChangeForm.bind(this)} />
              </label>
              </div>
              <div className="inputs">
              <label>
                Password:  
                <input type="password" value={this.state.password} name="password" onChange={this.handleChangeForm.bind(this)}/>
              </label>
              </div>
              <div className="inputs">
                <label>
                  Email:  
                  <input type="email" value={this.state.email} name="email" onChange={this.handleChangeForm.bind(this)} />
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

export default PostUser;
