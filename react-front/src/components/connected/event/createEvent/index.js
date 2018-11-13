import React, { Component } from 'react';
import LocationSearchInput from '../locationSearchInput'
import './styles.css';
import axios from 'axios'
import { Icon, Button, Input, DatePicker, Select, Upload, message, Divider, Layout, Col, Row} from 'antd';

const Search = Input.Search;

class CreateEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            "creator": null,
            "members": [],
            "adminMembers": [],
            "title": "",
            "description": "",
            "picture": '',
            "playlist": null,
            "date_creation": new Date(),
            "date": "",
            "public": true,
            "location": { "address" : {"p": "","v": "","cp": "","r": "","n": 0}, "coord": {"lat": 0,"lng": 0}},
            'imageUrl': '',
            'infoFile': '',
            'loading' : false
        };
        this.handlePicture = this.handlePicture.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
    }
    updateLocation(val){
        console.log("Update : ", val)
        let location = {
                "address" : {
                    "p": val.addressObj.address_components[5]  ? val.addressObj.address_components[5].long_name : "Inconnue",
                    "v": val.addressObj.address_components[2]  ? val.addressObj.address_components[2].long_name : "Inconnue",
                    "cp": val.addressObj.address_components[6] ? val.addressObj.address_components[6].long_name : "Inconnue",
                    "r": val.addressObj.address_components[1]  ? val.addressObj.address_components[1].long_name : "Inconnue",
                    "n": val.addressObj.address_components[0]  ? val.addressObj.address_components[0].long_name : "Inconnue"
                },
                "coord": {
                    "lat": val.location.coord ? val.location.coord.lat: 0,
                    "lng": val.location.coord ? val.location.coord.lng: 0,
                }
        }
        this.setState({'location':location})
    }

	handleSubmit = event => {
        event.preventDefault();
        let data = new FormData();
        data.append('file', this.state.infoFile.file.originFileObj);
        delete this.state.imageUrl
        delete this.state.loading
        delete this.state.infoFile

        axios.get('https://192.168.99.100:4242/user/me', {'headers':{'Authorization': 'Bearer '+ localStorage.getItem('token')}})
        .then((resp) => {
            this.setState({creator: resp.data});
            data.append('body', JSON.stringify(this.state));
            axios.post('https://192.168.99.100:4242/event/',  data)
            .then((resp) => { 
                console.log("Create Event : handleSubmit :/event Success");
                this.info("Evènement crée")
                this.props.updateParent({'currentComponent' : "event"})
            })
            .catch((err) => { console.log("Create Event : handleSubmit :/event Error ", err); })  
        })
        .catch((err) => { console.log("Create Event : handleSubmit : /user/me Error : ", err); })  
    }
    
    handleChange = event => {
        if (event.target.name && event.target.name === "public")
         this.setState({"public":!this.state[event.target.name]})   
        else this.setState({[event.target.name]: event.target.value});
    }

    handleChangeDate = (date, dateString) => {
        this.setState({'date_creation': dateString})
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
        this.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl, loading: false}));
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
        console.log(localStorage.getItem('token'))
        this.uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const {Footer,Content } = Layout;
        return (
            <Layout>
            <Content>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div style={{'margin': '0 0 0 25% '}}>
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
                        </div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                 <Divider />
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Input placeHolder="Titre de l'évènement : " name= "title" value={this.state.title} onChange={this.handleChange}/>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <Input.TextArea  placeHolder="Descriptif de l'évènement : " name= "description" value={this.state.description} onChange={this.handleChange}/> 
                    </Col>
                    <Col span={5}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Select style={{'margin': '0 0 0 25% '}} name= "public" value={this.state.public ? "true" : "false"} onChange={this.handleChange}>
                            <Select.Option value='true' >Public</Select.Option>
                            <Select.Option value='false'>Privé</Select.Option>
                        </Select>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <DatePicker  style={{'margin': '0 0 0 25% '}} onChange={this.handleChangeDate} />
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <LocationSearchInput state={this.props.state} updateLocation={this.updateLocation} />
                    </Col>
                    <Col span={5}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={5}></Col>
                    <Col span={14}>
                        <Input.Search
                            placeholder="Ajouter une playlist"
                            onSearch={value => console.log(value)}
                        />
                    </Col>
                    <Col span={5}></Col>
                </Row>
                <Divider />
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <Button style={{'margin': '0 0 0 25% '}} onClick={this.handleSubmit.bind(this)}> Créer l'évènement </Button>
                    </Col>
                    <Col span={8}></Col>
                </Row>

            </Content>
            <Footer>

            </Footer>
        </Layout>
        );
  }
}

export default CreateEvent;
