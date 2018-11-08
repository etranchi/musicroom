import React, { Component } from 'react';
import './styles.css';
import { Card, Avatar, Icon, Input } from 'antd';

class CreatorProfil extends Component {
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
                    <div className="inlineMember">
                        <b>  { this.props.state.data.adminMembers.length } </b>
                    </div>
                    <div className="inlineMember">
                        <p>Membres: </p> 
                    </div>
    
                    <Input.Search
                        placeholder="Ajouter un membre"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
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
                    </div> 
                    <div className="adminMember">
                        <div className="inlineMember">
                            <b>  { this.props.state.data.adminMembers.length } </b>
                        </div>
                        <div className="inlineMember">
                            <p> Admins: </p> 
                        </div>
                        <Input.Search
                            placeholder="Ajouter un admin"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                            />
        
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
                    </div> 
                </div>
            </div>
        );
  }
}

export default CreatorProfil;
