import React, { Component } from 'react';
import {Row, Input, Button} from 'react-materialize'
import './styles.css';
import axios from 'axios'
import ImageUploader from 'react-images-upload';

class CreateEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            "creator": null,
            "members": [],
            "adminMembers": [],
            "title": "",
            "description": "",
            "picture": [],
            "playlist": null,
            "dateCreation": "",
            "date": "",
            "public": true,
            "location": {
                "address" : {
                    "p": "",
                    "v": "",
                    "cp": "",
                    "r": "",
                    "n": 0
                },
                "coord": {
                    "lat": 0,
                    "long": 0
                }
            }
        };
        this.handlePicture = this.handlePicture.bind(this);
    }

	handleSubmit = event => {
        event.preventDefault();
        axios.get('https://192.168.99.100:4242/user/me', {'headers':{'Authorization': 'Bearer '+ localStorage.getItem('token')}})
        .then((resp) => {
            console.log('Event  get me success,, user : ', resp.data);
            this.setState({creator: resp.data});
            axios.post('https://192.168.99.100:4242/event/', this.state)
            .then((resp) => {console.log("Event created.", resp)})
            .catch((err) => {console.log("Error event creation : %s ", err);})  
        })
        .catch((err) => {
            console.log("Error : %s ", err);
        })  
    }
    
    handleChange = event => {
        if (event.target.name === "public") this.setState({"public":!this.state[event.target.name]})   
        else this.setState({[event.target.name]: event.target.value});
    }

    handlePicture(picture) {
        console.log('picutre ', picture)
        this.setState({
            picture: this.state.picture.concat(picture),
        });
    }

	render() {
        return (
            <Row className="formEvent">
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.handlePicture}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <Input label="Titre de l'évènement : "                      s={12}  name= "title"           value={this.state.title}        onChange={this.handleChange}/>
                <Input type='textarea' label="Descriptif de l'évènement : " s={12}  name= "description"     value={this.state.description}  onChange={this.handleChange}/> 
                <Input type='date' label="Quand ? "                                 name= "date"            value={this.state.date}         onChange={this.handleChange} />
                <Input type='select' label="Visibilité de l'événement : "   s={12}  name= "public"          value={this.state.public}       onChange={this.handleChange}>
                    <option value='true' >Public</option>
                    <option value='false'>Privé</option>
                </Input>
                <Button onClick={this.handleSubmit.bind(this)}> Créer l'évènement </Button>
            </Row>
        );
  }
}

export default CreateEvent;
