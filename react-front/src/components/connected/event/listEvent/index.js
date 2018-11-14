import React, { Component } from 'react';
import './styles.css';
import PreviewCard from '../previewCardEvent'
import { Layout} from 'antd';

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
			loading:false
		}
		this.onLoad = false;
	}
	
    
	render() {
		const { Footer, Content } = Layout;
		// {this.props.updateParent.bind(this,{'currentComponent': 'listEvent', 'data': this.state.events})}
		return (
			<Layout>
				<Content style={{width:'82%', margin: '0 8% 0 10%'}}>
				{
					this.props.state.data.events.map((event, key) => {
							return (
								<PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/>
							)
						})
				}
				</Content>
				<Footer>

				</Footer>
			</Layout>
		);
	}
}

export default ListEvent;

