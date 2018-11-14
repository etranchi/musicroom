import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css'
import Marker from './marker'
 
const UserLocation = ({ text }) => <i style={{color:'#8bc34a'}}className="fas fa-map-marker-alt fa-3x"></i>;

const EventLocation = ({ event, state, updateParent}) => {

    return(
        <Marker updateParent={updateParent} event={event} state={state} position={event.location.coord}/>
    );
}

class Map extends Component {
    constructor(props) {
        super(props);
    
        this.defaultZoom = 12;
        this.mapStyle = {
            height: '60vh',
            width: '100%',
            margin: '0 0 10% 0'
        }
        this.cardStyle = {
            backgroundColor:"red",
            height:"100px"
        }
    }
 
  render() {
    let {events} = this.props.state.data;
    return (
      <div className="mapContent" style={this.mapStyle}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCxXsr0i2h44hpi3E7RTUDvb4_CFm52Oqw'}}
          defaultCenter={this.props.center}
          defaultZoom= {this.defaultZoom}
        >
        {
            events.map((event, key) => {
                return <EventLocation updateParent={this.props.updateParent} key={key} lat={event.location.coord.lat} lng={event.location.coord.lng} event={event} state={this.props.state} cardStyle={this.cardStyle} />
            })
        }
        <UserLocation  lat={this.props.state.data.userCoord.lat} lng={this.props.state.data.userCoord.lng} /> 
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;