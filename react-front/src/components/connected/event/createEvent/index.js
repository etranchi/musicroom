import React, { Component } from 'react';
import LocationSearchInput from '../locationSearchInput'
import './styles.css';
import axios from 'axios'
import SearchBar from '../../searchbar'
import { Avatar, Card, Icon, Button, Input, DatePicker, Select, Upload, message, Divider, Layout, Col, Row} from 'antd';

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
            "event_date": new Date(),
            "date": "",
            "public": true,
            "location": { "address" : {"p": "","v": "","cp": "","r": "","n": 0}, "coord": {}},
            'imageUrl': '',
            'infoFile': '',
            'loading' : false,
        };
        this.handlePicture = this.handlePicture.bind(this);
        this.updateLocation = this.updateLocation.bind(this);
    }
    updateLocation = (val) => {
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

    updateEventPlaylist = (playlist) => {
        if (playlist)
        {
            axios.get(process.env.REACT_APP_API_URL + '/playlist/' + playlist.id, {'headers':{'Authorization': 'Bearer '+ localStorage.getItem('token')}})
            .then((resp) => { 
                playlist.tracks = {}
                playlist.tracks.data = {}
                playlist.tracks.data= resp.data.data
                this.setState({playlist:playlist})
            })
            .catch((err) => { console.log("Wrong Playlist id.", err); })  
        }
        this.setState({playlist:playlist})
    }
    info = (text) => {
        message.info(text);
    };
	handleSubmit = event => {
        if (!this.state.description || !this.state.title || !this.state.event_date || !this.state.location.coord)
            this.info("Error input invalid")
        event.preventDefault();
        let data = new FormData();
        if (this.state.infoFile && this.state.infoFile.file && this.state.infoFile.file.originFileObj)
         data.append('file', this.state.infoFile.file.originFileObj);
        delete this.state.imageUrl
        delete this.state.loading
        delete this.state.infoFile

        axios.get(process.env.REACT_APP_API_URL + '/user/me', {'headers':{'Authorization': 'Bearer '+ localStorage.getItem('token')}})
        .then((resp) => {
            this.setState({creator: resp.data});
            data.append('body', JSON.stringify(this.state));
            axios.post(process.env.REACT_APP_API_URL + '/event/',  data)
            .then((resp) => { 
                console.log("Create Event : handleSubmit :/event Success");
                this.info("Evènement crée")
                this.props.updateParent({'currentComponent' : "createEvent"})
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
        this.setState({'event_date': dateString})
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

    resetPicture = () => {
        console.log("JE SUIS IC ")
        this.setState({infoFile:null, imageUrl: null, loadind:false})
    }
	render = () => {
        console.log(localStorage.getItem('token'))
        this.uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const {Footer,Content } = Layout;
        return (
            <Layout >
                <Content>
                    {
                        this.state.imageUrl ?
                            null
                            :
                            <Row>
                                <Col span={8}></Col>
                                <Col span={8}>
                                    <div style={{'margin': '0 0 0 25% '}}>
                                        <Upload name="file" listType="picture-card" className="avatar-uploader" showUploadList={false} beforeUpload={this.beforeUpload} onChange={this.handlePicture} >
                                            {this.uploadButton}
                                        </Upload>
                                    </div>
                                    <Divider />
                                </Col>
                            </Row>
                    }
                    {
                        this.state.imageUrl ?
                            <Row>
                                <Col span={8}></Col>
                                <Col span={8}>
                                    <div style={{'textAlign': 'center', 'margin': '0 0 0 12% '}}>
                                        <Card.Meta avatar={ <Avatar  size={448}src={this.state.imageUrl} alt="avatar" />}/>
                                        <i onClick={() => this.resetPicture()} className="zoomCard fas fa-sync-alt"></i>
                                    </div>
                                    <Divider />
                                </Col>
                            </Row>
                            :
                            null
                    }
                    <Row>
                        <Col span={8}></Col>
                        <Col span={8}>
                            <Input placeholder="Titre de l'évènement : " name= "title" value={this.state.title} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14}>
                            <Input.TextArea  placeholder="Descriptif de l'évènement : " name= "description" value={this.state.description} onChange={this.handleChange}/> 
                            <Divider />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={11}></Col>
                        <Col span={2}>
                            <div style={{'margin': '0 0 0 12% '}}>
                                <Select name= "public" value={this.state.public ? "true" : "false"} onChange={this.handleChange}>
                                    <Select.Option value='true' >Public</Select.Option>
                                    <Select.Option value='false'>Privé</Select.Option>
                                </Select>
                            </div>
                            <Divider />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}></Col>
                        <Col span={4}>
                            <div style={{'margin': '0 0 0 12% '}}> <DatePicker className="datePicker" onChange={this.handleChangeDate} /> </div>
                            <Divider />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}></Col>
                        <Col span={14}>
                            <LocationSearchInput state={this.props.state} updateLocation={this.updateLocation} />
                            <Divider />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}></Col>
                        <Col span={4}>
                            <SearchBar state={this.props.state} type="playlist" updateEventPlaylist={this.updateEventPlaylist}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6}></Col>
                        <Col span={13}>
                        {
                            this.state.playlist && this.state.playlist.id ? <iframe title="deezerplayer" scrolling="no" frameBorder="0" allowtransparency="true" src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id="
                            + this.state.playlist.id
                            + "&app_id=1"} width="700" height="350"></iframe> : null
                        }
                        <Divider />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={10}></Col>
                        <Col span={4}>
                            <div style={{'margin': '0 0 0 12% '}}> <Button  onClick={this.handleSubmit.bind(this)}> Créer l'évènement </Button> </div>
                        </Col>
                    </Row>

                </Content>
                <Footer>

                </Footer>
        </Layout>
        );
  }
}

export default CreateEvent;
