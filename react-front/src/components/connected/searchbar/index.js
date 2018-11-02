import React, { Component } from 'react';
import axios from 'axios'
import {Dropdown, NavItem, Button} from 'react-materialize'
import './styles.css';

class SearchBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			list: []
		}
		this.fetchList = this.fetchList.bind(this);
	}

	fetchList(e){
		if (e.target.value === '')
		{
			this.setState({'value': e.target.value, 'list': []})
		}else
		{
			this.setState({'value': e.target.value});
			axios.get('https://192.168.99.100:4242/search/track?q='+ e.target.value)
			.then((resp) => {
				this.setState({list: resp.data.data})
			})
			.catch((err) => {
				console.log('Playlist error');
				console.log(err);
			})
		}
	}

	updateParent(e, item)
	{
		console.log('event');
		console.log(item);
	}
	render() {
	return (
		<div>
		<input type="text" onChange={this.fetchList}></input>
		{
			this.state.list.length > 0 &&
			this.state.list.map((item) => {
				return <li className="list-group-item" onClick={((e) => this.updateParent(e, item))} key={item.id}>{item.title}</li>
			})
		}
		</div>
	);
  }
}

export default SearchBar;