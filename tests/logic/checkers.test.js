// import { } from "../../static/logic/checkers";
import { range } from "../../static/logic/Helpers";

const allPositions = [
			        [1, 8],
			    [4, 6], [4, 11],
    [6, 3],             [6, 14],
              
              [8, 8],
    [10, 5],            [10, 11],
              
[12, 4],  [12, 8], [12, 9], [12, 12],


    [13, 3],            [13, 13],
              [15, 8],

    [16, 4],            [16, 12],
              [18, 9],

    [19, 3],            [19, 14],
        [22, 7],    [22, 10],
              [24, 9],
];

function removeSelf(all, fromPosition) {
  return all.filter(p => (p[0] !== fromPosition[0] && p[1] !== fromPosition[1])
    || (p[0] === fromPosition[0] && p[1] !== fromPosition[1])
    || (p[0] !== fromPosition[0] && p[1] === fromPosition[1]));
}

function canMoveVertically(all, fromPosition, toPosition) {
  const filtered = removeSelf(all, fromPosition);
  const [ fromX, fromY ] = fromPosition;
  const [ toX, toY ] = toPosition;

  return fromX === toX
    && range(fromY, toY).every(y => !filtered.some(p => p[0] === toX && p[1] === y));
}

function canMoveHorizontally(all, fromPosition, toPosition) {
  const filtered = removeSelf(all, fromPosition);
  const [ fromX, fromY ] = fromPosition;
  const [ toX, toY ] = toPosition;

  return fromY === toY
    && range(fromX, toX).every(x => !filtered.some(p => p[0] === x && p[1] === toY));
}

test("remove position from an array of positions", () => {
  expect(removeSelf([[12, 8], [12, 5]], [12, 5])).toEqual([[12, 8]]);
  expect(removeSelf([[12, 8], [12, 5]], [12, 11])).toEqual([[12, 8], [12, 5]]);
});

test("can move vertically", () => {
  expect(canMoveVertically(allPositions, [12, 8], [12, 5])).toBeTruthy();
  expect(canMoveVertically(allPositions, [12, 9], [12, 11])).toBeTruthy();
});

test("can not move vertically past other objects", () => {
  expect(canMoveVertically(allPositions, [12, 8], [12, 2])).toBeFalsy();
  expect(canMoveVertically(allPositions, [12, 9], [12, 13])).toBeFalsy();
});

test("can not move vertically if the horizontal axes differ", () => {
  expect(canMoveVertically(allPositions, [12, 8], [10, 2])).toBeFalsy();
  expect(canMoveVertically(allPositions, [10, 9], [12, 13])).toBeFalsy();
});

test("can move horizontally", () => {
  expect(canMoveHorizontally(allPositions, [8, 8], [2, 8])).toBeTruthy();
  expect(canMoveHorizontally(allPositions, [8, 8], [11, 8])).toBeTruthy();
});

test("can not move horizontally past other objects", () => {
  expect(canMoveHorizontally(allPositions, [12, 8], [1, 8])).toBeFalsy();
  expect(canMoveHorizontally(allPositions, [1, 8], [10, 8])).toBeFalsy();
});

test("can not move horizontally if the horizontal axes differ", () => {
  expect(canMoveHorizontally(allPositions, [12, 8], [10, 2])).toBeFalsy();
  expect(canMoveHorizontally(allPositions, [10, 9], [12, 13])).toBeFalsy();
});

