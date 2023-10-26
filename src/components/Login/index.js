import Cookies from 'js-cookie'
import {useState} from 'react'
import {Redirect} from 'react-router-dom'

import './index.css'

function Login(props) {
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState(false)
  const [errorMsgText, setErrorMsgText] = useState('')
  const onFormSubmit = async event => {
    event.preventDefault()
    const userDetails = {user_id: userId, pin}
    const response = await fetch('https://apis.ccbp.in/ebank/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    })
    const data = await response.json()
    if (response.ok) {
      const {jwt_token: jwtToken} = data
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      const {history} = props
      history.replace('/')
    } else {
      setErrorMsgText(data.error_msg)
      setShowErrorMsg(true)
    }
  }
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-page-container">
      <div className="login-card-container">
        <div className="website-login-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="website-login-image"
          />
        </div>
        <div className="login-form-container">
          <h1 className="login-form-heading">Welcome Back!</h1>
          <form className="login-form" onSubmit={onFormSubmit}>
            <div className="input-container">
              <label className="custom-label" htmlFor="userId">
                User ID
              </label>
              <input
                type="text"
                id="userId"
                className="custom-input"
                placeholder="Enter User ID"
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className="custom-label" htmlFor="pin">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="custom-input"
                placeholder="Enter PIN"
                value={pin}
                onChange={e => setPin(e.target.value)}
              />
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
          {showErrorMsg && <p className="error-message">{errorMsgText}</p>}
        </div>
      </div>
    </div>
  )
}
export default Login
