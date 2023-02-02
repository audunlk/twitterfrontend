import { Component } from "react";
import { getLoginToken } from "../services/tweets";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: null
    };
  }

  handleInputFieldChange(field, event) {
    this.setState({
      [field]: event.target.value
      
    });
    console.log(event.target.value)
  }

  async handleLoginAttempt() {
    const { username, password } = this.state;
    const { history } = this.props;

    try {
      // Make a request to create token
      const { token, error } = await getLoginToken(username, password);

      // Check if we got any errors from the server
      if (error) {
        throw new Error(error);
      }

      // Check if we actually got a token
      if (!token) {
        throw new Error('Something went wrong - got no token');
      }

      // Add token to local storage
      localStorage.setItem('TWITTER_TOKEN', token);

      // redirect to feed
      history.replace('/');
    } catch (error) {
      // log or add error to state to show to user
      this.setState({
        error
      });
    }
  }
  render() {
    const { error, username, password } = this.state;

    return (
      <div className="login">
        <div className="loginBox">
          <h1 className="loginTitle">Log in to Twitter</h1>
          <input
              type="text"
              className="loginInput"
              placeholder="Username"
              onChange={(event) => this.handleInputFieldChange('username', event)}
              value={username}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              onChange={(event) => this.handleInputFieldChange('password', event)}
              value={password}
            />
            <div>
              <button onClick={this.handleLoginAttempt.bind(this)} className="loginButton">
                Log in
              </button>
            </div>
            {error && (
          <div>
            Error: {error.message}
          </div>
        )}
          
        </div>
      </div>
    );
  }
}

export default Login;
