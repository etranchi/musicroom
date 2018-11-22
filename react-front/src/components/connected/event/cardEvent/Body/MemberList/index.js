import React, { Component } from 'react';
import './styles.css';
import SearchBar from '../../../../searchbar';
import { List, Card, Avatar, Icon, Col, Row, Layout } from 'antd';

const { Content } = Layout

class MemberList extends Component {
        constructor(props) {
            super(props);
       
            this.state = {
                memberList: []

        }

        this.setState({"memberList":this.props.members})
    }
    

    updateEventMember = (value, type) => {
        this.state.memberList.push(value)
        this.setState({"memberList": this.state.memberList})
        this.props.updateEventMember(value, type)
    }

    removeMember = (type, item) => {
       let  tab = this.state.memberList
        for (let i = 0; i < tab.length; i++)
        {
            if (tab[i]._id === item._id) {
                tab.splice(i, 1)
                break;
            }
        }
        this.setState({"memberList": tab})
        this.props.removeMember(type, item)

    }
	render() {
        return (
                <Content>
                    <Row style={{height:'80px'}}>
                        <Col span={5}></Col>
                        <Col span={3} >
                            <b style={{display:'inline-block'}} > ({this.state.memberList.length}) </b>
                            <p style={{display:'inline-block'}} > {this.props.name} </p>
                        </Col>
                        <Col span={3}>
                            <SearchBar state={this.props.state} type={this.props.type} updateEventMember={this.updateEventMember}/>
                        </Col>
                    </Row>
                    { this.state.memberList.length > 0 ?
                        <Row style={{height:'130px'}}>
                            <Col span={5}></Col>
                            <Col span={16}>
                                <List
                                    grid={{ gutter: 16, column: 3 }}
                                    dataSource={this.state.memberList}
                                    renderItem={item => (
                                        <List.Item>
                                            <Card.Meta
                                                avatar={<Avatar size={116} src={item.facebookId ? item.picture : process.env.REACT_APP_API_URL + "/userPicture/" + item.picture} />}
                                                title={item.login}
                                                description={item.email}
                                            />
                                            <div  className="zoomCard" style={{width:'5%', margin:'-10% 0 0 40%'}} onClick={this.removeMember.bind(this, this.props.type, item)}><Icon style={{color:'#B71C1C'}}  type="close" theme="outlined"/></div>
                                        </List.Item>     
                                    )}
                                />
                            </Col>
                        </Row>
                        : 
                        null
                    }
                </Content>
        );
  }
}

export default MemberList;
