import React, { Component } from 'react';
import './styles.css';
import { Divider, Card, Avatar, Icon, Input } from 'antd';

class CreatorProfil extends Component {
        constructor(props) {
            super(props);

    }


	render() {

        return (
            <div className="bodyContent">
                <div className="title" >
                    <h1 > {this.props.state.data.title || "Aucun"}</h1>
                </div>
                <div className="iconBlockBody">
                    <div>
                        <Icon  className="iconImage" type="pushpin" theme="outlined" />
                        <b className="iconName">Paris {/* {this.this.props.state.data.address.v} */} </b>
                    </div>
                    <div>
                        <Icon className="iconImage"  type="clock-circle" theme="outlined" />
                        <b className="iconName"> { this.props.state.data.date_creation ? this.props.state.data.date_creation : " à définir .." }</b>
                    </div>
                </div>
                <div className="descriptionBlockBody">
                    <p> {this.props.state.data.description}</p>
                </div>
                <div className="members">
                    <div className="basicMember">
                    <b>  Membres : </b>
                    {
                        this.props.state.data.members.map((member, key) => {
                            return (
                                <Card.Meta
                                        avatar={<Avatar src={"https://192.168.99.100:4242/eventPicture/" + member.picture} />}
                                        title= {member.login}
                                    />
                            )
                        })
                    }
                    <Input.Search
                        placeholder="Ajouter um mebre"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                        />
                    </div> 
                    <div className="adminMember">
                    <b>  Admin: </b>
                    {
                        this.props.state.data.adminMembers.map((member, key) => {
                            return (
                                <Card.Meta
                                        avatar={<Avatar src={"https://192.168.99.100:4242/eventPicture/" + member.picture} />}
                                        title= {member.login}
                                    />
                            )
                        })
                    }
                    <Input.Search
                        placeholder="Ajouter un admin"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                        />
                    </div> 
                </div>
            </div>
        );
  }
}

export default CreatorProfil;
