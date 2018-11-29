import React, { Component } from 'react';
import './styles.css';
import { Layout, Row, Col, List, Skeleton, Avatar} from 'antd';


const {Content}  = Layout

export default  class liveEvent extends Component {
	render() {
        const picture   = this.props.track.album.cover_medium ? this.props.track.album.cover_medium : this.props.track.album.cover_large ? this.props.track.album.cover_large : this.props.track.album.cover_small
        const title     = this.props.track.title_short
        const artist    = this.props.track.artist.name
        return (
            <Layout>
                <Content>
                    <Row>
                        <Col span={24}>
                            <List.Item actions={
                            [
                                <i onClick={this.props.callSocket.bind(this,"updateScore", this.props.track._id, 1)} style={{fontSize:'28px'}} className="far fa-thumbs-up"></i>,
                                <i onClick={this.props.callSocket.bind(this,"updateScore", this.props.track._id, -1)} style={{fontSize:'28px'}} className="far fa-thumbs-down"></i>
                            ]}>
                            <Skeleton avatar title={false} loading={false} active>
                                <List.Item.Meta
                                    avatar={<Avatar size={118} src={picture} />}
                                    title={<p className="Ffamily" style={{fontSize:'28px', margin:'10% 0 0 0'}}> {title} </p>}
                                    description={artist}
                                />
                                <div> { this.props.track.like? this.props.track.like: 0 }</div>
                            </Skeleton>
                            </List.Item>
                        </Col>

                    </Row>
                </Content>
            </Layout>
        );
	}
};

