import React, { Component } from 'react';
import axios from 'axios'
import { Input, Button, Col, Row, List, Icon, Card, Avatar, message } from 'antd'
import SearchBar from '../../../other/searchbar'

class EditPlaylist extends Component {
	constructor(props){
		super(props);
		this.state = {
			playlist: {title:'', members:[], tracks:{data:[]}},
			isloading: false
		}
	}
	componentDidMount() {
		this.getPlaylist((ret) => {this.setState({playlist:ret.data, isloading:false})});
	}

	getPlaylist = (callback) => {
		this.setState({isloading: true});
		axios.get(process.env.REACT_APP_API_URL + '/playlist/' + this.props.state.id, {'headers':{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((resp) => {
			if (callback)
				callback(resp)
			else
				this.setState({playlist:resp.data, isloading:false})
		})
		.catch((err) => {
			this.setState({playlist:{title:'', members:[], tracks:{data:[]}}, isloading:false})
			console.log(err);
		})
	}

	handleChange = (e) =>{
		var tmp = this.state.playlist;
		tmp.title = e.target.value;
		this.setState({playlist: tmp});
	}

	save = () =>{
		axios.put(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist._id || this.state.playlist.id, 
		this.state.playlist,
		{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then(() => {
			this.props.updateParent({'currentComponent':'tracks'})
		})
		.catch(err => {
			console.log(err);
		})
	}

	delete = () => {
		axios.delete(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist._id || this.state.playlist.id,
			{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
		)
		.then(() => {
			this.props.updateParent({'currentComponent':'playlist', id:null})
		})
		.catch(err => {
			console.log(err);
		})
	}

	addTrack = (item) => {
    	this.setState({ tracks: [...this.state.tracks, item] })
	}
	
	updatePlaylistMember = (item) => {
		let isMember = this.state.playlist.members.filter( elem => elem['_id'] === item._id )
		if (isMember.length > 0) {
			message.error("member already in playlist")
			return;
		}
		let state = this.state
		state.playlist.members.push(item);
		axios.put(process.env.REACT_APP_API_URL + '/playlist/' + this.state.playlist._id || this.state.playlist.id, 
		state.playlist,
		{'headers': {'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then(() => {
			this.getPlaylist()
		})
		.catch(err => {
			console.log(err);
		})
		
	}

	render() {
		console.log(this.state.playlist)
		if( this.state.isloading === true ) {
			return (
				<div>
					<a 
						href="#!" 
						className="btn waves-effect waves-teal" 
						onClick={this.props.updateParent.bind(this,{'currentComponent': 'tracks'})}>Back
					</a>
					<div>
						No tracks
					</div>
				</div>
			);
		}
		return (
			<div>
				<Row type="flex" justify="space-between">
					<Col>
						<a 
							href="#!" 
							className="btn waves-effect waves-teal" 
							onClick={this.props.updateParent.bind(this,{'currentComponent': 'tracks'})}>Back
						</a>
					</Col>
					<Col>
						<a 
							href="#!" 
							className="btn waves-effect" 
							style={{'backgroundColor': 'red'}} 
							onClick={this.delete}>Delete
						</a>
					</Col>
				</Row>
				<Row style={{height:'80px'}}>
                    <Col span={3} offset={5} >
                        <b style={{display:'inline-block'}} > ({this.state.playlist.members.length}) </b>
                    </Col>
                    <Col span={3}>
                        <SearchBar state={this.props.state}  updateEventMember={this.updatePlaylistMember} type="member"/> 
                    </Col>
                </Row>
				{ this.state.playlist.members.length > 0 ?
                    <Row style={{height:'130px'}}>
                        <Col span={16} offset={5}>
                            <List
                                grid={{ gutter: 16, column: 3 }}
                                dataSource={this.state.playlist.members}
                                renderItem={item => (
                                    <List.Item>
                                        <Card.Meta
                                            avatar={ <Avatar 
                                                        size={116} 
                                                        src={item.picture} 
                                                        />
                                                    }
                                            title={item.login}
                                        />
                                        <div 
                                            className="zoomCard" 
                                            style={{width:'5%', margin:'-10% 0 0 40%'}}
                                            onClick={this.removeMember}
                                        >
                                            <Icon style={{color:'#B71C1C'}}  type="close" theme="outlined"/>
                                        </div>
                                    </List.Item>     
                                )}
                            />
                        </Col>
                    </Row>
                    : 
                    null
                }
				<Input 
					value={this.state.playlist.title} 
					onChange={(e) => this.handleChange(e)}>
				</Input>
				<Button 
					onClick={this.save}>Save
				</Button>
			</div>
		);
  }
}

export default EditPlaylist;