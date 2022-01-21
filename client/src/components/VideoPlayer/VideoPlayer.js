import React from 'react';
import axios from 'axios';
import { Navigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
//importing the package video.js
import videojs from 'video.js';
import './videojs.css';

export function withRouter(Children){
    return(props)=>{

       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }


class VideoPlayer extends React.Component {

     constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    //   all the options like autoplay, muted etc
      videoJsOptions: null
    }
  }

  componentDidMount() {
      
    
    //   getting video info
    axios.get('http://127.0.0.1:3333/api/videoList', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
      }
    }).then(res => {
      
      res.data.map(video => {
        //   if the video title of the data recieved is same as in the url
        // this videoTitle we have used in the route title also
        if (video.upload_title === this.props.match.params.videoTitle) {
          this.setState({
            loaded: true,
            videoJsOptions: {
              autoplay: false,
              controls: true,
              
              sources: [{
                src: video.video_path
              }],
            //   makes the video responsive
              fluid:true
            }
          }, () => {
            this.player = videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
              // console.log('onPlayerReady', this)
            });
          });
        }
      });
    });
  }
// if the component is not in use
// dispatch our memory which is occupied
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  render() {
    if (!localStorage.getItem('userTokenTime')) return <Navigate to="/signIn" />
    return (
      
        <div className="row" style={{ width: "100vw" }}>
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-8 mx-auto mt-5">
              {/* this will see if the video is loaded or not ,,if not then this Loading... will be shown */}
            {this.state.loaded ? (
              <div data-vjs-player>
                <video ref={node => this.videoNode = node} className="video-js vjs-big-play-centered" />
              </div>
            ) : ' Loading ... '}
          </div>
        </div>
      
    );
  }
}

export default withRouter(VideoPlayer);