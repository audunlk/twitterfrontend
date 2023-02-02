import React from "react";
import Badge from "../images/badge.svg";
import { getFormattedDate } from "../utils/dates";
import ProfilePicture from "../images/profilepicture.svg";
import Tweet from "./Tweet";
import ErrorMessage from "./ErrorMessage";
import { updateLikes } from "../services/tweets";

class UserFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isLoading: true,
      error: null,
      likes: []
    };
  }

  async componentDidMount() {
    await this.handleGetTweetByUser(this.props.match.params.username);
  }

  handleGetTweetByUser = async (username) => {
    try {
      const response = await fetch(`http://localhost:3333/tweets/${username}`);
      const tweets = await response.json();
      this.setState({
        tweets,
        isLoading: false,
      });
      this.setState({
        tweets: tweets.map((tweet) => ({
          ...tweet,
          created_at: getFormattedDate(tweet.created_at),
        })),
      });
    } catch (error) {
      this.setState({
        error: error,
      });
    }
  };

  
handleLike = async (id, like_count) => {
  const { tweets } = this.state;
  const newTweets = tweets.map((tweet) => {
    if (tweet.id === id) {
      return {
        ...tweet,
        like_count: like_count + 1,
      };
    }
    return tweet;
  });
  this.setState({ tweets: newTweets });
  await updateLikes(id, like_count);
};

//check if user has liked post already
// handleCheckLike = (tweet) => {
//   const { likes } = this.state;
//   const liked = likes.find((like) => like.tweet_id === tweet.id);
//   if (liked) {
//     return true;
//   }
//   return false;
// };



  render() {
    const { isLoading, error } = this.state;
    const tweetPerUser = this.state.tweets;

    const userProfile = {
      id: tweetPerUser[0]?.id,
      name: tweetPerUser[0]?.name,
      username: tweetPerUser[0]?.username,
    };

    <ErrorMessage error={error}  reTry={this.handleGetTweetByUser} />;
    if (isLoading) {
      return (
        <div className="main">
          <p>Loading...</p>
        </div>
      );
    }

    //const { username } = this.props.match.params;
    return (
      <div className="main">
        <div key={userProfile.id} className="profileBox">
          <div className="userInfoBox">
            <div className="profileImgBox">
              <img
                src={ProfilePicture}
                alt="profilePicture"
                className="profileImg"
              />
            </div>
            <h3 className="profileName">{userProfile.name}</h3>
            <div className="verifiedChain">
                <img src={Badge} alt="badge" className="badge" />
                <h4 className="username">@{userProfile.username}</h4>
            </div>
            <div className="bioProfile">
                <p>45th President of the United States of America!  &#128545; &#128545; &#128545; &#128545; &#128545; &#128545;</p>
            </div>
            
          </div>
        </div>
        <Tweet tweets={tweetPerUser}
        handleLike={this.handleLike}  />
      </div>
    );
  }
}

export default UserFeed;
