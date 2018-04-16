import { range, removeSelf, MIN_COLUMN, MIN_ROW, MAX_COLUMN, MAX_ROW } from "./helpers";
import { equal } from "assert";
import deepEqual from "deep-equal";
import { ItemTypes } from "../components/ItemTypes";

export default function canMoveCore(gameObjects, piece, toPosition) {
	let allPositions = gameObjects
		.teams
		.reduce((a, b) => a.players.concat(b.players))
		.map(p => p.position);
    
    if (piece.type === ItemTypes.BALL) {
      return canMoveBall(allPositions, gameObjects.ball.position, toPosition);
    }	else {
    
      const player = gameObjects
        .teams.find(t => t.name === piece.team)
        .players.find(p => p.number === piece.number);
      allPositions.push(gameObjects.ball.position);
      
      const filtered = removeSelf(allPositions, player.position);
      equal(allPositions.length - filtered.length, 1, "Only fromPosition should be filtered out!");
    
    return player.moves > 0 && canMovePlayer(filtered, player.position, toPosition);
	}
};

function canMovePlayer(allPositions, fromPosition, toPosition) {
  const [fromX, fromY] = fromPosition;
  const [toX, toY] = toPosition;

  return Math.abs(toX - fromX) < 4
    && Math.abs(toY - fromY) < 4
    && !allPositions.find(p => p[0] === toX && p[1] === toY);
};
function canMoveBall(allPositions, fromPosition, toPosition) {
  return (!isOutsideOfTheField(toPosition)
      || (isInTheLeftPenaltyArea(fromPosition) && isALeftGoal(toPosition))
      || (isInTheRightPenaltyArea(fromPosition) && isARightGoal(toPosition)))
    && (canMoveVertically(allPositions, fromPosition, toPosition)
		  || canMoveHorizontally(allPositions, fromPosition, toPosition)
      || canMoveDiagonally(allPositions, fromPosition, toPosition));
};

function canMoveVertically(filteredPositions, fromPosition, toPosition) {
  const [ fromX, fromY ] = fromPosition;
  const [ toX, toY ] = toPosition;

  return fromX === toX
    && range(fromY, toY).every(y => !filteredPositions.some(p => p[0] === toX && p[1] === y));
}
function canMoveHorizontally(filteredPositions, fromPosition, toPosition) {
  const [ fromX, fromY ] = fromPosition;
  const [ toX, toY ] = toPosition;

  return fromY === toY
    && range(fromX, toX).every(x => !filteredPositions.some(p => p[0] === x && p[1] === toY));
}
function canMoveDiagonally(filteredPositions, fromPosition, toPosition) {
  const [ fromX, fromY ] = fromPosition;
  const [ toX, toY ] = toPosition;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const dirX = dx / Math.abs(dx);
  const dirY = dy / Math.abs(dy);
  return Math.abs(dx) === Math.abs(dy)
    && range(0, Math.abs(dx)).every(d => !filteredPositions.some(p => {
      return ((p[0] === fromX + d*dirX && p[1] === fromY + d*dirY))
    }));
}

function isInTheLeftPenaltyArea(ballPosition) {
	const [x, y] = ballPosition;

	return (0 < x && x < 7)
		&& (2 < y && y < 15);
}
function isInTheRightPenaltyArea(ballPosition) {
	const [x, y] = ballPosition;

	return (18 < x && x < 25)
		&& (2 < y && y < 15);
}
function isALeftGoal(toPosition) {
  const [toX, toY] = toPosition;
  
  return toX === MIN_COLUMN && 5 < toY && toY < 12; 
}
function isARightGoal(toPosition) {
  const [toX, toY] = toPosition;
  
  return toX === MAX_COLUMN && 5 < toY && toY < 12; 
}
function isOutsideOfTheField(toPosition) {
  const [toX, toY] = toPosition;

  return (toX === MIN_COLUMN || toX === MAX_COLUMN)
    || (toY === MIN_ROW || toY === MAX_ROW);
}
function areTheSamePosition(fromPosition, toPosition) {
  return deepEqual(fromPosition, toPosition);
}

exports.privateFunctions = {
  canMoveBall,
  canMoveDiagonally,
  canMoveHorizontally,
  canMoveVertically,
  canMovePlayer,
  isInTheLeftPenaltyArea,
  isInTheRightPenaltyArea,
  isOutsideOfTheField,
  isALeftGoal,
  isARightGoal,
  areTheSamePosition
};
