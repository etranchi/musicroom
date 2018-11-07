import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './styles.css'
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class SimpleMap extends Component {
    constructor(props) {
      super(props);
    
      console.log("Constructor : ", this.props.state)
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
          <AnyReactComponent
            lat={this.props.state.location.coord.lat}
            lng={this.props.state.location.coord.lng}
            text={'Kreyser Avrora'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;