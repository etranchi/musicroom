import React, { Component } from 'react';
import './styles.css';
import { Divider, Card, Avatar, Icon, Modal } from 'antd';

class CreatorProfil extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            iconPrivacy: "unlock"
        }
        if (this.props.state.data.public)
            this.setState({iconPrivacy: "lock"})
    
    }
    handleChangePrivacy = event => {
        console.log("User : ", this.props.state.user.login, this.props.state.data.creator.login)
        if (this.props.state.user.login != this.props.state.data.creator.login) return 
        this.props.state.data.public = !this.props.state.data.public
        if ( this.props.state.data.public) this.setState({iconPrivacy: "lock"})
        else this.setState({iconPrivacy: "unlock"})
        console.log(this.props.state.data.public)
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      }
    
      handleOk = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }
    
      handleCancel = (e) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      }

	render() {
        let userPicture = this.props.state.data.creator.facebookId ? this.props.state.data.creator.picture : "https://192.168.99.100:4242/eventPicture/" + this.props.state.data.creator.picture
        return (
            <div>
            <div className="profilContent">
                <Card.Meta
                        avatar={<Avatar src={userPicture}/>}
                        title= { this.props.state.data.creator && this.props.state.data.creator.login ? this.props.state.data.creator.login : "Inconnue" }
                        description="This is the description"
                        />
                        <div className="iconBlock">
                            <Icon  className="iconImage" type={ this.state.iconPrivacy } theme="outlined" />
                            <b  className="iconName" onClick={this.handleChangePrivacy.bind(this)} > { this.props.state.data.public ? " Public" : " Privé" }</b>
                            <Icon className="iconImage"  type="user" theme="outlined" onClick={this.showModal}/>
                            <b  className="iconName" onClick={this.showModal}> { this.props.state.data.members.length || this.props.state.data.adminMembers.length ? this.props.state.data.members.length + this.props.state.data.adminMembers.length + " participants" : "0 participant" }</b>
                        </div>
            </div>
            <Modal
                title="Liste des participants : "
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <b>  Admin Members ({this.props.state.data.adminMembers.length}) : </b>
                {
                    this.props.state.data.adminMembers.map((member, key) => {
                        let userPicture = member.facebookId ? member.picture : "https://192.168.99.100:4242/eventPicture/" + member.picture
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
                <b> Members ({this.props.state.data.members.length}) : </b>
                {
                    this.props.state.data.members.map((member, key) => {
                        let userPicture = member.facebookId ? member.picture : "https://192.168.99.100:4242/eventPicture/" + member.picture
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
