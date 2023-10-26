import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

function Home(props) {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  const jwtToken = Cookies.get('jwt_token')
  if (!jwtToken) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-container">
      <nav className="nav-header">
        <div className="nav-content">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <button className="logout-btn" type="button" onClick={onClickLogout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="account-details">
        <h1 className="account-heading-tag">
          Your Flexibility, Our Excellence
        </h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="digital-card-image"
        />
      </div>
    </div>
  )
}
export default Home
