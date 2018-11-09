import React, { Component } from 'react';
import './styles.css';
import { Card, Avatar, Icon, Input } from 'antd';



class CreatorProfil extends Component {
        constructor(props) {
            super(props);

    }
    
	render() {
        this.playlistId = this.props.state.data.playlist  && this.props.state.data.playlist.id ? this.props.state.data.playlist.id : null
        return (
            <div className="bodyContent">
                <div className="title" >
                    <h1 > {this.props.state.data.title || "Aucun"}</h1>
                </div>
                <div className="mapLink" >
                    <i className="fas fa-map" onClick={this.props.updateMap.bind(this)}></i>
                </div>
                <div className="iconBlockBody">
                    <div>
                        <Icon  className="iconImage" type="pushpin" theme="outlined" />
                        <b className="iconName"> {this.props.state.data.location.address.v} </b>
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
                        <b>  { this.props.state.data.members.length } </b>
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
                        let userPicture = member.facebookId ? member.picture : "https://192.168.99.100:4242/eventPicture/" + member.picture
                        return (
                            <Card.Meta
                                    avatar={<Avatar src={userPicture} />}
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
                                let userPicture = member.facebookId ? member.picture : "https://192.168.99.100:4242/eventPicture/" + member.picture
                                console.log("ICI" , member)
                                return (
                                    <div className="previewMember">
                                        <Card.Meta avatar={<Avatar src={userPicture} />} />
                                        <div className="previewMemberLogin">
                                            <p> {member.login}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }   
                    </div>
                    <div className="playlistContent">
                        <Input.Search
                            placeholder="Ajouter une playlist"
                            onSearch={value => console.log(value)}
                            style={{ width: 230 }}
                        />
                        {
                            // this.props.state.data.playlist.map((playlist, key) => {
                            //     return (
                            //        <p> {playlist}</p>
                            //     )
                            // })
                        }   
                    </div>
                    <iframe scrolling="no" frameborder="0" allowTransparency="true" src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id="+this.playlistId+"&app_id=1"} width="700" height="350"></iframe>
                   
                </div>
            </div>
        );
  }
}

export default CreatorProfil;
