import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../item-type'

import './player.css'
import { useParams } from 'react-router-dom'

const Player = ({ connectDragSource, uid, number }) => {
  const { matchId } = useParams()
  return connectDragSource(
    <div className={uid !== matchId ? 'otherPlayer' : 'player'}>{number}</div>
  )
}

Player.propTypes = {
  uid: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  connectDragSource: PropTypes.func.isRequired
}

const PlayerComponent = ({ playerSource, collect }) => {
  const DraggablePlayer = DragSource(
    ItemTypes.PLAYER,
    playerSource,
    collect
  )(Player)
  return <DraggablePlayer />
}

export default PlayerComponent
