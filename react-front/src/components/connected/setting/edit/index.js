import React, { Component } from 'react';
import axios from 'axios';
import { Icon, Button, Input, Upload, message, Divider, Layout, Col, Row} from 'antd';


class EditSetting extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			login: props.state.user.login,
			password: null,
			cpypassword: null,
			picture: props.state.user.picture.facebookId ?  props.state.user.picture : "https://192.168.99.100:4242/userPicture/" +  props.state.user.picture,
			newPicture: '',
			loading:false,
			infoFile: '',
		}
		this.currentUser = props.state.user;
		this.updateChange = this.updateChange.bind(this);
		this.updateSave = this.updateSave.bind(this);

	}


	updateChange(e) {
		this.setState({[e.target.name]: e.target.value})
	}

	checkInput = () => {

		let err = 0;
		if (this.state.login)
		{
			if (this.state.login.length < 3)
			{
				err++;
				this.info("Password to short")
			}
			else
				this.currentUser.login = this.state.login
		}
		if (this.state.password && this.state.cpypassword)
		{
			if (this.state.password.length < 8)
			{
				err++;
				this.info("Password to short")
			}
			else if (this.state.password !== this.state.cpypassword)
			{
				err++;
				this.info("Pasword != Copy password")
			}
			else
				this.currentUser.password = this.state.password
		}
		return (err)
	}
	updateSave() {
		let data = new FormData();

		if (this.checkInput() === 0)
		{
			if (this.state.infoFile && this.state.infoFile.file && this.state.infoFile.file.originFileObj)
				data.append('file', this.state.infoFile.file.originFileObj);
			data.append('body', JSON.stringify(this.currentUser));
			axios.put('https://192.168.99.100:4242/user/me', data,{'headers' : {'Authorization': 'Bearer '+ localStorage.getItem('token')}})
			.then(resp => {
				this.props.updateParent({currentComponent: 'setting', user:resp.data});
				console.log(resp);
			})
			.catch(err => { console.log(err); })
		}
	}

	info = (text) => {
        message.info(text);
      };

	  handlePicture = (info) => {
        this.setState({infoFile: info})
        if (info.file.status === 'uploading') {
          this.setState({loading:true});
          return;
        }
        this.getBase64(info.file.originFileObj, newPicture => this.setState({ newPicture, loading: false}));
      }
      
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
    beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) message.error('You can only upload JPG file!');
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) message.error('Image must smaller than 2MB!');
        return isJPG && isLt2M;
	  }
	  
	render() {

		const {Content, Footer, Header} = Layout
		this.uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
		  );
	return (
			<Layout>
			<Header> <h1>Modifier le profil : : </h1></Header>
			<Content>
				<Row style={{height:50}}/>
				<Row>
					<Col span={4}/>
					<Col span={4}>
						<div style={{'margin': '0 0 0 25% '}}>
							<Upload
									name="file"
									listType="picture-card"
									className="avatar-uploader"
									showUploadList={false}
									beforeUpload={this.beforeUpload}
									onChange={this.handlePicture}
								>
								<img src={this.state.newPicture ? this.state.newPicture : this.state.picture} alt="avatar" />
								{this.state.newPicture ? null : this.uploadButton}
							</Upload>
                        </div>
					</Col>
					<Col span={1}>
						<Button onClick={this.props.updateParent.bind(this,{'currentComponent': 'setting'})}>Back</Button>
					</Col>
				</Row>
				<Divider />
				<Row>
					<Col span={4}/>
					<Col span={3}>
						<p> Login :</p>
					</Col>
					<Col span={1}/>
					<Col span={6}>
						<Input name="login" placeholder="Enter your login" style={{ width: 200 }} value={this.state.login} onChange={this.updateChange}/>
					</Col>
				</Row>
				<Row>
					<Col span={4}/>
					<Col span={3}>
						<p> Mot de passe : </p>
					</Col>
					<Col span={1}/>
					<Col span={6}>
						<Input name="password" type="password" placeholder="Enter your password" style={{ width: 200 }} value={this.state.password} onChange={this.updateChange}/>
					</Col>
				</Row>
				<Row>
					<Col span={4}/>
					<Col span={3}>
						<p> Confirmer le mot de passe : </p>
					</Col>
					<Col span={1}/>
					<Col span={6}>
						<Input name="cpypassword" type="password" placeholder="Enter your password" style={{ width: 200 }} value={this.state.cpypassword} onChange={this.updateChange}/>
					</Col>
				</Row>
				<Divider />
				<Row>
					<Col span={8}/>
					<Col span={6}>
						<Button onClick={this.updateSave}>Save</Button>
					</Col>
				</Row>
				
			</Content>
			<Footer>
			</Footer>
		</Layout>
	);
  }
}

export default EditSetting;

