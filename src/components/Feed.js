import React from "react";
import { Link } from "react-router-dom";
import { getTweets } from "../services/tweets";
import { getFormattedDate } from "../utils/dates";
import ErrorMessage from "./ErrorMessage";
import Tweet from "./Tweet";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      isLoading: false,
      error: null,
      newTweetText: "",
    };
  }

  async componentDidMount() {
    // const response = await fetch("http://localhost:3333/tweets");
    // const tweets = await response.json();
    await this.handlePopulateTweets();
}

handlePopulateTweets = async () => {
    this.setState({ 
        isLoading: true,
        error: null
     });

     try{
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
     }catch(error){
         this.setState({ error: error });
     }
    
    };

  handleNewTweet = (event) => {
    this.setState({ newTweetText: event.target.value });
  };

  handlePostTweet = async () => {
    const { newTweetText } = this.state;
    const response = await fetch("http://localhost:3333/tweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: newTweetText,
      }),
    });
    const newTweet = await response.json();
    this.setState({
      tweets: [newTweet, ...this.state.tweets],
      newTweetText: "",
    });
  };

  render() {
    const { tweets, error, isLoading} = this.state;

    <ErrorMessage error={error}  reTry={this.handlePopulateTweets}/>
    
    if(isLoading){
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
            placeholder="What's happening?"
          >
            What's happening?
          </textarea>
          <span className="button" onClick={this.handlePostTweet}>
            Tweet
          </span>
        </div>

        <Tweet tweets={tweets} />
      </div>
    );
  }
}

export default Feed;
