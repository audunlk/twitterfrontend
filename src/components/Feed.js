import React from "react";
import { createTweet, getTweets, updateLikes, handleCheckLike } from "../services/tweets";
import { getFormattedDate } from "../utils/dates";
import ErrorMessage from "./ErrorMessage";
import Tweet from "./Tweet";
import jwtDecode from "jwt-decode";


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isLoading: false,
      error: null,
      newTweetText: "",
      user: {}
    };
  }

  async componentDidMount() {
    const token = localStorage.getItem("TWITTER_TOKEN")
    if(!token){
      this.props.history.replace("/login");
    }else {
      //get info from token
      const payload = jwtDecode(token);
      this.setState({
        user: payload
      })
      await this.handlePopulateTweets();
    }
    
  }

  handlePopulateTweets = async () => {
    this.setState({
      isLoading: true,
      error: null,
    });

    try {
      const tweets = await getTweets();
      
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
      this.setState({ error: error });
    }
  };


  handleNewTweet = (event) => {
    this.setState({ newTweetText: event.target.value });
  };

  handlePostTweet = async () => {
    if(this.state.newTweetText === ''){
      return;
    }
    const { newTweetText } = this.state;
    // POST / create new tweet through API
    await createTweet(newTweetText);

    // Clear text area
    this.setState({ newTweetText: '' });
    
    // Refetch tweets
    this.handlePopulateTweets();
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
  await updateLikes(id);

  };

  handleCheckLiked = async (id) => {
    const { tweets } = this.state;
    const newTweets = tweets.map((tweet) => {
      if (tweet.id === id) {
        return {
          ...tweet,
          liked: true,
        };
      }
      return tweet;
    });

    this.setState({ tweets: newTweets });
    await handleCheckLike(id);
  };



  render() {
    const { tweets, error, isLoading, user } = this.state;

    <ErrorMessage error={error} reTry={this.handlePopulateTweets} />;

    if (isLoading) {
      return (
        <div className="main">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="main">
        <div className="inputBox">
          <textarea
            value={this.state.newTweetText}
            onChange={this.handleNewTweet.bind(this)}
            placeholder={`Whats on your mind ${user.name}?`}>
          </textarea>
          <span className="button" 
          onClick={this.handlePostTweet}
          >
            Tweet
          </span>
          
        </div>

        <Tweet tweets={tweets} 
        handleLike={this.handleLike}
        />
      </div>
    );
  }
}

export default Feed;
