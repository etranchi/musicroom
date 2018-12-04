import React, { Component } from 'react';
import { Input, Row, Col, Divider, Button } from 'antd'
import axios from 'axios'
import SearchBar from '../../../other/searchbar'
import Track from '../../../templates/track'

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
		axios.post(process.env.REACT_APP_API_URL + '/playlist', 
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
		console.log(this.state);
	return (
		<div>
			<Row>
                <Col span={8}>
					<a 
						href="#!" 
						className="btn waves-effect waves-teal" 
						onClick={() => this.props.updateParent({'currentComponent': 'playlist'})}>Back
					</a>
				</Col>
			</Row>
			<Row>
                <Col span={8} offset={8}>
					<Input 
						placeholder="title" 
						value={this.state.title} 
						name="title" 
						onChange={this.handleChange}/>
                </Col>
			</Row>
            <Divider />
			<Row>
				<Col span={8} offset={8}>
					<SearchBar 
						updateParent={this.props.updateParent} 
						type="tracks" 
						addTrack={this.addTrack}/>
				</Col>
			</Row>
			<Row>
			{this.state.tracks.map((val, i) => {
				return (<Track order={i} track={val}/>);})
			}
			</Row>
			<Row>
                <Col span={8} offset={8}>
				<Button onClick={this.save.bind(this)}>
            		Save
           		</Button>
                </Col>
            </Row>
		</div>
	);
  }
}

export default CreatePlaylist;