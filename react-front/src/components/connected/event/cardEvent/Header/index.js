import React, { Component } from 'react';
import { Card } from 'antd';
import './styles.css';

class CardHeader extends Component {
	constructor(props) {
        super(props);
  
        this.state = {};

        this.gridStylePicture = {
                width: '50%',
                boxShadow: '1px 0 0 0',
                padding: "0 0 0 0",
                textAlign: 'center',
                padding: "0 0 0 0"
        };

        this.gridStyleBlack = {
            width: '25%',
            boxShadow: '1px 0 0 0',
            padding: "0 0 0 0",
            minHeight: "400px",
            textAlign: 'center',
            backgroundColor:'black'
        };
    
    }
	render() {
        return (
            <div className="HeaderMarge" className="headerContent">
                <Card>
                    <Card.Grid style={this.gridStyleBlack}></Card.Grid>
                    <Card.Grid style={this.gridStylePicture}>
                        <img className="Image" alt="eventPicture" src={"https://192.168.99.100:4242/eventPicture/" + this.props.state.data.event.picture} />
                        <div className="CenterTitle"> <h1 className="Title">  {this.props.state.data.event.title[0].toUpperCase() + this.props.state.data.event.title.slice(1)} </h1> </div>
                    </Card.Grid>
                    <Card.Grid style={this.gridStyleBlack}></Card.Grid>
                    
                </Card>
            </div>
        );
  }
}

export default CardHeader;
