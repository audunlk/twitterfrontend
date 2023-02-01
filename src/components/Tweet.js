import React from "react";
import Badge from "../images/badge.svg";
import ProfilePicture from "../images/profilepicture.svg";
import { Link } from "react-router-dom";

class Tweet extends React.Component{
    render(){
        const {tweets} = this.props;
        return(
<div className="mainTweet">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="tweetbox">
            <Link
              to={`/user/${tweet.username}`}
              style={{ textDecoration: "none" }}
            >
              <div className="userInfoBox">
                <div className="profileImgBox">
                  <img
                    src={ProfilePicture}
                    alt="profilePicture"
                    className="profileImg"
                  />
                </div>
                <h3 className="profileName">{tweet.name}</h3>
                <div className='verifiedChain'>
                    <img src={Badge} alt="badge" className="badge" />
                    <h4 className="username">@{tweet.username}</h4>
                </div>
              </div>
            </Link>
            
            <p>{tweet.message}</p>
            <p className="time">{tweet.created_at}</p>
          </div>
        ))}
      </div>
        )
    }

}

export default Tweet;