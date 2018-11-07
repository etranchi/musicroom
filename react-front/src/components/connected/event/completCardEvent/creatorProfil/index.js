import React, { Component } from 'react';
import './styles.css';
import { Divider, Card, Avatar } from 'antd';

class CreatorProfil extends Component {
        constructor(props) {
            super(props);

    }


	render() {

        return (
           <div className="profilContent">
               <Card.Meta
                    avatar={<Avatar src={"https://192.168.99.100:4242/eventPicture/default.jpeg"}/>}
                    title= { this.props.state.data.creator && this.props.state.data.creator.login ? this.props.state.data.creator.login : "Inconnue" }
                    description="This is the description"
                    />
               <Divider />
           </div>
        );
  }
}

export default CreatorProfil;
