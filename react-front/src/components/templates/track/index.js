import React, { Component } from 'react';
import './styles.css';
import { Layout, Row, Col, List, Skeleton, Avatar} from 'antd';


const {Content}  = Layout

export default  class liveEvent extends Component {
	render() {
        const picture   = this.props.track.album.cover_medium ? this.props.track.album.cover_medium : this.props.track.album.cover_large ? this.props.track.album.cover_large : this.props.track.album.cover_small
        const title     = this.props.track.title_short
        const artist    = this.props.track.artist.name
        let layoutStyle = {
            border: '0.3em solid #bdbdbd',
             backgroundColor: '#e0e0e0',
             marginBottom: '2%',
             height:'inherit'

        }        
        if (this.props.userID)
        {
            layoutStyle = {
             border: '0.3em solid' +  (this.props.track.like > 0 ? '#00c853' : this.props.track.like < 0 ? '#dd2c00 ' : '#bdbdbd'),
             backgroundColor: this.props.track.like > 0 ? '#c8e6c9' : this.props.track.like < 0 ? '#ffccbc' : '#e0e0e0',
             marginBottom: '2%',
             height:'inherit'
            }
        }
        const orderStyle = {
            margin: this.props.order + 1 < 10 ? '25% 0 0 30%' : this.props.order + 1 < 100 ? '25% 0 0 0%' : '25% 0 0 0'
        }
        const rest      = this.props.track.duration % 60;
        const min       = (this.props.track.duration - rest) / 60
        const duration  = min + ":" + rest + 'min';

        let isLike      = false;
        let isUnLike    = false;

        if ( this.props.userID && this.props.track.userLike && this.props.track.userLike.length > 0)
        {
            if (this.props.track.userLike.indexOf(this.props.userID) != -1)
                isLike = true
        }
        if ( this.props.userID && this.props.track.userUnLike && this.props.track.userUnLike.length > 0)
        {
            if (this.props.track.userUnLike.indexOf(this.props.userID) != -1)
                isUnLike = true
        }
        return (
            <Layout style={layoutStyle} className={ this.props.rotate && this.props.rotate.active   ? this.props.rotate.liked ? "slide-top" : "slide-bottom" : null }>
                <Content>
                    <Row>
                        <Col span={4}>
                            <div style={orderStyle}><b style={{fontSize:'4em'}}> {this.props.order + 1}.</b></div>
                        </Col>
                        <Col span={20}>
                            
                            <List.Item actions={
                                this.props.callSocket ?
                            [
                                <i onClick={this.props.callSocket.bind(this,"updateScore", this.props.track, 1)}  style={isLike ? {display:'none'}  : {display:'block'} } className="far fa-thumbs-up HoverLike"></i>,
                                <i onClick={this.props.callSocket && this.props.callSocket.bind(this,"updateScore", this.props.track, -1)} style={isUnLike ? {display:'none'}  : {display:'block', margin:'0 1% 0 0'} } className="far fa-thumbs-down HoverUnlike"></i>
                            ] : []}>
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                    avatar={<Avatar size={118} src={picture} />}
                                    title={<p className="Ffamily" style={{fontSize:'28px', margin:'10% 0 0 0'}}> {title} </p>}
                                    description={artist}
                                />
                                <div> <b>Duration : {duration}</b></div>
                                <div> <b> Score : { this.props.track.like? this.props.track.like: 0 } </b> </div>
                            </Skeleton>
                            </List.Item>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
	}
};

