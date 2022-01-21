import React from 'react';
//redirect helps the user to move from one route to another route
import { Link, Navigate} from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    //initially redirect is false
     let shouldRedirect = false;
     //this will check if the user has a token or not
    if (localStorage.getItem('userTokenTime')) {
      // Check if user holds token which is valid in accordance to time
      const data = JSON.parse(localStorage.getItem('userTokenTime'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
        // It's been more than hour since you have visited dashboard
        //token bane hue bahut time ho gya..so redirect 
        localStorage.removeItem('userTokenTime');
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }

    this.state = {
      redirect: shouldRedirect,
      videoList: []
    }
  }

  //componentdidmount will execute only when the whole
//    component has rendered

  componentDidMount() {
    if (localStorage.getItem('userTokenTime')) {
        //we are using the get request to rquest for the video details s
        // store it in the videolist array 
      axios.get('http://127.0.0.1:3333/api/videoList', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      }).then(res => {
        this.setState({
            //storing the video details data into the videolist
          videoList: res.data
        });
      });
    }
  }

  render() {
      //if redirect is true then go to signIn page 
    if (this.state.redirect) return <Navigate to="/signIn" />

    //storing all the videos in video constant and returning it in below

    const videos = this.state.videoList.map(video => {
      return (
        <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" key={video._id}>

            {/* this is the link when u click on the video, it will 
            take u where the video will play */}

          <Link to={'/video/' + video.upload_title}>
            <div className="video-thumbnail">
              <img src={video.thumbnail_path} alt="video thubmnail" />
            </div>

            {/* this is creating a link when u will click on the 
            title of the video  */}
          </Link>
          <span className="username">
            <Link to={'/api/videos/' + video.upload_title}>
              {video.uploader_name}
            </Link>
          </span>
          <span className="video-title">{video.upload_title.replace(/_/g, ' ')}</span>
        </div>
      );
    });

    return (
     
        <div className="container mt-5">
          <h4>Videos</h4>
          <hr className="my-4" />

          <div className="streams row">
            {videos}
          </div>
        </div>
    );
  }
}

export default Dashboard;