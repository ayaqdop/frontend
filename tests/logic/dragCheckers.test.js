import { canDrag, privateFunctions } from "../../static/logic/dragCheckers";

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
