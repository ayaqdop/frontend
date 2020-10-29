import {
  range,
  removeSelf,
  difference,
  MIN_COLUMN,
  MIN_ROW,
  MAX_COLUMN,
  MAX_ROW
} from './helpers'
import { equal } from 'assert'
import deepEqual from 'deep-equal'
import { ItemTypes } from '../ItemTypes'

export default function canMoveCore(gameObjects, piece, toPosition) {
  if (piece.type === ItemTypes.BALL) {
    return canMoveBall(gameObjects, toPosition)
  } else {
    let allPositions = allPlayerPositions(gameObjects)
    allPositions.push(gameObjects.ball.position)

    const team = gameObjects.teams.find(t => t.uid === piece.uid)
    const player = team.players.find(p => p.number === piece.number)

    const filtered = removeSelf(allPositions, player.position)
    equal(
      allPositions.length - filtered.length,
      1,
      'Only fromPosition should be filtered out!'
    )

    const diff = difference(player.position, toPosition)
    return (
      player.moves >= diff &&
      team.moves >= diff &&
      canMovePlayer(filtered, player.position, toPosition)
    )
  }
}

function canMovePlayer(allPositions, fromPosition, toPosition) {
  const [fromX, fromY] = fromPosition
  const [toX, toY] = toPosition

  return (
    Math.abs(toX - fromX) < 4 &&
    Math.abs(toY - fromY) < 4 &&
    !allPositions.find(p => p[0] === toX && p[1] === toY)
  )
}
function canMoveBall(gameObjects, toPosition) {
  const currentTeam = gameObjects.teams.find(team => team.moves > 0)
  const playerPositions = allPlayerPositions(gameObjects)
  const fromPosition = gameObjects.ball.position

  return (
    (!isOutsideOfTheField(toPosition) ||
      (isInTheLeftPenaltyArea(fromPosition) && isALeftGoal(toPosition)) ||
      (isInTheRightPenaltyArea(fromPosition) && isARightGoal(toPosition))) &&
    (canMoveVertically(
      currentTeam,
      playerPositions,
      fromPosition,
      toPosition
    ) ||
      canMoveHorizontally(
        currentTeam,
        playerPositions,
        fromPosition,
        toPosition
      ) ||
      canMoveDiagonally(currentTeam, playerPositions, fromPosition, toPosition))
  )
}

function canMoveVertically(team, playerPositions, fromPosition, toPosition) {
  const [fromX, fromY] = fromPosition
  const [toX, toY] = toPosition
  const dirY = (toY - fromY) / Math.abs(toY - fromY)

  return (
    team.players.some(
      player =>
        player.position[0] === toX && player.position[1] === fromY - dirY
    ) &&
    fromX === toX &&
    range(fromY, toY).every(
      y => !playerPositions.some(p => p[0] === toX && p[1] === y)
    )
  )
}
function canMoveHorizontally(team, playerPositions, fromPosition, toPosition) {
  const [fromX, fromY] = fromPosition
  const [toX, toY] = toPosition
  const dirX = (toX - fromX) / Math.abs(toX - fromX)

  return (
    team.players.some(
      player =>
        player.position[0] === fromX - dirX && player.position[1] === toY
    ) &&
    fromY === toY &&
    range(fromX, toX).every(
      x => !playerPositions.some(p => p[0] === x && p[1] === toY)
    )
  )
}
function canMoveDiagonally(team, playerPositions, fromPosition, toPosition) {
  const [fromX, fromY] = fromPosition
  const [toX, toY] = toPosition

  const dx = toX - fromX
  const dy = toY - fromY
  const dirX = dx / Math.abs(dx)
  const dirY = dy / Math.abs(dy)
  return (
    team.players.some(
      player =>
        player.position[0] === fromX - dirX &&
        player.position[1] === fromY - dirY
    ) &&
    Math.abs(dx) === Math.abs(dy) &&
    range(0, Math.abs(dx)).every(
      d =>
        !playerPositions.some(p => {
          return p[0] === fromX + d * dirX && p[1] === fromY + d * dirY
        })
    )
  )
}

function isInTheLeftPenaltyArea(ballPosition) {
  const [x, y] = ballPosition

  return 0 < x && x < 7 && 2 < y && y < 15
}
function isInTheRightPenaltyArea(ballPosition) {
  const [x, y] = ballPosition

  return 18 < x && x < 25 && 2 < y && y < 15
}
export function isALeftGoal(toPosition) {
  const [toX, toY] = toPosition

  return toX === MIN_COLUMN && 5 < toY && toY < 12
}
export function isARightGoal(toPosition) {
  const [toX, toY] = toPosition

  return toX === MAX_COLUMN && 5 < toY && toY < 12
}
function isOutsideOfTheField(toPosition) {
  const [toX, toY] = toPosition

  return (
    toX === MIN_COLUMN ||
    toX === MAX_COLUMN ||
    toY === MIN_ROW ||
    toY === MAX_ROW
  )
}
function areTheSamePosition(fromPosition, toPosition) {
  return deepEqual(fromPosition, toPosition)
}
function allPlayerPositions(gameObjects) {
  return gameObjects.teams
    .reduce((a, b) => a.players.concat(b.players))
    .map(player => player.position)
}

export const privateFunctions = {
  canMoveBall,
  canMoveDiagonally,
  canMoveHorizontally,
  canMoveVertically,
  canMovePlayer,
  isInTheLeftPenaltyArea,
  isInTheRightPenaltyArea,
  isOutsideOfTheField,
  areTheSamePosition,
  allPlayerPositions
}
