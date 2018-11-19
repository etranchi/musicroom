import React, { Component } from 'react';
import axios from 'axios'
import './styles.css';
import { Icon, Button, Input, Upload, message, Layout, Col, Row, Divider} from 'antd';


class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			login: "",
			imageUrl: null,
			infoFile: null,
			loading: false

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
		if (!this.validateForm)
			this.info("Error invalid input.")
		event.preventDefault();
		let data = new FormData();
		if (this.state.infoFile && this.state.infoFile.file && this.state.infoFile.file.originFileObj)
			data.append('file', this.state.infoFile.file.originFileObj);
		delete this.state.imageUrl
        delete this.state.loading
		delete this.state.infoFile
		data.append('body', JSON.stringify(this.state));
		axios.post('https://192.168.99.100:4242/user', data)
		.then((resp) => {
			axios.put('https://192.168.99.100:4242/user/confirm', null, {'headers':{'Authorization': 'Bearer '+ resp.data.token}})
			.then((resp) => {
				localStorage.setItem('token', resp.data.token);
				console.log("confirm success");
				this.props.updateParent({'token':resp.data.token, 'currentComponent': 'event', 'user': resp.data.user});
			})
			.catch((err) => {
				console.log("confirm error -> " + err)
			})

		})
		.catch((err) => {
			console.log(err);
		})
	}
	handlePicture = (info) => {
        this.setState({infoFile: info})
        if (info.file.status === 'uploading') {
          this.setState({loading:true});
          return;
        }
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl, loading: false}));
      }
    info = (text) => {
        message.info(text);
      };
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
		const {Content} = Layout;
		this.uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
		return (
				<Content>
				<Divider/>
				<Row>
                    <Col span={10}></Col>
                    <Col span={8}>
						<Upload
							name="file"
							listType="picture-card"
							className="avatar-uploader"
							showUploadList={false}
							beforeUpload={this.beforeUpload}
							onChange={this.handlePicture}
						>
							{this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : this.uploadButton}
						</Upload>
                    </Col>
                </Row>
				<Row>
                    <Col span={10}></Col>
                    <Col span={4}>
                    	<Input placeholder="Email" name= "email" value={this.state.email} onChange={this.handleChange}/>
                    </Col>
                </Row>
				<Row>
                    <Col span={10}></Col>
                    <Col span={4}>
                    	<Input placeholder="Login" name= "login" value={this.state.login} onChange={this.handleChange}/>
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
					<Col span={2}>
						<Button style={{'width':'100%'}}size="large"  onClick={this.handleSubmit.bind(this)}> Register </Button>
					</Col>
				</Row>
				<Divider />
				</Content>
		);
	}
}

export default Register;
