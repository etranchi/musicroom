import React, { Component } from 'react';
import './styles.css';
import SearchBar from '../../../searchbar';
import { List, Divider, Card, Avatar, Icon, Col, Row } from 'antd';



class Body extends Component {
        constructor(props) {
            super(props);

        this.state = {
            playlistId : this.props.state.data.event.playlist && this.props.state.data.event.playlist.id ? this.props.state.data.event.playlist.id : null
        }

    }
    
    updateEventMember = (value, type) => {
        console.log("UPDATE  : ", value)
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
    updateEventPlaylist = (value, type) => {
        if (value)
        {
            this.props.state.data.event.playlist = value;
            this.setState({playlistId:value.id})
            this.props.updateParent({'data' : this.props.state.data})
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
                        <i className="titleBig fas fa-map" style={{color:'#03a9f4'}}onClick={this.props.updateMap.bind(this)}></i>
                        <Divider />
                    </Col>
                </Row>
                <Row style={{height:'80px'}}>
                    <Col span={5}></Col>
                    <Col span={2} style={{ borderLeft: '1px solid #03a9f4'}}>
                        <Icon  className="titleMedium" type="pushpin" theme="outlined" />
                        <b className="titleMedium"> {this.props.state.data.event.location.address.v} </b>
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
                <Row style={{height:'70px'}}>
                    <Col span={5}></Col>
                    <Col span={3} >
                        <b style={{display:'inline-block'}} > ({this.props.state.data.event.members.length}) </b>
                        <p style={{display:'inline-block'}} > Ajouter un membres : </p>
                    </Col>
                    <Col span={3}>
                        <SearchBar state={this.props.state} type="member" updateEventMember={this.updateEventMember}/>
                    </Col>
                </Row>
                <Row style={{height:'120px'}}>
                    <Col span={5}></Col>
                    <Col span={12}>
                        <List
                            grid={{ gutter: 16, column: 3 }}
                            dataSource={this.props.state.data.event.members}
                            renderItem={item => (
                                <List.Item>
                                    <Card.Meta
                                        avatar={<Avatar size={116} src={item.facebookId ? item.picture : "https://192.168.99.100:4242/eventPicture/" + item.picture} />}
                                        title={item.login}
                                        description={item.email}
                                    />
                                    <div  className="zoomCard" style={{width:'5%', margin:'-10% 0 0 40%'}} onClick={this.removeMember.bind(this, "member", item)}><Icon style={{color:'#B71C1C'}}  type="close" theme="outlined"/></div>
                                </List.Item>     
                            )}
                        />
                    </Col>
                    <Col span={3}></Col>
                </Row>
                <Row style={{margin: '3% 0 0 0',height:'70px'}}>
                    <Col span={5}> </Col>
                    <Col span={3} >
                        <b style={{display:'inline-block'}} > ({this.props.state.data.event.adminMembers.length}) </b>
                        <p style={{display:'inline-block'}} > Ajouter un admin : </p>
                    </Col>
                    <Col span={3}>
                        <SearchBar state={this.props.state} type="admin" updateEventMember={this.updateEventMember}/>
                    </Col>
                </Row>
                <Row style={{height:'130px'}}>
                    <Col span={5}></Col>
                    <Col span={12}>
                        <List
                             grid={{ gutter: 16, column: 3 }}
                            dataSource={this.props.state.data.event.adminMembers}
                            renderItem={item => (
                                <List.Item>
                                    <Card.Meta
                                        avatar={<Avatar size={116} src={item.facebookId ? item.picture : "https://192.168.99.100:4242/eventPicture/" + item.picture} />}
                                        title={item.login}
                                        description={item.email}
                                    />
                                     <div className="zoomCard" style={{width:'5%', margin:'-10% 0 0 40%'}} onClick={this.removeMember.bind(this, "admin", item)}><Icon size={36} style={{color:'#B71C1C'}} type="close" theme="outlined"/></div>
                                </List.Item>     
                            )}
                        />   
                        <Divider />
                    </Col>
                    <Col span={3}></Col>
                </Row>
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
                <Row style={{height:'130px'}}>
                    <Col span={5}></Col>
                    <Col span={12}>
                        <iframe title="deezerplayer" scrolling="no" frameBorder="0" allowtransparency="true" src={"https://www.deezer.com/plugins/player?format=classic&autoplay=false&playlist=true&width=700&height=350&color=007FEB&layout=dark&size=medium&type=playlist&id="
                            + this.state.playlistId
                            + "&app_id=1"} width="700" height="350"></iframe></Col>
                    <Col span={3}></Col>
                </Row>
            </div>
        );
  }
}

export default Body;
