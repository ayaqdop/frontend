import { range } from "./Helpers";

export function canMoveBall(allPositions, fromPosition, toPosition) {
  const filtered = removeSelf(allPositions, fromPosition);

	return canMoveVertically(filtered, fromPosition, toPosition)
		|| canMoveHorizontally(filtered, fromPosition, toPosition)
		|| canMoveDiagonally(filtered, fromPosition, toPosition);
};
export function canMovePlayer(allPositions, fromPosition, toPosition) {
  const [fromX, fromY] = fromPosition;
  const [toX, toY] = toPosition;

	return Math.abs(toX - fromX) < 4 && Math.abs(toY - fromY) < 4;
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

  return (Math.abs(toY - fromY) === Math.abs(toX - fromX));
}

exports.privateFunctions = {
  removeSelf,
  canMoveDiagonally,
  canMoveHorizontally,
  canMoveVertically
};
