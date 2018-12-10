import React, { Component } from 'react';
import { message, Button, Divider, Row, Col} from 'antd';
import CardHeader from './Header'
import CreatorProfil from './creatorProfil'
import BodyEvent from './Body'
import Map from '../map'
import geolib from 'geolib'
import {socket, createRoom, joinRoom, closeRoom, leaveRoom, updateEvent} from '../../../other/sockets';

export default class cardEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isHidden    : false,
            isCreator   : false,
            isAdmin     : false,
            isMember    : false,
            isViewer    : true,
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
        });
        socket.on('joinRoom', (msg) => {
            console.log('socket : joinRoom receive message ->', msg)
        });
        socket.on('closeRoom', (msg) => {
           leaveRoom(this.props.state.data.event._id)
           this.props.updateParent({currentComponent:'cardEvent'})
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
    /*

        startEvent :  Display si event pas Start
                CreateRoom - Update State - Change view

        joinEvent : Si event started
                joinRoom - Change view

        quitEvent: Si eventstarted
                leaveRoom
        
        finishEvent: Si event started
                closeEvent
    */
   openLiveEvent = () => {
        let tracks = this.props.state.data.event.playlist && this.props.state.data.event.playlist.tracks ? this.props.state.data.event.playlist.tracks.data : [];
        createRoom(this.props.state.data.event._id, tracks, this.props.state.data.event);
        if (!this.props.state.data.event.is_start && (!this.state.isAdmin && !this.state.isCreator)) {
            message.info('Levent na pas demare')
            return;
        }
        if (this.props.state.data.event.is_start && !this.props.state.data.event.is_finish  && !this.state.isAdmin && !this.state.isCreator)
        {
            this.props.state.data.right = this.state;
            this.props.updateParent({currentComponent:'liveEvent'})
        }
        if (!this.props.state.data.event.is_start && (this.state.isAdmin || this.state.isCreator)) {
            this.props.state.data.event.is_start = true;
            this.props.state.data.event.is_finish = false;
            updateEvent(this.props.state.data.event._id, this.props.state.data.event)
        }
        if (this.props.state.data.event.is_finish && (this.state.isAdmin || this.state.isCreator)) {
            createRoom(this.props.state.data.event._id, tracks, this.props.state.data.event);
            this.props.state.data.event.is_finish = false;
            this.props.state.data.event.is_start = true;
            updateEvent(this.props.state.data.event._id, this.props.state.data.event)
        }
        else  if (this.props.state.data.event.is_finish && (!this.state.isAdmin && !this.state.isCreator)) {
            message.info('Levent est finis')
            return;
        }
        this.props.state.data.right = this.state;
        this.props.updateParent({currentComponent:'liveEvent'})
    }
    finishEvent = () => {
        this.props.state.data.event.is_finish = true;
        updateEvent(this.props.state.data.event._id, this.props.state.data.event)
        closeRoom(this.props.state.data.event._id)
    }
	render() {
        console.log(this.props.state.data.event.is_start)
        return  (
            <div>
            <Row>
                <Col span={3} offset={1}>
                        <a href="#!" className="btn waves-effect waves-teal" onClick={() => this.props.changeView('listEvent')}>Back</a> 
                </Col>
                {
                    this.props.state.data.event.playlist && this.props.state.data.event.playlist.tracks && this.props.state.data.event.playlist.tracks.data.length > 0?
                    <Col span={3} offset={1}>
                        <a href="#!" className="btn waves-effect waves-teal" onClick={this.openLiveEvent}>Open live Event</a> 
                    </Col>
                    :
                    null
                }
                { 
                    this.state.isAdmin || this.state.isCreator ? 
                    <Col span={3} offset={1}>
                            <a href="#!" className="btn waves-effect waves-teal" onClick={this.finishEvent}>Finish Event</a> 
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
