import { Component } from "react";
import { createTweet, getTweets } from "../services/tweets";
import ErrorMessage from "./ErrorMessage";
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

  async handleSubmitNewTweet() {
    const { newTweetText } = this.state;
    // POST / create new tweet through API
    await createTweet(newTweetText);

    // Clear text area
    this.setState({ newTweetText: '' });
    
    // Refetch tweets
    this.handlePopulateTweets();
  }

  async componentDidMount() {
    // Check if we have a token in local storage

    // If not - redirect to /login

    // Else - get info from token and show in UI

    // Fetch tweets from server
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
        <ErrorMessage
          message={error.message}
          onRetry={this.handlePopulateTweets.bind(this)}
        />
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