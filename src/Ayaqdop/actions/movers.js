import deepEqual from 'deep-equal'
import { ItemTypes } from '../ItemTypes'
import { difference } from './helpers'

export default function moveCore(gameObjects, piece, toPosition) {
  let newMatchState = JSON.parse(JSON.stringify(gameObjects))
  if (piece.type === ItemTypes.BALL) {
    newMatchState = moveBall(newMatchState, toPosition)
  } else {
    newMatchState = movePlayer(newMatchState, piece, toPosition)
  }

  return newMatchState
}

function moveBall(gameObjects, toPosition) {
  const newMatchState = JSON.parse(JSON.stringify(gameObjects))
  newMatchState.ball.position = toPosition
  const team = newMatchState.teams.find(team => team.moves > 0)
  team.moves--

  console.log(`Team moves left: ${team.moves}`)
  return newMatchState
}

function movePlayer(gameObjects, piece, toPosition) {
  const newMatchState = JSON.parse(JSON.stringify(gameObjects))
  const team = newMatchState.teams.find(t => t.uid === piece.uid)

  const player = team.players.find(p => p.number === piece.number)

  const diff = difference(player.position, toPosition)

  if (
    player.moves >= diff &&
    team.moves >= diff &&
    !deepEqual(player.position, toPosition)
  ) {
    console.log(`From: ${player.position} To: ${toPosition}`)
    player.position = toPosition
    player.moves -= diff
    team.moves -= diff
    console.log(
      `Team moves left: ${team.moves}   Player moves left: ${player.moves}`
    )
  }

  return newMatchState
}

export const privateFunctions = {
  moveBall,
  movePlayer
}
