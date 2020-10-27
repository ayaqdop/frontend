import React from 'react'
import { auth } from '../firebase'
import { db } from '../firebase'

import './index.css'

export const MatchMaking = () => {
  const [match, setMatch] = React.useState('')
  const [showError, setShowError] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [dbError, setDBError] = React.useState(null)

  React.useEffect(() => {
    auth().onAuthStateChanged(fUser => {
      if (fUser) {
        console.log('fUser: ', fUser.uid)
        setUser(fUser)
      } else {
        console.log('NO USER!!!!')
      }
    })
  }, [])

  const onChange = e => {
    setMatch(e.target.value.trim())
  }

  const joinRoom = () => {
    if (!match?.length) {
      setShowError(true)
      return
    }

    try {
      db.ref(`match/:${match}`).on('value', snapshot => {
        console.log('snapshot: ', snapshot.val())
      })
    } catch (error) {
      setDBError({ readError: error.message })
    }
  }

  const createRoom = () => {
    console.log('Creating new match')
    console.log('Creating new match', user.uid)

    try {
      db.ref(`match/:${user.uid}`).set({ ruslan: 'ne loh' })
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <main className='match-making'>
      <form>
        <button type='button' onClick={createRoom}>
          Create Match
        </button>
        <hr />
        <input
          type='text'
          placeholder='Match'
          name='match'
          value={match}
          onChange={onChange}
        />
        <button type='button' onClick={joinRoom}>
          Join Match
        </button>
        {showError && <p className='message'>Please specify match to join</p>}
      </form>
    </main>
  )
}
