import { privateFunctions } from "../../static/logic/moveCheckers";

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

test("remove position from an array of positions", () => {
  expect(privateFunctions.removeSelf([ballPosition, [12, 5]], [12, 5])).toEqual([[12, 9]]);
  expect(privateFunctions.removeSelf([ballPosition, [12, 5]], [12, 11])).toEqual([[12, 9], [12, 5]]);
});

test("can move vertically", () => {
  expect(privateFunctions.canMoveVertically(allPositions, [12, 10], [12, 9])).toBeTruthy();
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [12, 11])).toBeTruthy();
});
test("can not move vertically past other objects", () => {
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [12, 2])).toBeFalsy();
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [12, 13])).toBeFalsy();
});
test("can not move vertically if the horizontal axes differ", () => {
  expect(privateFunctions.canMoveVertically(allPositions, ballPosition, [10, 2])).toBeFalsy();
  expect(privateFunctions.canMoveVertically(allPositions, [10, 9], [12, 13])).toBeFalsy();
});

test("can move horizontally", () => {
  expect(privateFunctions.canMoveHorizontally(allPositions, [7, 8], [2, 8])).toBeTruthy();
  expect(privateFunctions.canMoveHorizontally(allPositions, [9, 8], [11, 8])).toBeTruthy();
});
test("can not move horizontally past other objects", () => {
  expect(privateFunctions.canMoveHorizontally(allPositions, ballPosition, [1, 8])).toBeFalsy();
  expect(privateFunctions.canMoveHorizontally(allPositions, [1, 8], [10, 8])).toBeFalsy();
});
test("can not move horizontally if the horizontal axes differ", () => {
  expect(privateFunctions.canMoveHorizontally(allPositions, ballPosition, [10, 2])).toBeFalsy();
  expect(privateFunctions.canMoveHorizontally(allPositions, [10, 9], [12, 13])).toBeFalsy();
});

test("can move diagonally", () => {
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [8, 5])).toBeTruthy();
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [20, 1])).toBeTruthy();
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [19, 16])).toBeTruthy();
  expect(privateFunctions.canMoveDiagonally(allPositions, ballPosition, [11, 10])).toBeTruthy();
});
