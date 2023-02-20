import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', error: '', isShowingError: false}

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 5})
    history.replace('/')
  }

  submitFailure = error => {
    this.setState({error, isShowingError: true})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {error, isShowingError} = this.state
    return (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="input-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              className="input-text"
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="input-text"
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {isShowingError ? <p className="error-msg">*{error}</p> : null}
        </form>
      </div>
    )
  }
}
export default Login
