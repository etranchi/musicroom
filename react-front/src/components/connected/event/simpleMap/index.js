import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css'
import { Avatar} from 'antd';
 
const EventLocation = ({ openCard, eventPicture }) => <Avatar className="zoomCardMap" onClick={openCard} size={48} src={eventPicture} />;
const UserLocation = ({ text }) => <i style={{color:'#00695c'}}className="fas fa-map-marker-alt fa-3x"></i>;
const NewEventLocation = ({ text }) => <i style={{color:'#8bc34a'}}className="fas fa-map-marker-alt fa-3x"></i>;

class SimpleMap extends Component {
    constructor(props) {
      super(props);
    
      this.state = {}
    

    this.mapStyle = {
      height: '40vh',
      width: '100%'
    }
  }
 
  render() {
    console.log(this.props.state)
    let eventPicture = this.props.event.picture ? process.env.REACT_APP_API_URL + "/eventPicture/" + this.props.event.picture : process.env.REACT_APP_API_URL + "/eventPicture/default.jpeg"
    return (
      <div className="mapContent" style={this.mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCxXsr0i2h44hpi3E7RTUDvb4_CFm52Oqw'}}
          defaultCenter={this.props.center ? this.props.center : this.props.state.data.userCoord}
          defaultZoom= {11}
        >
        {
          this.props.center ?  
          <NewEventLocation lat={this.props.center.lat} lng={this.props.center.lng} eventPicture={eventPicture} /> 
          :
          <EventLocation openCard={this.props.openCard} lat={this.props.event.location.coord.lat} lng={this.props.event.location.coord.lng} eventPicture={eventPicture} />
        }
        <UserLocation  lat={this.props.state.data.userCoord.lat} lng={this.props.state.data.userCoord.lng} /> 
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;