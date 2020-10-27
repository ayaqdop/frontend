import React from 'react'
import { useParams } from 'react-router-dom'

import { db } from '../firebase'

export const Match = () => {
  const { matchId } = useParams()

  React.useEffect(() => {
    db.ref(`match/${matchId}`).on('value', snapshot => {
      console.log('snapshot: ', snapshot.val())
    })
  }, [])
  return <h1>MATCH</h1>
}
