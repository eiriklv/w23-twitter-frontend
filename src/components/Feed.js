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
      newTweetText: '',
    }
  }

  handleChangeNewTweetText(event) {
    this.setState({
      newTweetText: event.target.value
    });
  }

  handleSubmitNewTweet() {
    // POST / create new tweet through API

    // Clear text area
    this.setState({ newTweetText: '' });
    
    // Refetch tweets
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
    const { error, isLoading, tweets, newTweetText } = this.state;

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
        <div>
          <label>
            Write a new tweet:
            <div>
              <textarea
                rows="3"
                value={newTweetText}
                onChange={this.handleChangeNewTweetText.bind(this)} />
            </div>
          </label>
          <button onClick={this.handleSubmitNewTweet.bind(this)}>
            Submit tweet
          </button>
        </div>
        <div>{tweetElements}</div>
      </div>
    );
  }
}

export default Feed;