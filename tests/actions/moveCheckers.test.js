import { privateFunctions, isALeftGoal, isARightGoal } from "../../src/actions/moveCheckers";
import * as helpers from "../../src/actions/helpers";

const gameObjects = {
  ball: {
    position: [12, 9]
  },
  teams: [{
    name: "Barcelona",
    moves: 5,
    players: [
      { number: 1,  position: [1, 8] },
      { number: 18, position: [6, 3] },
      { number: 23, position: [4, 6] },
      { number: 3,  position: [4, 11] },
      { number: 20, position: [6, 14] },
      { number: 8,  position: [10, 5] },
      { number: 5,  position: [8, 8] },
      { number: 4,  position: [10, 12] },
      { number: 14, position: [12, 4] },
      { number: 9,  position: [12, 8] },
      { number: 10, position: [12, 13] },
    ]
  },
  {
    name: "Bayern",
    moves: 0,
    players: [
      { number: 1,   position: [24, 9] },
      { number: 32,  position: [19, 3] },
      { number: 5,   position: [22, 7] },
      { number: 17,  position: [22, 10] },
      { number: 27,  position: [19, 14] },
      { number: 25,  position: [16, 4] },
      { number: 6,   position: [18, 9] },
      { number: 11,  position: [16, 13] },
      { number: 10,  position: [13, 14] },
      { number: 9,   position: [15, 8] },
      { number: 7,   position: [13, 3] },
    ]
  }]
};
const allPositions = [
			        [1, 8],
			    [4, 6], [4, 11],
    [6, 3],             [6, 14],
              
              [8, 8],
    [10, 5],            [10, 12],
              
    [12, 4],  [12, 8], [12, 13],


    [13, 3],            [13, 14],
              [15, 8],

    [16, 4],            [16, 13],
              [18, 9],

    [19, 3],            [19, 14],
        [22, 7],    [22, 10],
              [24, 9],
];
const ballPosition = [12, 9];

describe("move vertically", () => {
  test("can move", () => {
    expect(privateFunctions.canMoveVertically(gameObjects.teams[0], allPositions, ballPosition, [12, 10])).toBe(true);
    expect(privateFunctions.canMoveVertically(gameObjects.teams[0], allPositions, ballPosition, [12, 11])).toBe(true);
  });
  test("can not move past other objects", () => {
    expect(privateFunctions.canMoveVertically(gameObjects.teams[0], allPositions, ballPosition, [12, 2])).toBe(false);
    expect(privateFunctions.canMoveVertically(gameObjects.teams[0], allPositions, ballPosition, [12, 13])).toBe(false);
  });
  test("can not move if the horizontal axes differ", () => {
    expect(privateFunctions.canMoveVertically(gameObjects.teams[0], allPositions, ballPosition, [10, 2])).toBe(false);
    expect(privateFunctions.canMoveVertically(gameObjects.teams[0], allPositions, [10, 9], [12, 13])).toBe(false);
  });
});
describe("move horizontally", () => {
  test("can move", () => {
    expect(privateFunctions.canMoveHorizontally(gameObjects.teams[0], allPositions, [7, 8], [2, 8])).toBe(true);
    expect(privateFunctions.canMoveHorizontally(gameObjects.teams[0], allPositions, [9, 8], [11, 8])).toBe(true);
  });
  test("can not move past other objects", () => {
    expect(privateFunctions.canMoveHorizontally(gameObjects.teams[0], allPositions, ballPosition, [1, 8])).toBe(false);
    expect(privateFunctions.canMoveHorizontally(gameObjects.teams[0], allPositions, [2, 8], [10, 8])).toBe(false);
  });
  test("can not move if the vertical axes differ", () => {
    expect(privateFunctions.canMoveHorizontally(gameObjects.teams[0], allPositions, ballPosition, [10, 2])).toBe(false);
    expect(privateFunctions.canMoveHorizontally(gameObjects.teams[0], allPositions, [10, 9], [12, 13])).toBe(false);
  });
});
describe("move diagonally", () => {
  test("can move diagonally", () => {
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [8, 5])).toBe(true);
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [20, 1])).toBe(true);
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [15, 12])).toBe(true);
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [11, 10])).toBe(true);
  });
  test("can not move past other objects", () => {
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [5, 2])).toBe(false);
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [17, 14])).toBe(false);
  });
  test("can not move", () => {
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [13, 5])).toBe(false);
    expect(privateFunctions.canMoveDiagonally(gameObjects, ballPosition, [12, 1])).toBe(false);
  });
});

describe("move player", () => {
  const playerPosition = [22, 7];
  test("can move", () => {
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [21, 10])).toBe(true);
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [20, 5])).toBe(true);
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [22, 4])).toBe(true);
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [25, 10])).toBe(true);
  });
  test("can not move", () => {
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [18, 7])).toBe(false);
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [22, 10])).toBe(false);
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [24, 9])).toBe(false);
    expect(privateFunctions.canMovePlayer(allPositions, playerPosition, [19, 3])).toBe(false);
  });
});

describe("move ball", () => {
  test("can move", () => {
    expect(privateFunctions.canMoveBall(gameObjects, [12, 12])).toBe(true);
  });
  test("can not move", () => {
    expect(privateFunctions.canMoveBall(gameObjects, [1, 9])).toBe(false);
    expect(privateFunctions.canMoveBall(gameObjects, [19, 9])).toBe(false);
  });
  test("can only score from the correct penalty area", () => {
    const testObjects = JSON.parse(JSON.stringify(gameObjects));
    expect(privateFunctions.canMoveBall(testObjects, [0, 9])).toBe(false);
    
    testObjects.ball.position = [3, 6];
    expect(privateFunctions.canMoveBall(testObjects, [0, 6])).toBe(true);

    testObjects.teams[0].moves = 0;
    testObjects.teams[1].moves = 5;
    testObjects.ball.position = [13, 6];
    expect(privateFunctions.canMoveBall(testObjects, [25, 6])).toBe(false);
    
    testObjects.ball.position = [23, 7];
    expect(privateFunctions.canMoveBall(testObjects, [25, 7])).toBe(true);
  });
  test("can not score if there are no moves left", () => {
    const testObjects = JSON.parse(JSON.stringify(gameObjects));
    
    testObjects.ball.position = [23, 7];
    expect(privateFunctions.canMoveBall(testObjects, [25, 7])).toBe(false);
    
    testObjects.ball.position = [23, 10];
    expect(privateFunctions.canMoveBall(testObjects, [25, 10])).toBe(false);
  });
});

describe("somewhere on the field", () => {
  test("outside", () => {
    for (let row of helpers.range(helpers.MIN_ROW, helpers.MAX_ROW)) {
      expect(privateFunctions.isOutsideOfTheField([helpers.MIN_COLUMN, row])).toBe(true);
      expect(privateFunctions.isOutsideOfTheField([helpers.MAX_COLUMN, row])).toBe(true);
    }
    for (let column of helpers.range(helpers.MIN_COLUMN, helpers.MAX_COLUMN)) {
      expect(privateFunctions.isOutsideOfTheField([column, helpers.MIN_ROW])).toBe(true);
      expect(privateFunctions.isOutsideOfTheField([column, helpers.MAX_ROW])).toBe(true);
    }
  });
  test("inside", () => {
    for (let column of helpers.range(1, 24)) {
      for (let row of helpers.range(1, 16)) {
        expect(privateFunctions.isOutsideOfTheField([column, row])).toBe(false);
        expect(privateFunctions.isOutsideOfTheField([column, row])).toBe(false);
      }
    }
  });
});

describe("goal", () => {
  test("goals", () => {
    for (let row of helpers.range(6, 11)) {
      expect(isALeftGoal([helpers.MIN_COLUMN, row])).toBe(true);
      expect(isARightGoal([helpers.MAX_COLUMN, row])).toBe(true);
    }
  });
  test("misses", () => {
    for (let row of helpers.range(0, 5)) {
      expect(isALeftGoal([helpers.MIN_COLUMN, row])).toBe(false);
      expect(isARightGoal([helpers.MAX_COLUMN, row])).toBe(false);
    }
    for (let row of helpers.range(12, 16)) {
      expect(isALeftGoal([helpers.MIN_COLUMN, row])).toBe(false);
      expect(isARightGoal([helpers.MAX_COLUMN, row])).toBe(false);
    }
  });
});

test("are same position", () => {
  expect(privateFunctions.areTheSamePosition([5, 7], [5, 7])).toBe(true);
  expect(privateFunctions.areTheSamePosition([5, 7], [7, 5])).toBe(false);
});

test("all player positions", () => {
  const testObjects = {
    ball: {
      position: [12, 9]
    },
    teams: [{
      players: [
        { number: 10, position: [12, 13] },
      ]
    },
    {
      players: [
        { number: 1,   position: [24, 9] },
        { number: 32,  position: [19, 3] },
      ]
    }]
  };
  expect(privateFunctions.allPlayerPositions(testObjects)).toEqual([[12, 13], [24, 9], [19, 3]]);
});
