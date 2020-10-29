import React from 'react'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import PropTypes from 'prop-types'
import FieldSquare from '../FieldSquare/FieldSquare'
import Player from '../Player/Player'
import Ball from '../Ball/Ball'
import { range } from '../actions/helpers'
import canDragCore from '../actions/dragCheckers'
import { ItemTypes } from '../ItemTypes'
import canMoveCore from '../actions/moveCheckers'
import moveCore from '../actions/movers'

import { auth } from '../../firebase'

import './Field.css'

const Field = ({ matchState, emitChange }) => {
  const currentUserId = auth().currentUser.uid

  const ballSource = {
    beginDrag() {
      return { type: ItemTypes.BALL }
    },
    canDrag() {
      return canDragCore(matchState, currentUserId, null, null)
    }
  }

  const getPlayerSource = (uid, number) => ({
    beginDrag() {
      return {
        type: ItemTypes.PLAYER,
        uid,
        number
      }
    },
    canDrag() {
      return canDragCore(matchState, currentUserId, uid, number)
    }
  })

  const collect = (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    }
  }

  const getPlayerCollect = (uid, number) => (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
      uid,
      number
    }
  }

  const getSquareTarget = (column, row) => ({
    canDrop(props, monitor) {
      return canMoveCore(matchState, monitor.getItem(), [column, row])
    },
    drop(props, monitor) {
      const newMatchState = moveCore(matchState, monitor.getItem(), [
        column,
        row
      ])
      emitChange(newMatchState)
    }
  })

  const getSquareCollect = (column, row, children) => (connect, monitor) => {
    return {
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      column,
      row,
      children
    }
  }

  const renderPiece = (x, y) => {
    let result = null
    const { teams, ball } = matchState

    if (ball.position[0] === x && ball.position[1] === y) {
      result = <Ball ballSource={ballSource} collect={collect} />
    }

    const players = teams.reduce((a, b) => a.players.concat(b.players))
    let player = players.find(p => p.position[0] === x && p.position[1] === y)

    if (player) {
      const uid = teams.find(t => t.players.includes(player)).uid
      const playerNumber = player.number
      const playerSource = getPlayerSource(uid, playerNumber)
      const playerCollect = getPlayerCollect(uid, playerNumber)
      result = <Player playerSource={playerSource} collect={playerCollect} />
    }

    return result
  }

  const fieldSquares = range(0, 17).map(row =>
    range(0, 25).map(column => {
      const fieldSquareCollect = getSquareCollect(
        column,
        row,
        renderPiece(column, row)
      )
      const squareTarget = getSquareTarget(column, row)
      return (
        <DndProvider key={column + row} backend={HTML5Backend}>
          <FieldSquare target={squareTarget} collect={fieldSquareCollect} />
        </DndProvider>
      )
    })
  )

  return <div className='gamefield'>{fieldSquares}</div>
}

Field.propTypes = {
  matchState: PropTypes.object.isRequired
}

export default Field
