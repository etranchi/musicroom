import React, { Component } from 'react';
import './styles.css';
import CardHeader from './cardHeader'
import CreatorProfil from './creatorProfil'
import InfoEvent from './infoEvent'
import BodyEvent from './bodyEvent'
import SimpleMap from '../simpleMap'

class CompletCardEvent extends Component {
	constructor(props) {
        super(props);

        this.state = {
            isHidden: false
        }
    }

    updateMap(val){
        this.props.state.data.mapHeight = '25vh'
        this.props.state.data.mapMargin = '0 0 0 0'
        this.setState({'isHidden': !this.state.isHidden})
    }


	render() {
        return (
            <div>
                <CardHeader state={this.props.state} updateParent={this.props.updateParent} />
                {this.state.isHidden ? <SimpleMap state={this.props.state.data} /> : null}
                <CreatorProfil state={this.props.state} updateParent={this.props.updateParent} />
                <InfoEvent state={this.props.state} updateParent={this.props.updateParent} />
                <BodyEvent state={this.props.state} updateParent={this.props.updateParent} updateMap={this.updateMap.bind(this)} />
           </div>
        );
  }
}

export default CompletCardEvent;
