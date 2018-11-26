import React, { Component } from 'react';
import './styles.css'
import { Avatar } from 'antd';

class Marker extends Component {
    openCard = (e) => {
        this.props.state.data.event = this.props.event;
        this.props.updateParent({'currentComponent': 'cardEvent', 'data': this.props.state.data})
    }
    render() {
        let eventPicture = this.props.event.picture ? process.env.REACT_APP_API_URL + "/eventPicture/" + this.props.event.picture : process.env.REACT_APP_API_URL + "/eventPicture/default.jpeg"
        return (
            <Avatar className="zoomCardMap" onClick={this.openCard} size={48} src={eventPicture} />
        )
    }
}
 
export default Marker;