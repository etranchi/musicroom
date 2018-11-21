import React, { Component } from 'react';
import './styles.css';
import { Tabs, Layout, Row, Col, Icon} from 'antd';


const {Content } = Layout;

export default class TrackInformation extends Component {

	constructor(props) {
        super(props);
		this.state = {
            currentTracksID:0,
        }

    }

    updateState = (value) =>  {
        this.setState({value})
        console.log("Personal player old state : ", this.state)
        this.setState(value, () =>{
            console.log("Personal player new state : ", this.state)
        })
    }



	render() {
        const {title_short, artist, album} = this.props.track
        return (
            <Content >
            <Row style={{maxHeight:'100px', 'width':'300px'}}>
                <Col span={6}>
                    <img  style={{padding:'25%', maxHeight:'100px'}} alt="playlist" src={album.cover_small} />
                </Col>
                <Col span={10}>
                    <div style={{float:'left', padding:'20% 0 0 5%', 'minwidth':'60%', maxHeight:'100px'}}>
                        <p style={{margin:0, padding:0}}><b> {title_short}</b></p>
                        <p style={{ display:'inline'}}> {artist.name} </p>
                    </div>
                </Col>
                <Col span={2}>
                    <div style={{padding:'146% 0 0 5%'}}>
                        <Icon className="playerLike" type="heart" />
                    </div>
                    
                </Col>
            </Row>
            </Content>
        )
    }
}
