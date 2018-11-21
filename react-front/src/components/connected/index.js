import React, { Component } from 'react';
import './styles.css';
import Event from './event'
import Playlist from './playlist'
import Setting from './setting'
import Player from './player'
import { Layout} from 'antd';

const {Content} = Layout;


class Connected extends Component {
		constructor(props){
			super(props);
			this.state = {
				collapsed: true,
				height: props.height
			};
		}

		componentWillMount(){
				this.setState({height: window.innerHeight + 'px'});
		}
		toggle(){
				this.setState({
					collapsed: !this.state.collapsed,
				});
		}



	render() {
		console.log(this.props.state)
	return (
		
        <Layout> 
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: this.state.height }}>
            	{this.props.state.currentComponent === 'createEvent' || this.props.state.currentComponent === 'event'? <Event state={this.props.state} updateParent={this.props.updateParent}/> : null}
				{this.props.state.currentComponent === 'playlist' || this.props.state.currentComponent === 'createPlaylist' || this.props.state.currentComponent === 'tracks' || this.props.state.currentComponent === 'editPlaylist' ? <Playlist state={this.props.state} updateParent={this.props.updateParent}/> : null}
				{this.props.state.currentComponent === 'setting' || this.props.state.currentComponent === 'editSetting'? <Setting state={this.props.state} updateParent={this.props.updateParent}/> : null}
				{this.props.state.playlistId ? <Player state={this.props.state} /> : null }
			</Content>
        </Layout>
		
	);
  }
}

export default Connected;