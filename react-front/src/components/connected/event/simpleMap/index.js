import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css'
 
const EventLocation = ({ text }) => <i style={{color:'#03a9f4'}}className="fas fa-map-marker-alt fa-3x"></i>;
const UserLocation = ({ text }) => <i style={{color:'#8bc34a'}}className="fas fa-map-marker-alt fa-3x"></i>;

class SimpleMap extends Component {
    constructor(props) {
      super(props);
    
      this.state = {}
    

    this.mapStyle = {
      height: '30vh',
      width: '100%',
      margin: '0 0 10% 0'
    }
  }
 
  render() {
    return (
      <div className="mapContent" style={this.mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCxXsr0i2h44hpi3E7RTUDvb4_CFm52Oqw'}}
          defaultCenter={this.props.center ? this.props.center : this.props.state.data.userCoord}
          defaultZoom= {11}
        >
        {this.props.center ? <EventLocation lat={this.props.center.lat} lng={this.props.center.lng} /> : null}
        {this.props.state.data.event ? <EventLocation lat={this.props.state.data.event.location.coord.lat} lng={this.props.state.data.event.location.coord.lng} /> : null}
          <UserLocation  lat={this.props.state.data.userCoord.userLatitude} lng={this.props.state.data.userCoord.userLongitude} /> 
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;