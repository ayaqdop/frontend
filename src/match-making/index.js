import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import initialState from './game.json'
import { auth } from '../firebase'
import { db } from '../firebase'

import './index.css'

export const MatchMaking = () => {
  const [showError, setShowError] = useState(null)
  const [user, setUser] = useState(null)
  const [matches, setMatches] = useState([])
  const history = useHistory()

  useEffect(() => {
    auth().onAuthStateChanged(fUser => {
      if (fUser) {
        setUser(fUser)
      } else {
        console.log('NO USER!!!!')
      }
    })
    getMatches()

    return () => {
      db.ref(`match`).off()
    }
  }, [])

  const getMatches = () => {
    try {
      db.ref(`match`).on('value', snapshot => {
        setMatches(Object.keys(snapshot.val()))
        console.log('snapshot: ', snapshot.val())
      })
    } catch (error) {
      setShowError({ writeError: error.message })
    }
  }

  const joinMatch = matchId => {
    initialState.teams[0].uid = matchId
    initialState.teams[1].uid = user.uid
    try {
      db.ref(`match/${matchId}`).update(initialState)
      history.push(`/match/${matchId}`)
    } catch (error) {
      setShowError({ readError: error.message })
    }
  }

  const createMatch = () => {
    initialState.teams[0].uid = user.uid
    try {
      db.ref(`match/${user.uid}`).set(initialState)
      history.push(`/match/${user.uid}`)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  return (
    <main className='match-making'>
      <form>
        <button type='button' onClick={createMatch}>
          Create Match
        </button>
        <hr />
        <ul>
          {matches.map(m => (
            <li key={m}>
              <button type='button' onClick={() => joinMatch(m)}>
                Join {m}
              </button>
            </li>
          ))}
        </ul>

        {showError && <p className='message'>Please specify match to join</p>}
      </form>
    </main>
  )
}
