import { canDragBall, canDragPlayer } from "../../static/logic/dragCheckers";

test("can not drag player, team has moves but he doesn't", () => {
  expect(canDragPlayer(team, playerNumber)).toBe(false);
});

test("can not drag player, he has moves but his team doesn't", () => {
  expect(canDragPlayer(team, playerNumber)).toBe(false);
});

test("can drag player", () => {
  expect(canDragPlayer(team, playerNumber)).toBe(false);
});


