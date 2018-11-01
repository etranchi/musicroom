import React, { Component } from 'react';
import './styles.css';
import axios from 'axios'

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playlist: null
		}
	}

	componentDidMount() {
		axios.get('https://192.168.99.100:4242/playlist')
		.then((resp) => {
			this.setState({playlist: resp.data})
		})
		.catch((err) => {
			console.log('Playlist error');
			console.log(err);
		})
	}

	render() {
		if( this.state.playlist === null ) {
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
		return (
			<div>
				<ul className="collection">
					{this.state.playlist.map((val, i) => {
						return (
							<li className="collection-item avatar" key={i} onClick={this.props.state.bind(this,{'current': {name: 'tracks', tracks: val.tracks.data}})}>
								<img src={val.picture_small} alt="" className="circle"/>
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

export default List;