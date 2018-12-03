import React, { Component } from 'react';
import axios from 'axios'
import { AutoComplete, Card, Avatar} from 'antd';
import './styles.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			list: [],
			glbUserList: [],
			position: 0
		}
		this.fetchListController = this.fetchListController.bind(this);
	}

	fetchListController = (value) => {
		if (this.props.type === '')
			this.setState({'value': value, 'list': []})
		else if (this.props.type === 'member' || this.props.type === 'admin')
			this.fetchListUser(value);
		else if (this.props.type === 'tracks')
			this.fetchTracks(value);
		else
			this.fetchListPlaylist(value);
	}

	fetchTracks = (value) => {
		this.setState({value:value}, () => {
				axios.get(process.env.REACT_APP_API_URL + '/search/track?q='+ value)
				.then((resp) => {
					this.setState({'list': resp.data.data || []});
				})
				.catch((err) => {
					console.log('tracks error');
					console.log(err);
				})
		})
	}

	fetchListPlaylist = (value) => {
		if (value === '')
			this.setState({'value': value, 'list': []})
		else
		{
			this.setState({'value': value});
			axios.get(process.env.REACT_APP_API_URL + '/search/playlist?q='+ value)
			.then((resp) => {
				this.setState({'list': resp.data.data || []});
			})
			.catch((err) => {
				console.log('Playlist error');
				console.log(err);
			})
		}
	}
	fetchListUser = (value) => {
		this.setState({value:value}, () => {
			if (this.state.list.length > 0) 
				this.searchUser();
			else {
				axios.get(process.env.REACT_APP_API_URL + "/user/", {'headers':{'Authorization': 'Bearer '+ localStorage.getItem('token')}})
				.then((resp) => {
					this.setState({glbUserList: resp.data || []});
					this.searchUser();
				})
				.catch((err) => { console.log('User List error : ', err); })
			}
		})
	}

	removeMember = (global, sub) => {

		for (let i = 0; i < global.length; i++)
		{
			for (let j = 0; j < sub.length; j++)
			{

				if (global[i].login === sub[j].login)
					global.splice(i, 1);
			}
		}
		return (global)

	}
	searchUser = () => {

		let listUserValid = [];

		this.setState({'glbUserList': this.removeMember(this.state.glbUserList, [this.props.state.data.event.creator])})
		this.setState({'glbUserList': this.removeMember(this.state.glbUserList, this.props.state.data.event.members)})
		this.setState({'glbUserList': this.removeMember(this.state.glbUserList, this.props.state.data.event.adminMembers)})

		if (this.state.value.length < this.state.position)
			this.setState({position:0})
		for (var i = 0; i < this.state.glbUserList.length; i++)
		{
			for (var j = this.state.position; j < this.state.glbUserList[i].login.length; j++)
			{
				if (this.state.glbUserList[i].login[j] !== this.state.value[j])
					break;
				if (j + 1 === this.state.value.length)
				{
					listUserValid.push(this.state.glbUserList[i]);
					break;
				}
			}
		}
		this.setState({position: this.state.value.length, list: listUserValid, glbUserList: listUserValid})
	}

	updateEventMember = (item) => {
		
		this.props.updateEventMember(item, this.props.type);
	}

	addTrack = (item) => {
		axios.get(process.env.REACT_APP_API_URL + '/track/' + item.id)
		.then(resp => {
			this.setState({
				value: '',
				list: [],
				glbUserList: [],
				position: 0
			}, () => {
				this.props.addTrack(resp.data);
			})
		})
		.catch(err => {
			console.log("searchbar get track error");
			console.log(err);
		})
		
	}

	render() {
		const { list } = this.state;
		const children = list.map((item, key) => 
		{
			let userPicture = item.facebookId ? item.picture : process.env.REACT_APP_API_URL + "/eventPicture/" + item.picture
			return (
				this.props.type === 'member' || this.props.type === 'admin' ? 
					<AutoComplete.Option  onClick={(e) => this.updateEventMember(item)}  key={key}> <Card.Meta className= "cardMemberList" avatar={<Avatar src={userPicture} />} title= {item.login} /> </AutoComplete.Option>
					: 
					this.props.type === 'playlist' ?
						<AutoComplete.Option  onClick={(e) => this.props.updateEventPlaylist(item)} key={item.id}>{item.title}</AutoComplete.Option>
						: 
						this.props.type === 'tracks' ?
							<AutoComplete.Option onClick={(e) => this.addTrack(item)} key={item.id}> {item.artist.name} - {item.title}</AutoComplete.Option>
							:
							<AutoComplete.Option onClick={(e) => this.props.updateParent({'currentComponent': 'tracks', 'id': item._id || item.id})} key={item.id}>{item.title}</AutoComplete.Option>
			)
		});
		return (
			<AutoComplete
				allowClear={true}
				style={{ width: 200 }}
				value={this.state.value}
				onSelect={this.onSelect}
				onSearch={this.fetchListController}>
					{children}
					
			</AutoComplete>
		);
  	}

}

export default SearchBar;