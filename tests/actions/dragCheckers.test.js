import canDragCore, { privateFunctions } from "../../src/actions/dragCheckers";

test("can not drag player, team has moves but he doesn't", () => {
  const team = {
    name: "FC Barcelona",
    score: 0,
    moves: 5,
    players: [
      { number: 1,  moves: 0, position: [1, 8] },
      { number: 18, moves: 3, position: [6, 3] },
      { number: 23, moves: 2, position: [4, 6] },
      { number: 3,  moves: 1, position: [4, 11] },
    ]
  };
  const player = team.players[0];
  expect(privateFunctions.canDragPlayer(team, player)).toBe(false);
});

test("can not drag player, he has moves but his team doesn't", () => {
  const team = {
    name: "FC Barcelona",
    score: 0,
    moves: 0,
    players: [
      { number: 1,  moves: 0, position: [1, 8] },
      { number: 18, moves: 3, position: [6, 3] },
      { number: 23, moves: 2, position: [4, 6] },
      { number: 3,  moves: 1, position: [4, 11] },
    ]
  };
  const player = team.players[1];
  expect(privateFunctions.canDragPlayer(team, player)).toBe(false);
});

test("can drag player", () => {
  const team = {
    name: "FC Barcelona",
    score: 0,
    moves: 3,
    players: [
      { number: 1,  moves: 0, position: [1, 8] },
      { number: 18, moves: 3, position: [6, 3] },
      { number: 23, moves: 2, position: [4, 6] },
      { number: 3,  moves: 1, position: [4, 11] },
    ]
  };
  const player = team.players[2];
  expect(privateFunctions.canDragPlayer(team, player)).toBe(true);
});

describe("can drag ball", () => {
  test("can drag ball player vertically nearby", () => {
    const up = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [12, 8] },
        ]}]
    };
    expect(privateFunctions.canDragBall(up)).toBe(true);
    const down = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [12, 10] },
        ]}]
    };
    expect(privateFunctions.canDragBall(down)).toBe(true);
  });
  test("can drag ball player horizontally nearby", () => {
    const right = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [11, 9] },
        ]}]
    };
    expect(privateFunctions.canDragBall(right)).toBe(true);
    const left = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [13, 9] },
        ]}]
    };
    expect(privateFunctions.canDragBall(left)).toBe(true);
  });
  test("can drag ball player diagonally nearby", () => {
    const upperRight = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [13, 8] },
        ]}]
    };
    expect(privateFunctions.canDragBall(upperRight)).toBe(true);
    const upperLeft = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [11, 8] },
        ]}]
    };
    expect(privateFunctions.canDragBall(upperLeft)).toBe(true);
    const downRight = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [13, 10] },
        ]}]
    };
    expect(privateFunctions.canDragBall(downRight)).toBe(true);
    const downLeft = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 18, moves: 3, position: [11, 10] },
        ]}]
    };
    expect(privateFunctions.canDragBall(downLeft)).toBe(true);
  });

  test("can not drag ball", () => {
    const gameObjects = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 1,  moves: 0, position: [1, 7] },
          { number: 23, moves: 2, position: [4, 6] },
          { number: 3,  moves: 1, position: [4, 14] },
        ]}]
    };
    expect(privateFunctions.canDragBall(gameObjects)).toBe(false);
  });
  test("can not drag ball when every direction is blocked", () => {
    const gameObjects = {
      "ball": {
        position: [12, 9]
      },
      teams: [{
        players: [
          { number: 1,  moves: 0, position: [11, 8] },
          { number: 23, moves: 2, position: [11, 9] },
          { number: 3,  moves: 1, position: [11, 10] },
          { number: 12, moves: 0, position: [12, 8] },
          { number: 2,  moves: 2, position: [12, 10] },
          { number: 31, moves: 1, position: [13, 8] },
          { number: 11, moves: 0, position: [13, 9] },
          { number: 22, moves: 2, position: [13, 10] },
        ]}]
    };
    // TODO
    //expect(privateFunctions.canDragBall(gameObjects)).toBe(false);
  });
});
