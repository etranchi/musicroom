import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { Avatar} from 'antd';
import React, { Component } from 'react';

const {google} = window 

export default class MapContainer extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             showingInfoWindow: false,
//             activeMarker: {},
//             selectedPlace: {},
//         }

//         this.eventPicture = this.props.event.picture ? process.env.REACT_APP_API_URL + "/eventPicture/" + this.props.event.picture : process.env.REACT_APP_API_URL + "/eventPicture/default.jpeg"
//     }

//     onMarkerClick = (props, marker, e) => {
//         this.setState({
//         selectedPlace: props,
//         activeMarker: marker,
//         showingInfoWindow: true
//         });
//     } 

//   render() {
//       console.log(this.state)
//     return (
//       <Map
//         style={{width: '100%', height: '100%', position: 'relative'}}
//         initialCenter={this.props.center ? this.props.center : this.props.state.data.userCoord}
//         google={google}
//         zoom={14}>
//          <Marker
//             onClick={this.onMarkerClick}
//             title={'The marker`s title will appear as a tooltip.'}
//             name={'Current location'}
//             position={this.props.state.data.userCoord} />
//         <Marker
//             icon={{
//                 url: this.eventPicture,
//                 anchor: new google.maps.Point(32,32),
//                 scaledSize: new google.maps.Size(64,64)
//             }} 
//             onClick={this.onMarkerClick}
//             title={this.props.event.title}
//             name={'AMOS'}
//             position={this.props.event.location.coord} />
//         <InfoWindow onClose={this.onInfoWindowClose}>
//             <h1> BIMBIMBIM </h1>
//             <div>
//               <h1>{this.state.selectedPlace.name}</h1>
//             </div>
//         </InfoWindow>
//       </Map>
//     );
//   }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
        });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        })
        }
    };

    render() {
        const eventPicture = this.props.event.picture ? process.env.REACT_APP_API_URL + "/eventPicture/" + this.props.event.picture : process.env.REACT_APP_API_URL + "/eventPicture/default.jpeg";
        return (
        <Map 
            google={google}
            initialCenter={this.props.center ? this.props.center : this.props.state.data.userCoord}
            onClick={this.onMapClicked}>
            <Marker
                onClick={this.onMarkerClick}
                title={'The marker`s title will appear as a tooltip.'}
                name={'Current location'}
                position={this.props.state.data.userCoord} />
            <Marker
                icon={{
                    url: eventPicture,
                    anchor: new google.maps.Point(0,32),
                    scaledSize: new google.maps.Size(64,64),
                }} 
                onClick={this.onMarkerClick}
                title={this.props.event.title}
                name={'AMOS'}
                position={this.props.event.location.coord} />
            <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
                <div>
                <h1>{this.state.selectedPlace.name}</h1>
                </div>
            </InfoWindow>
        </Map>
        )
    }
}