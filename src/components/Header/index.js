import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <ul className="header-container">
      <Link to="/">
        <li>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-image"
            alt="website logo"
          />
        </li>
      </Link>
      <div className="home-jobs">
        <Link to="/" className="link-item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link-item">
          <li>Jobs</li>
        </Link>
      </div>
      <li>
        <button className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
