import React, { Component } from 'react';
import './styles.css';
import { Layout, Row, Col, List, Skeleton, Avatar} from 'antd';

const {Content}  =Layout
export default  class liveEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            loading: false,
            data: [],
            list: [],
		}
    }

    componentDidMount() {
          this.setState({
            initLoading: false,
            data: this.props.playlist,
            list: this.props.playlist,
          });
      }
    
	render() {
        const { initLoading, loading, list } = this.state;
        return (
            <Layout>
                <Content>
                    <Row>
                        <Col span={6}>
                        </Col>
                        <Col span={12}>
                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={(item) => {
                                const picture   = item.album.cover_medium
                                const title     = item.title_short
                                const artist    = item.artist.name
                                return (
                                    <List.Item actions={
                                        [
                                            <i style={{fontSize:'28px'}} className="far fa-thumbs-up"></i>,
                                            <i style={{fontSize:'28px'}} className="far fa-thumbs-down"></i>
                                        ]}>
                                        <Skeleton avatar title={false} loading={item.loading} active>
                                        <List.Item.Meta
                                            avatar={<Avatar size={118} src={picture} />}
                                            title={<h1 className="Ffamily" style={{fontSize:'28px', margin:'10% 0 0 0'}}> {title} </h1>}
                                            description={artist}
                                        />
                                        <div>Score : </div>
                                        </Skeleton>
                                    </List.Item>
                                )
                            }}
                        />
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
	}
};

