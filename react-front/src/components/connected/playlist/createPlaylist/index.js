import React, { Component } from 'react';
import './styles.css';
import { Input, Row, Col, Divider, Button } from 'antd'
import axios from 'axios'

class CreatePlaylist extends Component {
	constructor(props){
		super(props);
		this.state = {
			'title': ''
		}
	}
	save(){
		axios.post('https://192.168.99.100:4242/playlist', 
			this.state,
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
            <Button onClick={this.save.bind(this)}>
            	Save
            </Button>
		</div>
	);
  }
}

export default CreatePlaylist;