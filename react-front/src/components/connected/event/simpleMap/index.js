import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css'
 
const EventLocation = ({ text }) => <i style={{color:'#03a9f4'}}className="fas fa-map-marker-alt fa-3x"></i>;
const UserLocation = ({ text }) => <i style={{color:'#8bc34a'}}className="fas fa-map-marker-alt fa-3x"></i>;

class SimpleMap extends Component {
    constructor(props) {
      super(props);
    
    this.state = {
      userLatitude: this.props.myState.latitude ? this.props.myState.latitude : null,
      userLongitude: this.props.myState.longitude ? this.props.myState.longitude : null ,
      displayUser: this.props.myState.displayUser ? true : false
    }
    this.mapStyle = {
      height: this.props.state.mapHeight ? this.props.state.mapHeight : '30vh',
      width: '100%',
      margin: this.props.state.mapMargin ? this.props.state.mapMargin : '0 0 10% 0'
    }
  }
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="mapContent" style={this.mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCxXsr0i2h44hpi3E7RTUDvb4_CFm52Oqw'}}
          defaultCenter={this.props.state.location.coord}
          defaultZoom= {11}
        >
          <EventLocation lat={this.props.state.location.coord.lat} lng={this.props.state.location.coord.lng} />
          {this.state.displayUser ? <UserLocation  lat={this.state.userLatitude} lng={this.state.userLongitude} /> : null}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;