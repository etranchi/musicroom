import React, { Component } from 'react';
import './styles.css';
import { message, Button } from 'antd';
import CardHeader from './cardHeader'
import CreatorProfil from './creatorProfil'
import InfoEvent from './infoEvent'
import BodyEvent from './bodyEvent'
import SimpleMap from '../simpleMap'
import axios from 'axios'

class CompletCardEvent extends Component {
	constructor(props) {
        super(props);

        this.state = {
            isHidden: false
        }

        this.saveButton = {
            'position': 'fixed',
            'bottom': '50px',
            'height': '80px',
            'left': '140px',
            'latitude': 0,
            'longitude': 0
        }
    }

    updateUserLocation(latitude, longitude){
        console.log("Catch USER LOCATION")
        this.setState({'latitude': latitude,  'longitude': longitude})
    }

    updateMap(val){
        this.props.state.data.mapHeight = '25vh'
        this.props.state.data.mapMargin = '0 0 0 0'
        this.setState({'isHidden': !this.state.isHidden})
    }

    saveEvent = () => {
        console.log("Data : ", this.props.state.data)
        let _id = this.props.state.data._id
        delete this.props.state.data._id
        axios.put('https://192.168.99.100:4242/event/' + _id,  this.props.state.data)
            .then((resp) => { 
                this.info()
            })
            .catch((err) => { console.log("Create Event : handleSubmit :/event Error ", err); })  
    }

    info = () => {
        message.info('Event saved !');
      };
	render() {
          
        return (
            <div>
                <CardHeader state={this.props.state} updateParent={this.props.updateParent} />
                {this.state.isHidden ? <SimpleMap state={this.props.state.data} /> : null}
                <CreatorProfil state={this.props.state} updateParent={this.props.updateParent} />
                <InfoEvent state={this.props.state} updateParent={this.props.updateParent} />
                <BodyEvent state={this.props.state} updateParent={this.props.updateParent} updateMap={this.updateMap.bind(this)} updateUserLocation={this.updateUserLocation.bind(this)} />
                <Button style={this.saveButton} type="primary" onClick={this.saveEvent}> <b> Sauvegarder l'event </b> </Button>
           </div>
        );
  }
}

export default CompletCardEvent;
