import React, { Component } from 'react';
import './styles.css';
import PreviewCard from '../previewCardEvent'
import { Layout} from 'antd';

class ListEvent extends Component {
	constructor(props) {
        super(props);
        this.state = {
			loading:false,
			myEvents: [],
			friendEvents: [],
			allEvent: []

		}
		this.onLoad = false;
	}

	isUser = (tab) => 
    {
        for (let i = 0; i < tab.length; i++) {
            if (tab[i].email === this.props.state.user.email)
                return true;
        }
        return false;
	}

	sortEvent = (type) => {
		let ret = [];

		for (let i = 0; i < this.props.state.data.events.length; i++)
		{
			if (type === 'myEvents' && (this.props.state.data.events[i].creator.email === this.props.state.user.email))
				ret.push(this.props.state.data.events[i])
			if (type === 'friendEvents' && (this.isUser(this.props.state.data.events[i].members) || this.isUser(this.props.state.data.events[i].adminMembers)))
				ret.push(this.props.state.data.events[i])
			if (type === 'allEvents' && (!this.isUser(this.props.state.data.events[i].members) && !this.isUser(this.props.state.data.events[i].adminMembers)))
				ret.push(this.props.state.data.events[i])
		}
		return ret;
	}

	componentWillMount = () => {
		this.setState({myEvents:this.sortEvent("myEvents")}, () => {
			this.setState({friendEvents:this.sortEvent("friendEvents")}, () => {
				this.setState({allEvents:this.sortEvent("allEvents")})
				this.setState({loading:true})
			})
		})
	}
	
	render() {
		const {Content } = Layout;
		if (!this.state.loading) 
			return ( <p> OUPSI </p>)
		else {
			return (
				<Layout>
					<Content style={{width:'82%', margin: '0 8% 0 10%'}}>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.myEvents.length > 0 ? <h1 style={{fontSize:'36px'}}> Mes événements : </h1> : null }
						{
							this.state.myEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/> )
							})
						}
					</div>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.friendEvents.length > 0 ? <h1 style={{fontSize:'36px'}}>  Evénement ou je participe : </h1> : null }
						{
							this.state.friendEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/> )
							})
						}
					</div>
					<div style={{padding:'1% 0 1% 0'}}>
						{ this.state.allEvents.length > 0 ? <h1 style={{fontSize:'36px'}}> Tous les évenements : </h1> : null }
						{
							this.state.allEvents.map((event, key) => {
									return ( <PreviewCard key={key} event={event} state={this.props.state} updateParent={this.props.updateParent}/> )
								})
						}
					</div>
					</Content>
				</Layout>
			);
		}
	}
}

export default ListEvent;

