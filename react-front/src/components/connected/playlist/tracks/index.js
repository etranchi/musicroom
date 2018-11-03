import React, { Component } from 'react';
import './styles.css';
import moment from 'moment'

class Tracks extends Component {
	constructor(props) {
        super(props);
	}

	render() {
		if( this.props.tracks[0] === undefined ) {
			return <div>No tracks</div>
		}
		return (
			<div>
				<ul className="collection">
					{this.props.tracks.map((val, i) => {
						return (
							<li className="collection-item avatar" key={i}>
								<img src={val.album.cover_small} alt="" className="circle"/>
								<span className="title">Title: {val.title} - Duration: {moment.utc(val.duration * 1000).format('mm:ss')}</span>
								<p>Album: {val.album.title}</p>
							</li>
						);
					})}
				</ul>
			</div>
		);
  }
}

export default Tracks;