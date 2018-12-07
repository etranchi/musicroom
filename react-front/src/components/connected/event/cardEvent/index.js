import React, { Component } from 'react';
import { message, Button, Divider, Row, Col} from 'antd';
import CardHeader from './Header'
import CreatorProfil from './creatorProfil'
import BodyEvent from './Body'
import Map from '../map'
import geolib from 'geolib'
import {socket, createRoom, joinRoom, closeRoom, leaveRoom} from '../../../other/sockets';

export default class cardEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isHidden    : false,
            isCreator   : false,
            isAdmin     : false,
            isMember    : false,
            isViewer    : true
        };
    }
    isUser = tab => {
        tab.forEach(user => { 
            if (user.email === this.props.state.user.email)
                return true
        });
        return false;
    }
    checkRight = () => {
        if (this.props.state.data.event.creator.email === this.props.state.user.email)
            this.setState({isCreator:true});
        else {
            this.setState({
                isMember:this.isUser(this.props.state.data.event.members),
                isAdmin :this.isUser(this.props.state.data.event.adminMembers)
            });
        }
        if (this.state.isCreator || this.state.isMember || this.state.isAdmin)
            this.setState({isViewer:false});
    }
    componentDidMount = () => {
        socket.on('updateEvent', (newEvent) => {
            console.log('socket :  updateEvent receive data ', newEvent)
            this.props.state.data.event = newEvent
            this.props.updateParent({'data': this.props.state.data})
            this.checkRight()
        })
        socket.on('createRoom', (tracks, msg) => {
            console.log('socket : createRoom receive data ', msg)
            if (msg === 'err')
                joinRoom(this.props.state.data.event._id)
            else 
                console.log("socket : createRoom receive error.")
        });
        socket.on('joinRoom', (msg) => {
            console.log('socket : joinRoom receive message ->', msg)
        });
        socket.on('closeRoom', (msg) => {
            console.log('socket : closeRoom receive message ->', msg)
        });
        socket.on('leaveRoom', (msg) => {
            console.log('socket : leaveRoom receive message ->', msg)
        });
        let tracks = this.props.state.data.event.playlist && this.props.state.data.event.playlist.tracks ? this.props.state.data.event.playlist.tracks.data : [];
        createRoom(this.props.state.data.event._id, tracks, this.props.state.data.event);
        this.checkRight();
        window.scrollTo(1000, 1000)
    }
    componentWillUnmount = () => {
            leaveRoom(this.props.state.data.event._id)
    }
    updateMap = () => {
        let calc = geolib.getDistanceSimple(
            { latitude: this.props.state.data.userCoord.lat,             longitude: this.props.state.data.userCoord.lng },
            { latitude: this.props.state.data.event.location.coord.lat,  longitude: this.props.state.data.event.location.coord.lng }
        );
        message.info("Vous êtes a " + calc/1000 + " km de l'event");
        this.setState({'isHidden': !this.state.isHidden});
    }
    openLiveEvent = () => {
        this.props.state.data.right = this.state;
        this.props.updateParent({'data':this.props.state.data, currentComponent:'liveEvent'})
    }    
    isToday = date => {
        let timeEvent           = new Date(date).getTime();
        let curTime             = new Date(new Date()).getTime()
        let timeBeforeEvent     = timeEvent - curTime;
        let dayTimeStamp        = (3600 * 1000) * 24;
        let day                 = timeBeforeEvent / dayTimeStamp

        if (timeBeforeEvent <= dayTimeStamp/24 && day < 1 && day > -1)
            return true;
        else
            return false;
    }
    finishEvent = () => {
        message.info("ROOM FINISH")
        closeRoom(this.props.state.data.event._id)
    }  
	render() {
        return  (
            <div>
                <Row>
                    <Col span={2}> 
                        <a href="#!" className="btn waves-effect waves-teal" onClick={() => this.props.changeView('listEvent')}>Back</a> 
                    </Col >
                    <Col span={3} offset={10} > 
                        <a href="#!" className="btn waves-effect waves-red" onClick={() => closeRoom(this.props.state.data.event._id) }>Quit Event</a> 
                    </Col>

                    {
                        (this.state.isAdmin || this.state.isCreator) ? 
                        <Col span={3} offset={1}> 
                            <a href="#!" className="btn waves-effect waves-red" onClick={this.finishEvent}>Finish Event</a> 
                        </Col>
                        :
                        null
                    }
                    {
                        this.isToday(this.props.state.data.event.event_date) &&  this.props.state.data.event.playlist && this.props.state.data.event.playlist.tracks ?
                            <Col span={3} offset={1}> 
                                <a href="#!" className="btn waves-effect waves-teal" onClick={this.openLiveEvent}>
                                { (this.state.isAdmin || this.state.isCreator) ?  "Start Event"  : "Join Event" }
                                </a> 
                            </Col>
                            :
                            null
                    }
                </Row>
                <CardHeader state={this.props.state} updateParent={this.props.updateParent} />
                <Row>
                    <Col>
                        {
                            this.state.isHidden ? 
                                <div style={{height:'500px'}}>
                                    <Map state={this.props.state} events={[this.props.state.data.event]}/>
                                </div> 
                                : 
                                null
                        }
                    </Col>
                </Row>
                <Divider />
                <CreatorProfil right={this.state} state={this.props.state} updateParent={this.props.updateParent} />
                <BodyEvent right={this.state} state={this.props.state} updateParent={this.props.updateParent} updateMap={this.updateMap.bind(this)}/>
           </div>
        )
  }
}
