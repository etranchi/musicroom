import React, { Component } from 'react';
import './styles.css';
import defaultImage from '../../../../assets/playlist.png'
import axios from 'axios'
import {Button, Row, Col} from 'antd'
import SearchBar from '../../searchbar'

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlist: [],
			isloading:false
		}
	}

	componentDidMount() {
		this.setState({isloading: true});
		axios.get(process.env.REACT_APP_API_URL + '/playlist', {'headers':{'Authorization': 'Bearer ' + localStorage.getItem('token')}})
		.then((resp) => {
			this.setState({playlist: resp.data, isloading:false})
		})
		.catch((err) => {
			this.setState({playlist: [], isloading:false})
			console.log('Playlist error');
			console.log(err);
		})
	}

	render() {
		if( this.state.isloading === true ) {
			return (
				<div className="preloader-wrapper active loader">
					<div className="spinner-layer spinner-red-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div><div className="gap-patch">
						<div className="circle"></div>
					</div><div className="circle-clipper right">
						<div className="circle"></div>
					</div>
					</div>
				</div>
			);
		}
		else{
		return (
			<div>
			<Row type="flex" justify="space-between">
				<Col>
					<SearchBar updateParent={this.props.updateParent}/>
				</Col>
				<Col>
					<Button onClick={this.props.updateParent.bind(this, {'currentComponent': 'createPlaylist'})}>+</Button>
				</Col>
			</Row>
				<ul className="collection">
					{this.state.playlist.map((val, i) => {
						return (
							<li className="collection-item avatar" key={i} onClick={this.props.updateParent.bind(this,{'currentComponent': 'tracks', 'id': val._id || val.id})}>
								<img src={val.picture_small || defaultImage} alt="" className="circle"/>
								<span className="title">{val.title}</span>
								<p>{val.description}</p>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
  }
}

export default List;