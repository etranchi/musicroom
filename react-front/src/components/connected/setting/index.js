import React, { Component } from 'react';
import axios from 'axios';
import './styles.css';
import EditSetting from './edit';
import {Button, Divider, Layout, Col, Row, Card, Avatar} from 'antd';

const DZ = window.DZ;

class Setting extends Component {
	constructor(props) {
		super(props);
		console.log("setting constructor");
		console.log("props");
		console.log(props);
		this.state = {
			user: props.state.user,
			error: {},
			loading: false
		}
		console.log("state");
		console.log(this.state);
	}

	componentWillMount = () => {
		console.log('setting somponent will mount');
		axios.get(process.env.REACT_APP_API_URL + '/user/me', 
		{'headers':{'Authorization':'Bearer '+ localStorage.getItem('token')}})
		.then((resp) => {
			this.setState({user:resp.data, loading:true});
		})
		.catch((err) => {
			this.setState({error: err})
		})
	}

	loginDeezer = () => {
		const that = this;
		DZ.init({
		    appId  : '310224',
		    channelUrl : 'https://localhost:3000',
		  });
        DZ.login(function(response) {
          if (response.authResponse) {
			axios.put(process.env.REACT_APP_API_URL + '/user/login/deezer?access_token=' + localStorage.getItem("token") + '&deezerToken=' + response.authResponse.accessToken)
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

    logoutDeezer = () => {
    	axios.delete(process.env.REACT_APP_API_URL + '/user/login/deezer', {'headers':{'Authorization' : 'Bearer ' + localStorage.getItem('token')}})
    	.then(resp => {
    		this.props.updateParent({ user: resp.data })
    		this.setState({ user: resp.data })
    	})
    	.catch(err => {
    		console.log(err);
    	})
    }

	render() {
		console.log("setting render props -> ");
		console.log(this.props);
		console.log("state -> ");
		console.log(this.state);
		const {Content, Footer, Header} = Layout;
		let token = null;
		if (this.state.user && this.state.user.deezerToken)
			token = this.state.user.deezerToken
		if (!this.state.loading)
			return <p> OUPSI </p>
		if (this.props.state.currentComponent === 'editSetting')
			return (<EditSetting state={this.props.state} updateParent={this.props.updateParent}/>)
		else
		{
			let userPicture = this.state.user.facebookId ? process.env.REACT_APP_API_URL + "/userPicture/" + this.state.user.picture : process.env.REACT_APP_API_URL + "/userPicture/" + this.state.user.picture
			console.log(userPicture)
			return (
				<Layout>
					<Header> <h1>Profil : </h1></Header>
					<Content>
						<Row style={{height:50}}/>
						<Row>
							<Col span={8}/>
							<Col>
							{!token ? (<Button onClick={this.loginDeezer.bind(this)}>Link Deezer</Button>): (<Button onClick={this.logoutDeezer.bind(this)}>Unlink Deezer</Button>)}
							</Col>
						</Row>
						<Divider />
						<Row>
							<Col span={4}/>
							<Col span={4}>
								<Card.Meta avatar={<Avatar size={116} src={userPicture}/>} />
							</Col>
							<Col>
								<Button onClick={this.props.updateParent.bind(this,{'currentComponent': 'editSetting'})}>Edit</Button>
							</Col>
						</Row>
						<Divider />
						<Row>
							<Col span={4}/>
							<Col span={3}>
								<p style={{float:'right'}}>Adresse électronique :</p>
							</Col>
							<Col span={1}/>
							<Col span={6}>
								<b> {this.state.user.email}</b>
							</Col>
						</Row>
						<Row>
							<Col span={4}/>
							<Col span={3}>
								<p style={{float:'right'}}> Login :</p>
							</Col>
							<Col span={1}/>
							<Col span={6}>
								<b> { this.state.user.login }</b>
							</Col>
						</Row>
						<Row>
							<Col span={4}/>
							<Col span={3}>
								<p style={{float:'right'}}> Instruit depuis le : </p>
							</Col>
							<Col span={1}/>
							<Col span={6}>
								<b> { new Date(this.state.user.creationDate).toLocaleDateString('fr-FR')}</b>
							</Col>
						</Row>
						<Divider />
					</Content>
					<Footer>
					</Footer>
				</Layout>
		);
		}
  }
}

export default Setting;

