import React, { Component } from 'react';
import './styles.css'
import { Avatar, Row, Col} from 'antd';

class Marker extends Component {
    constructor(props) {
        super(props);
    

    }
    openCard = (e) => {
        console.log("OPEN CARD : ", this.props)
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