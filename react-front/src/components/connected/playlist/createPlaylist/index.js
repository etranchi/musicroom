import React, { Component } from 'react';
import './styles.css';
import { Input, Row, Col, Divider, Button, Icon } from 'antd'
import defaultTrackImg from '../../../../assets/track.png'
import moment from 'moment'
import axios from 'axios'
import SearchBar from '../../searchbar'

class CreatePlaylist extends Component {
	constructor(props){
		super(props);
		this.state = {
			'title': '',
			'tracks': []
		}
	}
	save(){
		var body = {title: '', tracks:{data:[]}};
		body.tracks.data = this.state.tracks;
		body.title = this.state.title;
		console.log(body);
		axios.post('https://192.168.99.100:4242/playlist', 
			body,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		)
		.then(resp => {
			this.props.updateParent({'currentComponent':'playlist'})
		})
		.catch(err => {
			console.log(err);
		})
		console.log('ici');
	}
	handleChange = event =>{
    	this.setState({[event.target.name]: event.target.value});
    }

    addTrack = (item) => {
    	this.setState({ tracks: [...this.state.tracks, item] })
    }
    deleteTrack =(index) => {
    	var array = [...this.state.tracks];
    	array.splice(index, 1);
    	this.setState({tracks:array});
    }

	render() {
	return (
		<div>
			<Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <Input placeholder="title" value={this.state.title} name="title" onChange={this.handleChange}/>
                </Col>
                <Col span={8}></Col>
            </Row>
            <Divider />
            <SearchBar state={this.props.state} type="tracks" addTrack={this.addTrack}/>
            {this.state.tracks.map((val, i) => {
						return (
						<Row type="flex" justify="space-between" key={val.id}>
								<Col>
								<img src={val.album ? val.album.cover_small || defaultTrackImg : defaultTrackImg} alt="" className="circle"/>
								</Col>
								<Col>
								<span className="title">Title: {val.title} - Duration: {moment.utc(val.duration * 1000).format('mm:ss')}</span>
								</Col>
								<Col>
								<p>Album: {val.album ? val.album.title : ""}</p>
								</Col>
								<Col onClick={(e) => this.deleteTrack(i)}>
								<Icon type="close"/>
								</Col>

						</Row>
						);
					})}
            <Button onClick={this.save.bind(this)}>
            	Save
            </Button>
		</div>
	);
  }
}

export default CreatePlaylist;