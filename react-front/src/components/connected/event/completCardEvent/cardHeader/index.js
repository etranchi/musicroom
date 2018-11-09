import React, { Component } from 'react';
import { Card } from 'antd';
import './styles.css';

class CardHeader extends Component {
	constructor(props) {
        super(props);


    this.header = {
        margin: '5% 0 0 0'
    }

    this.gridStylePicture = {
            width: '50%',
            boxShadow: '1px 0 0 0',
            textAlign: 'center',
            padding: "0 0 0 0"
    };

    this.gridStyleBlack = {
            width: '25%',
            minHeight: "400px",
            textAlign: 'center',
            backgroundColor:'black',
            padding: "0 0 0 0",
            boxShadow: '1px 0 0 0'
          };
    
    this.pictureStyle = {
        height:"400px",
        width: '100%'
    }
    
    this.centered = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
    }

    this.title = {
        fontSize: '70px',
        fontWeight: 'bold',
        color: 'white'
    }
    }


	render() {

        return (
            <div style={this.header} className="headerContent">
                <Card>
                    <Card.Grid style={this.gridStyleBlack}>Content1</Card.Grid>
                    <Card.Grid style={this.gridStylePicture}>
                        <img style={this.pictureStyle} alt="eventPicture" src={"https://192.168.99.100:4242/eventPicture/" +  this.props.state.data.picture} />
                        <div style={this.centered}> <h1 style={this.title}>  {this.props.state.data.title[0].toUpperCase() + this.props.state.data.title.slice(1)} </h1> </div>
                    </Card.Grid>
                    <Card.Grid style={this.gridStyleBlack}>Content3</Card.Grid>
                    
                </Card>
            </div>
        );
  }
}

export default CardHeader;
