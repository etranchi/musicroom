import React, { Component } from 'react';
import './styles.css';
import { Divider, Card, Avatar, Modal, Icon, Col, Row } from 'antd';

class CreatorProfil extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            iconPrivacy: this.props.state.data.event.public ? "lock" : "unlock"
        }
    
    }
    handleChangePrivacy = event => {
        if (!this.props.right.isCreator)
            return ;
        if (this.props.state.user.login !== this.props.state.data.event.creator.login) return 
        this.props.state.data.event.public = !this.props.state.data.event.public
        if ( this.props.state.data.event.public) this.setState({iconPrivacy: "lock"})
        else this.setState({iconPrivacy: "unlock"})
        console.log(this.props.state.data.event.public)
    }

    showModal = () => {
        this.setState({visible: true});
    }
    handleOk = (e) => {
        this.setState({visible: false});
    }
    
    handleCancel = (e) => {
        this.setState({visible: false});
    }

	render() {
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
                    <Icon  style={{fontSize : '30px'}} onClick={this.handleChangePrivacy.bind(this)} type={ this.state.iconPrivacy } theme="outlined" />
                    <b style={{ padding:'0 3% 0 0'}} onClick={this.handleChangePrivacy.bind(this)} > { this.props.state.data.event.public ? " Public" : " Privé" }</b>
                    <Icon style={{fontSize : '30px'}}  type="user" theme="outlined" onClick={this.showModal}/>
                    <b style={{ padding: '0 3% 0 0'}} onClick={this.showModal}> { this.props.state.data.event.members.length || this.props.state.data.event.adminMembers.length ? this.props.state.data.event.members.length + this.props.state.data.event.adminMembers.length + " participants" : "0 participant" }</b>
                </Col>
                <Col span={6}></Col>
            </Row>
            <Modal
                title="Liste des participants : "
                visible={this.state.visible}
                onOk={this.handleOk}
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
            <Divider />
           </div>
        );
  }
}

export default CreatorProfil;
