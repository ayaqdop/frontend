import React, { useState } from 'react'

import Field from '../Ayaqdop/Field/Field'

import './index.css'
import img from './loading.gif'
import { useMatchState } from '../utils/useMatchState'

export const Match = () => {
  const { matchState, initiateMatch, emitChange } = useMatchState()
  const [initMatch, setInitMatch] = useState(true)

  React.useEffect(() => {
    if (initMatch && matchState?.teams[0]?.uid && matchState?.teams[1]?.uid) {
      setInitMatch(false)
      initiateMatch()
    }
  }, [matchState])

  if (!matchState || !matchState.teams[0].uid || !matchState.teams[1].uid) {
    return <img src={img} className='centered' />
  } else {
    return (
      <main className='game'>
        <Field matchState={matchState} emitChange={emitChange} />
      </main>
    )
  }
}
