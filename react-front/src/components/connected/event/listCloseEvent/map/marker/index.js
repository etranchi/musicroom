import React, { Component } from 'react';
import './styles.css'
import { Avatar } from 'antd';

class Marker extends Component {
    openCard = (e) => {
        this.props.state.data.event = this.props.event;
        this.props.updateParent({'currentComponent': 'cardEvent', 'data': this.props.state.data})
    }
    render() {
        let eventPicture = this.props.event.picture ? "https://192.168.99.100:4242/eventPicture/" + this.props.event.picture : "https://192.168.99.100:4242/eventPicture/default.jpeg"
        return (
            <Avatar className="zoomCardMap" onClick={this.openCard} size={48} src={eventPicture} />
        )
    }
}
 
export default Marker;