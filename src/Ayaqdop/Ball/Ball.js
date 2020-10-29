import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'
import './Ball.css'

const Ball = ({ connectDragSource }) => {
  return connectDragSource(<div className='ball'></div>)
}

Ball.propTypes = {
  connectDragSource: PropTypes.func.isRequired
}

const BallComponent = ({ ballSource, collect }) => {
  const DraggableBall = DragSource(ItemTypes.BALL, ballSource, collect)(Ball)
  return <DraggableBall />
}

export default BallComponent
