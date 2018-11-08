import React, { Component } from 'react';
import './styles.css';
import CardHeader from './cardHeader'
import CreatorProfil from './creatorProfil'
import InfoEvent from './infoEvent'
import BodyEvent from './bodyEvent'

class CompletCardEvent extends Component {
	render() {
        return (
            <div>
                <CardHeader state={this.props.state} updateParent={this.props.updateParent} />
                <CreatorProfil state={this.props.state} updateParent={this.props.updateParent} />
                <InfoEvent state={this.props.state} updateParent={this.props.updateParent} />
                <BodyEvent state={this.props.state} updateParent={this.props.updateParent} />
           </div>
        );
  }
}

export default CompletCardEvent;
