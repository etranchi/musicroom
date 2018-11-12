import React, { Component } from 'react';
import './styles.css';
import SearchBar from '../../../searchbar';
import  Geolocation  from 'react-geolocation';
import { Card, Avatar, Icon, Input, Divider} from 'antd';



class CreatorProfil extends Component {
        constructor(props) {
            super(props);

        this.state = {
            playlistId : this.props.state.data.playlist && this.props.state.data.playlist.id ? this.props.state.data.playlist.id : null
        }

    }
    
    updateUserLocation = (latitude, longitude) => {
        this.props.updateUserLocation(latitude, longitude)
    }
    updateEventMember = (value, type) => {
        if (value && type == 'member')
        {
            this.props.state.data.members.push(value)
            this.props.updateParent({'data': this.props.state.data})
        }
        else if  (value && type == 'admin')
        {
            this.props.state.data.adminMembers.push(value)
            this.props.updateParent({'data': this.props.state.data})
        }
    }
    updateEventPlaylist = (value, type) => {
        if (value)
        {
            this.props.state.data.playlist = value;
            this.setState({playlistId:value.id})
            this.props.updateParent({'data' : this.props.state.data})
        }
    }
    getLocation() {
        console.log("LALALALALA")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position ) => {
                console.log("POSITION : ", position)
            });
        } else {
            console.log("FAIL")
        }
    }
	render() {
        this.getLocation
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
                    <p> " {this.props.state.data.description} "</p>
                </div>
                <Divider />
                <div className="members">
                    <div className="basicMember">
                        <div className="inlineMember"> <b>{ this.props.state.data.members.length }</b> </div>
                        <div className="inlineMember"><p>Membres: </p></div>
                        <SearchBar state={this.props.state} type="member" updateEventMember={this.updateEventMember}/>
                        <div className="listMember">
                        {
                            this.props.state.data.members.map((member, key) => {
                                let userPicture = member.facebookId ? member.picture : "https://192.168.99.100:4242/eventPicture/" + member.picture
                                return (
                                    <div className="cardMember" key={key}>
                                        <Card.Meta className="cardMemberImage" avatar={<Avatar src={userPicture} />} />
                                        <b className="cardMemberLogin" > {member.login}</b>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div> 
                    <div className="adminMember">
                        <div className="inlineMember">
                            <b>  { this.props.state.data.adminMembers.length } </b>
                        </div>
                        <div className="inlineMember">
                            <p> Admins: </p> 
                        </div>
                        <SearchBar state={this.props.state} type="admin" updateEventMember={this.updateEventMember}/>
                        {
                            this.props.state.data.adminMembers.map((member, key) => {
                                let userPicture = member.facebookId ? member.picture : "https://192.168.99.100:4242/eventPicture/" + member.picture
                                return (
                                    <div className="previewMember" key={key}>
                                        <Card.Meta avatar={<Avatar src={userPicture} />} />
                                        <div className="previewMemberLogin">
                                            <p> {member.login}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }   
                    </div>
                    <Divider />
                    <h1> Playlist : </h1>
                    <div className="playlistContent">
                        <SearchBar state={this.props.state} type="playlist" updateEventPlaylist={this.updateEventPlaylist}/>   
                    </div>
                    <iframe scrolling="no" frameBorder="0" allowtransparency="true" src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id="
                        + this.state.playlistId
                        + "&app_id=1"} width="700" height="350"></iframe>
                   
                </div>
                
            </div>
        );
  }
}

export default CreatorProfil;
