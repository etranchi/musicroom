import React, { Component } from 'react';
import axios from 'axios'
import { AutoComplete} from 'antd';
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

	fetchList(value){
		if (value === '')
			this.setState({'value': value, 'list': []})
		else
		{
			this.setState({'value': value});
			axios.get('https://192.168.99.100:4242/search/playlist?q='+ value)
			.then((resp) => {
				this.setState({list: resp.data.data})
			})
			.catch((err) => {
				console.log('Playlist error');
				console.log(err);
			})
		}
	}

	render() {
		const { list } = this.state;
		const children = list.map((item) => {
	      return <AutoComplete.Option onClick={(e) => this.props.updateTracks(item)} key={item.id}>{item.title}</AutoComplete.Option>;
	    });
	return (
		<AutoComplete
	        style={{ width: 200 }}
	        onSelect={this.onSelect}
	        onSearch={this.fetchList}>
		    	{children}
      	</AutoComplete>
	);
  }
}

export default SearchBar;