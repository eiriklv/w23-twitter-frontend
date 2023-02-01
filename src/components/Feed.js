import { Component } from "react";
import { getTweets } from "../services/tweets";
import Tweet from "./Tweet";

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: [],
      isLoading: true,
      error: null,
    }
  }

  async componentDidMount() {
    await this.handlePopulateTweets();
  }

  async handlePopulateTweets() {
    this.setState({
      isLoading: true,
      error: null,
    });
    
    try {
      const tweets = await getTweets();
    
      this.setState({
        tweets,
        isLoading: false
      });
    } catch (error) {
      this.setState({
        error: error
      })
    }
  }

  render() {
    const { error, isLoading, tweets } = this.state;

    if (error) {
      return (
        <div>
          <h3>Unable to fetch tweets: {error.message}</h3>
          <button onClick={this.handlePopulateTweets.bind(this)}>
            Retry
          </button>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>Loading tweets...</div>
      );
    }

    const tweetElements = tweets
    .map((tweet) => {
      return <Tweet tweetInfo={tweet} />
    });

    return (
      <div>
        <h1>Feed</h1>
        <div>{tweetElements}</div>
      </div>
    );
  }
}

export default Feed;