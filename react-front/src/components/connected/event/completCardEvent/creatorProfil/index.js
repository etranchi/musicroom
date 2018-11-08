import React, { Component } from 'react';
import './styles.css';
import { Divider, Card, Avatar, Icon } from 'antd';

class CreatorProfil extends Component {
	render() {

        return (
            <div>
            <div className="profilContent">
                <Card.Meta
                        avatar={<Avatar src={"https://192.168.99.100:4242/eventPicture/default.jpeg"}/>}
                        title= { this.props.state.data.creator && this.props.state.data.creator.login ? this.props.state.data.creator.login : "Inconnue" }
                        description="This is the description"
                        />
                        <div className="iconBlock">
                            <Icon  className="iconImage" type={ this.props.state.data.public ? "unlock" : "lock" } theme="outlined" />
                            <b  className="iconName"> { this.props.state.data.public ? " Public" : " Privé" }</b>
                            <Icon className="iconImage"  type="user" theme="outlined" />
                            <b  className="iconName"> { this.props.state.data.members.count ? this.props.state.data.members.count + " participants" : "0 participant" }</b>
                        </div>
            </div>
            <Divider />
           </div>
        );
  }
}

export default CreatorProfil;
