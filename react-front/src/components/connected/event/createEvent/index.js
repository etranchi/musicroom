import React, { Component } from 'react';
import {Row, Input, Button} from 'react-materialize'
import './styles.css';
import axios from 'axios'

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
        let data = new FormData();
        data.append('file', this.state.picture);
        data.append('name', this.state.picture.name);
        data.append('body', JSON.stringify(this.state));

        axios.get('https://192.168.99.100:4242/user/me', {'headers':{'Authorization': 'Bearer '+ localStorage.getItem('token')}})
        .then((resp) => {
            this.setState({creator: resp.data});
            console.log("Create Event : handleSubmit : /user/me Success")
            axios.post('https://192.168.99.100:4242/event/',  data)
            .then((resp) => { console.log("Create Event : handleSubmit :/event Success"); })
            .catch((err) => { console.log("Create Event : handleSubmit :/event Error ", err); })  
        })
        .catch((err) => { console.log("Create Event : handleSubmit : /user/me Error : ", err); })  
    }
    
    handleChange = event => {
        if (event.target.name === "public") this.setState({"public":!this.state[event.target.name]})   
        else this.setState({[event.target.name]: event.target.value});
    }

    handlePicture = (event) => {
        this.setState({picture: event.target.files[0]})
      }      
      

	render() {
        return (
            <Row className="formEvent">
                <Input label="Upload"                       type="file" onChange={this.handlePicture.bind(this)}/>
                <Input label="Titre de l'évènement : "      type="text"     s={12} name= "title"           value={this.state.title}        onChange={this.handleChange}/>
                <Input label="Descriptif de l'évènement : " type='textarea' s={12} name= "description"     value={this.state.description}  onChange={this.handleChange}/> 
                <Input label="Quand ? "                     type='date'            name= "date"            value={this.state.date}         onChange={this.handleChange} />
                <Input label="Visibilité de l'événement : " type='select'   s={12} name= "public"          value={this.state.public}       onChange={this.handleChange}>
                    <option value='true' >Public</option>
                    <option value='false'>Privé</option>
                </Input>
                <Button onClick={this.handleSubmit.bind(this)}> Créer l'évènement </Button>
            </Row>
        );
  }
}

export default CreateEvent;
