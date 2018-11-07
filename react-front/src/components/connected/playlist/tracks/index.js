import React, { Component } from 'react';
import './styles.css';
import defaultTrackImg from '../../../../assets/track.png'
import moment from 'moment'

class Tracks extends Component {
	render() {
		if( this.props.tracks[0] === undefined ) {
			return (
				<div>
					<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'playlist', 'data': []})}>Back</a>
					<div>No tracks</div>
				</div>
			);
		}
		return (
			<div>
				<a href="#!" className="btn waves-effect waves-teal" onClick={this.props.updateParent.bind(this,{'currentComponent': 'playlist', 'data': []})}>Back</a>
				<ul className="collection">
					{this.props.tracks.map((val, i) => {
						return (
							<li className="collection-item avatar" key={i}>
								<img src={val.album ? val.album.cover_small || defaultTrackImg : defaultTrackImg} alt="" className="circle"/>
								<span className="title">Title: {val.title} - Duration: {moment.utc(val.duration * 1000).format('mm:ss')}</span>
								<p>Album: {val.album ? val.album.title : ""}</p>
							</li>
						);
					})}
				</ul>
			</div>
		);
  }
}

export default Tracks;