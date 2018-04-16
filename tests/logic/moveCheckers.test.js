import { privateFunctions, canMovePlayer } from "../../static/logic/moveCheckers";
import * as helpers from "../../static/logic/helpers";

const allPositions = [
			        [1, 8],
			    [4, 6], [4, 11],
    [6, 3],             [6, 14],
              
              [8, 8],
    [10, 5],            [10, 11],
              
    [12, 4],  [12, 8], [12, 12],


    [13, 3],            [13, 13],
              [15, 8],

    [16, 4],            [16, 12],
              [18, 9],

    [19, 3],            [19, 14],
        [22, 7],    [22, 10],
              [24, 9],
];
const ballPosition = [12, 9];

test("can move vertically", () => {
  expect(privateFunctions.canMoveVertically(allPositions, [12, 10], [12, 9])).toBe(true);
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [12, 11])).toBe(true);
});
test("can not move vertically past other objects", () => {
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [12, 2])).toBe(false);
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [12, 13])).toBe(false);
});
test("can not move vertically if the horizontal axes differ", () => {
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [10, 2])).toBe(false);
  expect(privateFunctions.canMoveVertically(allPositions, [10, 9], [12, 13])).toBe(false);
});

test("can move horizontally", () => {
  expect(privateFunctions.canMoveHorizontally(allPositions, [7, 8], [2, 8])).toBe(true);
  expect(privateFunctions.canMoveHorizontally(allPositions, [9, 8], [11, 8])).toBe(true);
});
test("can not move horizontally past other objects", () => {
  expect(privateFunctions.canMoveHorizontally(allPositions, ballPosition, [1, 8])).toBe(false);
  expect(privateFunctions.canMoveHorizontally(allPositions, [1, 8], [10, 8])).toBe(false);
});
test("can not move horizontally if the horizontal axes differ", () => {
  expect(privateFunctions.canMoveHorizontally(allPositions, ballPosition, [10, 2])).toBe(false);
  expect(privateFunctions.canMoveHorizontally(allPositions, [10, 9], [12, 13])).toBe(false);
});

test("can move diagonally", () => {
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [8, 5])).toBe(true);
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [20, 1])).toBe(true);
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [19, 16])).toBe(true);
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [11, 10])).toBe(true);
});

test("can move player", () => {
  const playerPosition = [22, 7];
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [21, 10])).toBe(true);
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [20, 5])).toBe(true);
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [22, 4])).toBe(true);
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [25, 10])).toBe(true);
});

test("can not move player", () => {
  const playerPosition = [22, 7];
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [18, 7])).toBe(false);
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [22, 10])).toBe(false);
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [24, 9])).toBe(false);
  expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [19, 3])).toBe(false);
});

test("is outside of the field", () => {
  for (let row of helpers.range(helpers.MIN_ROW, helpers.MAX_ROW)) {
    expect(privateFunctions.isOutsideOfTheField([helpers.MIN_COLUMN, row])).toBe(true);
    expect(privateFunctions.isOutsideOfTheField([helpers.MAX_COLUMN, row])).toBe(true);
  }
  for (let column of helpers.range(helpers.MIN_COLUMN, helpers.MAX_COLUMN)) {
    expect(privateFunctions.isOutsideOfTheField([column, helpers.MIN_ROW])).toBe(true);
    expect(privateFunctions.isOutsideOfTheField([column, helpers.MAX_ROW])).toBe(true);
  }
});

test("is inside of the field", () => {
  for (let column of helpers.range(1, 24)) {
    for (let row of helpers.range(1, 16)) {
      expect(privateFunctions.isOutsideOfTheField([column, row])).toBe(false);
      expect(privateFunctions.isOutsideOfTheField([column, row])).toBe(false);
    }
  }
});
});

test("are same position", () => {
  expect(privateFunctions.areTheSamePosition([5, 7], [5, 7])).toBe(true);
  expect(privateFunctions.areTheSamePosition([5, 7], [7, 5])).toBe(false);
});
