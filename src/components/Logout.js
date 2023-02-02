import { Component } from "react";

class Logout extends Component {
  async componentDidMount() {
    const { history } = this.props;

    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });

    localStorage.removeItem('TWITTER_TOKEN');
    history.replace('/');
  }

  render() {
    return (
      <div>Logging out...</div>
    );
  }
}

export default Logout;