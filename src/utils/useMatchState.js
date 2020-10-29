import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import initialState from './game.json'
import { db, auth } from '../firebase'
import { isALeftGoal, isARightGoal } from '../Ayaqdop/actions/moveCheckers'

export const useMatchState = initialPlayer => {
  const [matchState, setMatchState] = useState(initialState)
  const [currentPlayer, setCurrentPLayer] = useState(initialPlayer)
  const { matchId } = useParams()
  const currentUserId = auth().currentUser.uid

  const changeTurn = (userId, otherMatchState = matchState) => {
    const newMatchState = JSON.parse(JSON.stringify(otherMatchState))
    const currentTeam = newMatchState.teams.find(t => t.uid === userId)
    currentTeam.moves = 5
    currentTeam.players.forEach(p => (p.moves = 3))
    setCurrentPLayer(currentTeam.uid)
    console.log(`Now it is the turn of ${currentTeam.name}`)

    const otherTeam = newMatchState.teams.find(t => t.uid !== userId)
    otherTeam.moves = 0
    otherTeam.players.forEach(p => (p.moves = 0))
    return newMatchState
  }

  const handleStateChange = newState => {
    if (currentUserId !== currentPlayer) return
    db.ref(`match/${matchId}`).update(newState)
  }

  const getNewInitialState = isLeftGoal => {
    let newInitialState = JSON.parse(JSON.stringify(initialState))
    newInitialState.teams[0].uid = matchState.teams[0].uid
    newInitialState.teams[1].uid = matchState.teams[1].uid
    if (isLeftGoal) {
      newInitialState.teams[1].score++
      newInitialState = changeTurn(gameObjects.teams[0].uid, newInitialState)
    } else {
      newInitialState.teams[0].score++
      newInitialState.teams[0].players[10].position[0] -= 2
      newInitialState.teams[1].players[10].position[0] -= 2
      newInitialState.teams[1].players[10].position[1]++
      newInitialState.ball.position = [13, 8]

      newInitialState = changeTurn(gameObjects.teams[1].uid, newInitialState)
    }
    console.log('Gooooooooaaaal!')
    console.log(
      `The score is ${newInitialState.teams[0].name}: ${newInitialState.teams[0].score}, ${newInitialState.teams[1].name}: ${newInitialState.teams[1].score}`
    )

    return newInitialState
  }

  const emitChange = (otherMatchState = matchState) => {
    const ballPosition = matchState.ball.position
    let newMatchState = JSON.parse(JSON.stringify(otherMatchState))

    if (isALeftGoal(ballPosition) || isARightGoal(ballPosition)) {
      newMatchState = getNewInitialState(isALeftGoal(ballPosition))
    }

    const currentTeam = newMatchState.teams.find(
      team => team.uid === currentPlayer
    )
    if (currentTeam && currentTeam.moves === 0) {
      newMatchState = changeTurn(
        newMatchState.teams.find(t => t.uid !== currentTeam.uid).uid,
        newMatchState
      )
    }

    handleStateChange(newMatchState)
  }

  const initiateMatch = () => {
    const newMatchState = changeTurn(matchId)
    handleStateChange(newMatchState)
  }

  useEffect(() => {
    db.ref(`match/${matchId}`).on('value', snapshot => {
      setMatchState(snapshot.val())
    })

    return () => {
      db.ref(`match/${matchId}`).off()
    }
  }, [])

  return { matchState, changeTurn, emitChange, initiateMatch }
}
