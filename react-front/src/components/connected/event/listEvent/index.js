import React, { Component } from 'react';
import {Collapsible, CollapsibleItem, Row} from 'react-materialize'
import './styles.css';
import axios from 'axios'

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
					events: []
				}
		};
		
		componentDidMount = () => {
			axios.get('https://192.168.99.100:4242/event')
			.then((resp) => {
				this.setState({events: resp.data})
			})
			.catch((err) => {
				console.log('Events error', err);
			})
		}

		// deleteEvent = () => {
		// 	axios.delete('https://192.168.99.100:4242/event');
		// 	console.log("Event Trashed.");
		// }

    
	render() {
		if( this.state.events[0] === undefined ) {
			return <div>Loading...</div>
		}
		return (
			<Collapsible>
			{ console.log("Event : ", this.state.events) }
			{
				this.state.events.map((event) => {
						return (
							<Row>
								<div className="col-lg-4 col-md-4 col-sm-4" >
									<div  className="content user">
										<div>
											<div className="col-lg-5">
												<div className="profil">
													<img src={"https://192.168.99.100:4242/eventPicture/default.jpeg"} alt=""/>	
												</div>		
												<div className="col-lg-7">
														<div className="info">
															<h3 className=" notranslate">Jisbar,</h3>
															<p  className=" notranslate">29 years old</p>
															<ul className="display-review">
																<li className="active">	<span className="fa fa-star"></span></li>
																<li className="active"><span className="fa fa-star"></span></li>
																<li className="active"><span className="fa fa-star"></span></li>
																<li className="active"><span className="fa fa-star"></span></li>
																<li className="active"><span className="fa fa-star"></span></li>
															</ul>														
														</div>
												</div>
											</div>
										</div>
											<div className="line"></div>
											<div className="content">
												<h2 localizerid="5bb4b966f8edb13c20835206">Vernissage "Jisbar &amp; friends" x J.M. Weston </h2>
												<div className="line_short"></div>
												<ul className="info">
													<li localizerid="5bb49ffc47d6e71dd8774d37" className=" notranslate"><span className="icon-map-marker"></span> Paris-...</li>
													<li localizerid="5bb49ffc47d6e71dd8774d38" className=" notranslate"><span className="icon-calendar-full"></span> Nov. 08</li>
													<li localizerid="5b9b7412a0624c04d8742752" className=" notranslate"><span className="icon-cash-euro"></span> Free</li>
												</ul>
											</div>
										</div>
										<div className="col-lg-8 col-md-8 col-sm-8">
											<div className="media">
												<img src={ "https://192.168.99.100:4242/eventPicture/" + event.picture} alt=""/>											
										</div>
									</div>
								</div>
							</Row>
							// <CollapsibleItem header={event.title} icon="library_music">
							// 	{console.log(event)}
							// 	<img src={ "https://192.168.99.100:4242/eventPicture/" + event.picture} ></img>
							// 	<p>Date de création:</p>
							// 	<p> Playlist name :</p>
							// 	<p> Nombre de membres :</p>
							// 	<p> Admins : </p>
							// 	<p> Descrition : {event.descritpion} </p>
							// 	{/* <i onClick={this.deleteEvent(event._id)} icon='filter_drama'>Delete</i>  */}
							// </CollapsibleItem>
						);
					})
			}
			</Collapsible>
		);
  }
}

export default ListEvent;

