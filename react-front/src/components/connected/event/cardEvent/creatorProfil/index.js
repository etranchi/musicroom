import React, { Component } from 'react';
import './styles.css';
import { Divider, Card, Avatar, Modal, Icon, Col, Row, Input} from 'antd';
import {updateEvent} from '../../../sockets';

class CreatorProfil extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            iconPrivacy: this.props.state.data.event.public ? 'unlock' : 'lock'
        }
    
    }
    handleChangePrivacy = event => {
        if (!this.props.right.isCreator || !this.props.right.isAdmin)
            return ;
        this.props.state.data.event.public = !this.props.state.data.event.public
        this.setState({iconPrivacy: this.props.state.data.event.public ? 'unlock' : 'lock'})
        updateEvent(this.roomID, this.props.state.data.event)
    }

    showModal = () => {
        this.setState({visible: true});
    }
    handleOk = (e) => {
        updateEvent(this.roomID, this.props.state.data.event)
        this.setState({visible: false});
    }
    
    handleCancel = (e) => {
        this.setState({visible: false});
    }

	render() {
        console.log("CREATOR PROFIL : ", this.props.state.data.event)
        let userPicture = this.props.state.data.event.creator.facebookId ? this.props.state.data.event.creator.picture : process.env.REACT_APP_API_URL + "/userPicture/" + this.props.state.data.event.creator.picture
        return (
            <div>
            <Row >
                <Col span={4}></Col>
                <Col span={12}>
                    <Card.Meta
                        avatar={<Avatar size={116} src={userPicture}/>}
                        title= { this.props.state.data.event.creator && this.props.state.data.event.creator.login ? this.props.state.data.event.creator.login : "Inconnue" }
                        description={ this.props.state.data.event.creator.email }
                    />
                    <Icon  style={{fontSize : '30px'}}  onClick={this.handleChangePrivacy.bind(this)} type={ this.state.iconPrivacy } theme="outlined" />
                    <b style={{ padding:'0 3% 0 0'}}    onClick={this.handleChangePrivacy.bind(this)} > { this.props.state.data.event.public ? " Public" : " Privé" }</b>
                    <Icon style={{fontSize : '30px'}}   onClick={this.showModal} type="user" theme="outlined"/>
                    <b style={{ padding: '0 3% 0 0'}}   onClick={this.showModal}> { this.props.state.data.event.members.length || this.props.state.data.event.adminMembers.length ? this.props.state.data.event.members.length + this.props.state.data.event.adminMembers.length + " participants" : "0 participant" }</b>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Modal
                title="Liste des participants : "
                visible={this.state.modMember}
                onOk={this.handleOk.bind(this, "modTitle")}
                onCancel={this.handleCancel}
                >
                <b>  Admin Members ({this.props.state.data.event.adminMembers.length}) : </b>
                {
                    this.props.state.data.event.adminMembers.map((member, key) => {
                        let userPicture = member.facebookId ? member.picture : process.env.REACT_APP_API_URL + "/userPicture/" + member.picture
                        return (
                            <div style={{margin: '3% 0 0 0'}} key={key}>
                                <Card.Meta avatar={<Avatar src={userPicture} />} />
                                <div style={{margin: '3% 0 0 0'}}>
                                    <p> {member.login}</p>
                                </div>
                            </div>
                        )
                    })
                }
                <Divider />
                <b> Members ({this.props.state.data.event.members.length}) : </b>
                {
                    this.props.state.data.event.members.map((member, key) => {
                        let userPicture = member.facebookId ? member.picture : process.env.REACT_APP_API_URL + "/userPicture/" + member.picture
                        return (
                            <div className="previewMember" key={key}>
                                <Card.Meta avatar={<Avatar src={userPicture} />} />
                                <div className="previewMemberLogin">
                                    <p> {member.login}</p>
                                </div>
                            </div>
                        )
                    })
                }   
                </Modal>
                {/* Modal for title modification  */}
                <Modal title="Description : " visible={this.state.modTitle} onOk={this.handleOk.bind(this, "modTitle")} onCancel={this.handleCancel.bind(this, "modTitle")} >
                    <Input.TextArea  placeholder="Descriptif de l'évènement : " name= "description" value={this.props.state.data.event.description} onChange={this.handleChangeDescription}/> 
                </Modal>
            <Divider />
           </div>
        );
  }
}

export default CreatorProfil;
