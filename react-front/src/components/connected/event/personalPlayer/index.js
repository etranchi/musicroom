import React, { Component } from 'react';

import './styles.css';
import { Tabs, Layout, Row, Col} from 'antd';


const {Content } = Layout;
const { DZ } = window
class PersonalPlayer extends Component {

	constructor(props) {
        super(props);
		this.state = {
            isPlaying:false,
            repeat:false,
			attribut:{
                disabled:true
            },
            picture: this.props.playlist.picture_small
        }


    }

    /*  Il faudrait simuler un click dessus */
    sliderSeek = (evt, arg) =>  {
        let left = evt.offsetX;
        // console.log(evt.offsetX, $(this).width(), evt.offsetX/$(this).width());
        console.log('Slider Seek : event  :', evt.offsetX)
        this.DZ.player.seek(evt.offsetX * 2);
    }

    event_listener_append = () => {
		// let pre = document.getElementById('event_listener');
		// let line = [];
		// for (let i = 0; i < arguments.length; i++) {
		// 	line.push(arguments[i]);
		// }
        // pre.innerHTML += line.join(' ') + "\n";
        if (this.arguments)
         console.log("Dans event_listener_apend", this.arguments)
    }
    
    onPlayerLoaded = () => {
        console.log('Dans onPLayerLoaded')
        let attribut = {disabled:false}
        this.setState({'attribut':attribut})
		this.event_listener_append('player_loaded');
		this.DZ.Event.subscribe('current_track', (arg) => {
			this.event_listener_append('current_track', arg.index, arg.track.title, arg.track.album.title);
		});
		this.DZ.Event.subscribe('player_position', (arg) => {
			this.event_listener_append('position', arg[0], arg[1]);
			// $("#slider_seek").find('.bar').css('width', (100*arg[0]/arg[1]) + '%');
		});
	}
    



    isPlaying = () => {

        this.setState(
            { isPlaying: !DZ.player.isPlaying() },
            () => DZ.player.isPlaying() ? DZ.player.pause() : DZ.player.play()
        );
    }

    changeTrack = () => {
        this.setState({
            isPlaying: true
        }, () => {
            DZ.player.pause()
            this.state.repeat ? DZ.player.playTracks([302127]) : DZ.player.playTracks([302127])
        });
    }

    playTrack = (id) => {
        DZ.player.playTracks([id])
    }

    setVolume = (vol) => {

        DZ.player.setVolume(vol)
    }
	
	render() {
        console.log("Playlist : ", this.props.playlist)
        return (
            <Content>
                <Row>
                    <Col span={2}>
                        <img alt="playlist" src={this.state.picture} />
                    </Col>
                    <Col span={4}>
                        <b> Tracks name</b>
                        <p> Artistes </p>
                        <p>Icone image</p>
                    </Col>
                    <Col span={3}></Col>
                    <Col span={8}> Prev / Play / Next - Repeat</Col>
                    <Col span={3}></Col>
                    <Col span={4}> Options</Col>
                </Row>
                {/* <div className="controlers" {...this.state.attribut}>
                    <input type="button" onClick={this.playTrack.bind(this, 302127)} value="Play Daft Punk - Discovery"/>
                    <input type="button" onClick={this.playTrack.bind(this, 301775)} value="Play Daft Punk - Homework"/>
                    <br/>
                    <input type="button" onClick={this.isPlaying} value="play"/>
                    <input type="button" onClick={this.isPlaying} value="pause"/>
                    <input type="button" onClick={this.changeTrack}value="prev"/>
                    <input type="button" onClick={this.changeTrack} value="next"/>
                    <br/>
                    <input type="button" onClick={this.setVolume.bind(this, 30)} value="set Volume 20"/>
                    <input type="button" onClick={this.setVolume.bind(this, 30)} value="set Volume 80"/>
                    <br/><br/><br/>
                </div>
                <div id="slider_seek" className="progressbarplay" >
                    <div className="bar" style={{"width": "0%"}}></div>
                </div>
                <br/> event_listener : <br/>
                <pre id="event_listener" style={{"height":"100px","overflow":"auto"}}></pre> */}
            </Content>
        )
    }
}

export default PersonalPlayer;