import { Component } from "react";
import { Link } from "react-router-dom";
import { getFormattedTime } from "../utils/dates";

class Tweet extends Component {
  render() {
    const tweet = this.props.tweetInfo;
    const { id, name, message, username, created_at } = tweet;

    const tweetStyles = {
      border: "1px solid black",
      margin: 10,
      padding: 10,
    };

    const userLink = (
      <Link to={`/user/${username}`}>
        @{username}
      </Link>
    );

    return (
      <div key={id} style={tweetStyles}>
        <p>
          {name} ({userLink}) {getFormattedTime(created_at)}
        </p>
        <p>{message}</p>
      </div>
    );
  }
}

export default Tweet;
