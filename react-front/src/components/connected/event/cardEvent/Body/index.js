import React, { Component } from 'react';
import './styles.css';
import SearchBar from '../../../searchbar';
import MemberList  from './MemberList';
import {Divider, Icon, Col, Row } from 'antd';
import PersonalPlayer from '../../personalPlayer'
import axios from 'axios'


class Body extends Component {
        constructor(props) {
            super(props);

        this.state = {
            playlistId : this.props.state.data.event.playlist && this.props.state.data.event.playlist.id ? this.props.state.data.event.playlist.id : null
        }

    }
    
    updateEventMember = (value, type) => {
        if (value && type === 'member')
        {
            this.props.state.data.event.members.push(value)
            console.log(  this.props.state.data.event.members[0])
            this.props.updateParent({'data': this.props.state.data})
        }
        else if  (value && type === 'admin')
        {
            this.props.state.data.event.adminMembers.push(value)
            this.props.updateParent({'data': this.props.state.data})
        }
    }
    updateEventPlaylist = (playlist) => {
        if (playlist)
        {
            axios.get('https://192.168.99.100:4242/playlist/' + playlist.id, {'headers':{'Authorization': 'Bearer '+ localStorage.getItem('token')}})
            .then((resp) => { 
                playlist = resp.data
                this.props.state.data.event.playlist = playlist;
                this.props.updateParent({'data' : this.props.state.data, 'playlistId':playlist.id})
                this.setState({playlistId:playlist.id})

                
            })
            .catch((err) => { console.log("Wrong Playlist id.", err); })  
        }
    }
    removeMember = (type, item) => {

        let tab = [];
        if (type === 'admin') tab = this.props.state.data.event.adminMembers
        else  tab = this.props.state.data.event.members

        for (let i = 0; i < tab.length; i++)
        {
            if (tab[i]._id === item._id) {
                tab.splice(i, 1)
                break;
            }
        }
        if (type === 'admin') this.props.state.data.event.adminMembers = tab
        else  this.props.state.data.event.members = tab
        this.props.updateParent({'data': this.props.state.data})

    }

	render() {
        return (
            <div>
                <Row>
                    <Col span={4}></Col>
                    <Col span={14}>
                        <h1 className="titleBig" > {this.props.state.data.event.title || "Aucun"}</h1>
                        <i className="titleBig fas fa-map" style={{color:'#00695c'}}onClick={this.props.updateMap.bind(this)}></i>
                        <Divider />
                    </Col>
                </Row>
                <Row style={{height:'80px'}}>
                    <Col span={5} ></Col>
                    <Col span={2} style={{ borderLeft: '2px solid #03a9f4'}}>
                        <div style={{margin:'0 0 0 3%'}}>
                            <Icon  className="titleMedium" type="pushpin" theme="outlined" />
                            <b className="titleMedium"> {this.props.state.data.event.location.address.v} </b>
                        </div>
                    </Col>
                    <Col span={3}>
                        <Icon className="titleMedium"  type="clock-circle" theme="outlined" />
                        <b className="titleMedium"> { this.props.state.data.event.date_creation ? this.props.state.data.event.date_creation : " à définir .." }</b>
                    </Col>
                </Row>
                <Row>
                    <Col span={5}></Col>
                    <Col span={2}><b> Description : </b></Col>
                    <Col span={8}>
                        <p> { this.props.state.data.event.description } </p>
                        <Divider />
                    </Col>
                </Row>

                <MemberList state={this.props.state} name={" Ajouter un membre :"} members={this.props.state.data.event.members} type={"member"} removeMember={this.removeMember} updateEventMember={this.updateEventMember}/>
                <MemberList state={this.props.state} name={" Ajouter un admin :"} members={this.props.state.data.event.adminMembers} type={"admin"} removeMember={this.removeMember} updateEventMember={this.updateEventMember}/>
                
                <Divider />
                <Row style={{height:'70px'}}>
                    <Col span={5}> </Col>
                    <Col span={3} >
                        <p  > Ajouter une playlist : </p>
                    </Col>
                    <Col span={3}>
                        <SearchBar state={this.props.state} type="playlist" updateEventPlaylist={this.updateEventPlaylist}/>
                    </Col>
                </Row>
                {/* <Row style={{height:'130px'}}>
                    <Col span={5}></Col>
                    <Col span={12}>
                    {
                        this.state.playlistId ? <iframe title="deezerplayer" scrolling="no" frameBorder="0" allowtransparency="true" src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id="
                        + this.state.playlistId
                        + "&app_id=1"} width="700" height="350"></iframe> : null
                    }
                    </Col>
                </Row> */}
                { this.state.playlistId ?    <PersonalPlayer  playlist={this.props.state.data.event.playlist}/> : null} 
            </div>
        );
  }
}

export default Body;
