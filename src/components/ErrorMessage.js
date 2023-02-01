import { Component } from "react";

class ErrorMessage extends Component {
  render() {
    const { message, onRetry } = this.props;

    return (
      <div>
        <h3>Unable to fetch tweets: {message}</h3>
        <button onClick={onRetry}>Retry</button>
      </div>
    );
  }
}

export default ErrorMessage;
