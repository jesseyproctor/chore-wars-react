import { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { register } from '../api'
import laundryBasketImage from './../images/laundry-basket.png'

function Register ({ isLoggedIn, setAuth }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState()

  if (isLoggedIn) {
    return <Redirect to='/login' />
  }
  // Add a .then to handleSubmit that will do a post to make user a captain // Need an api for that
  function handleSubmit (event) {
    event.preventDefault()
    register(username, password)
      .then(data => {
        if (data && data.auth_token) {
          setAuth(username, data.auth_token)
        }
      })
      .catch(error => {
        setErrors(error.message)
      })
  }

  return (
    <div className=''>
      <div style={{ marginLeft: '50px' }} className='flex-col'>
        <div className='login-page-container'>
          <h1>Welcome to Chore Wars!</h1>
          <div className=''>
            <div className='header-bar' style={{ backgroundImage: `url(${laundryBasketImage})` }} />
          </div>
          <form className='reg' onSubmit={handleSubmit}>
            <h2>Register</h2>
            {errors && (
              <div className='errors'>{errors}</div>
            )}
            <div>
              <label htmlFor='username'>Username</label>
              <input type='text' id='username' required value={username} onChange={event => setUsername(event.target.value)} />
            </div>
            <div>
              <label className='register-password-label' htmlFor='password'>Password</label>
              <input type='password' id='password' required value={password} onChange={event => setPassword(event.target.value)} />
            </div>
            <button style={{ margin: '0' }} className='log-reg-button' type='submit'>Register</button>
          </form>
          <div>
            <p className='route-to-reg'>Already a Chore Wars member? <Link to='/login'>Click here to log in.</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
