import React from 'react'
import PropTypes from 'prop-types'
import Square from '../square/square'
import { ItemTypes } from '../item-type'
import { DropTarget } from 'react-dnd'
import { calculateDescription } from '../actions/helpers'

const FieldSquare = ({
  column,
  row,
  connectDropTarget,
  isOver,
  canDrop,
  children
}) => {
  const overlayStyle = (isOver, canDrop) => {
    if (isOver && !canDrop) {
      return { opacity: 0.5, backgroundColor: 'red', zIndex: 1 }
    } else if (isOver && canDrop) {
      return { opacity: 0.5, backgroundColor: 'yellow', zIndex: 1 }
    } else {
      return {}
    }
  }
  const style = overlayStyle(isOver, canDrop)

  return connectDropTarget(
    <div style={style}>
      <Square
        key={column + row}
        initContent={calculateDescription(column, row)}
      >
        {children}
      </Square>
    </div>
  )
}

FieldSquare.propTypes = {
  column: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  children: PropTypes.any
}

const FieldSquareComponent = ({ target, collect }) => {
  const DraggableFieldSquare = DropTarget(
    [ItemTypes.PLAYER, ItemTypes.BALL],
    target,
    collect
  )(FieldSquare)
  return <DraggableFieldSquare />
}

export default FieldSquareComponent
