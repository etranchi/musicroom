import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css'
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
 
  render() {

    return (
      // Important! Always set the container height explicitly
      <div className="mapContent">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCxXsr0i2h44hpi3E7RTUDvb4_CFm52Oqw'}}
          defaultCenter={this.props.state.coord}
          defaultZoom= {11}
        >
          <AnyReactComponent
            lat={this.props.state.coord.lat}
            lng={this.props.state.coord.lng}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;