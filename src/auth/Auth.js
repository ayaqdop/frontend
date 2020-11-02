import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { auth } from '../firebase'
import './auth.css'

import { Button } from '../components/button'

const Auth = () => {
  const history = useHistory()
  const [state, setState] = useState('LOGIN')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        history.push('/matchmaking')
      }
    })
  }, [])

  const submitForm = event => {
    event.preventDefault()
    setError(null)
    switch (state) {
      case 'REGISTER': {
        auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(err => {
            setError(err.message)
          })
        break
      }
      case 'LOGIN':
      default: {
        auth()
          .signInWithEmailAndPassword(email, password)
          .catch(err => {
            setError(err.message)
          })
        break
      }
    }
  }

  return (
    <main className='login'>
      <form onSubmit={submitForm}>
        <input
          type='email'
          placeholder='email'
          name='email'
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
        {error && <p class='error'>{error}</p>}
        <Button type='submit' onClick={submitForm}>
          {state}
        </Button>

        {state === 'LOGIN' && (
          <Button onClick={() => setState('REGISTER')}>
            Not registered? Create an account
          </Button>
        )}

        {state === 'REGISTER' && (
          <Button onClick={() => setState('LOGIN')}>
            Already registered? Log in
          </Button>
        )}
      </form>
    </main>
  )
}
export default Auth
