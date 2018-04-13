import { range } from "./Helpers";
import { equal } from "assert";

export function canMoveBall(allPositions, fromPosition, toPosition) {
  const filtered = removeSelf(allPositions, fromPosition);
  equal(allPositions.length - filtered.length, 1, "Only fromPosition should be filtered out!")

	return canMoveVertically(filtered, fromPosition, toPosition)
		|| canMoveHorizontally(filtered, fromPosition, toPosition)
		|| canMoveDiagonally(filtered, fromPosition, toPosition);
};
export function canMovePlayer(allPositions, fromPosition, toPosition) {
  const filtered = removeSelf(allPositions, fromPosition);
  equal(allPositions.length - filtered.length, 1, "Only fromPosition should be filtered out!")
  
  const [fromX, fromY] = fromPosition;
  const [toX, toY] = toPosition;

  return Math.abs(toX - fromX) < 4
    && Math.abs(toY - fromY) < 4
    && !filtered.find(p => p[0] === toX && p[1] === toY);
};

function removeSelf(all, fromPosition) {
  return all.filter(p => (p[0] !== fromPosition[0] && p[1] !== fromPosition[1])
    || (p[0] === fromPosition[0] && p[1] !== fromPosition[1])
    || (p[0] !== fromPosition[0] && p[1] === fromPosition[1]));
}

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
  const dirX = dx/Math.abs(dx);
  const dirY = dy/Math.abs(dy);
  return Math.abs(dx) === Math.abs(dy)
    && range(0, Math.abs(dx)).every(d => !filteredPositions.some(p => {
      return ((p[0] === fromX + d*dirX && p[1] === fromY + d*dirY))
    }));
}

exports.privateFunctions = {
  removeSelf,
  canMoveDiagonally,
  canMoveHorizontally,
  canMoveVertically
};
