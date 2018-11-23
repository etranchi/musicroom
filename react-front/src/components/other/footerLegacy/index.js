import React, { Component } from 'react';
import './styles.css';
import "antd/dist/antd.css";
import {Row, Col} from 'antd';


class FooterLegacy extends Component {
	constructor(props) {
		super(props);
		this.state = {
        }
    }
  render() {
    return (
            <Row >
            <Col span={2}></Col>
              <Col span={3}>
               <p> <a className="FooterLink" href="#!"> Légal </a> </p>
               <p>  <a className="FooterLink" href="#!"> Cookie </a> </p>
               <p> <a className="FooterLink" href="#!"> À propos </a> </p>
              </Col>
              <Col span={12}>
              </Col>
              <Col span={3}>
              <p> <a className="FooterLink" href="#!"> France</a> <img alt="icon" src="/ressources/france-flag-icon-16.png"/> </p>
              <p> <a className="FooterLink" href="#@">© 2018 Music Rooom AB</a> </p>
              </Col>
            </Row>
    );
  }
}

export default FooterLegacy;
