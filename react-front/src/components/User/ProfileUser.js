import React, { Component } from 'react';
import "./ProfileUser.css"


class ProfileUser extends Component {
    constructor(props) {
        super(props);

        console.log("Props : ", props)


      }
      render() {
        return (
            <div className="ProfilUser"> <p> Loggued </p></div>
        );
    }
}

export default ProfileUser;
