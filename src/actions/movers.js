import deepEqual from "deep-equal";
import { ItemTypes } from "../components/ItemTypes";
import { difference } from "./helpers";

export default function moveCore(gameObjects, piece, toPosition) {
  if (piece.type === ItemTypes.BALL) {
    moveBall(gameObjects, toPosition);
  } else {
    movePlayer(gameObjects, piece, toPosition);
  }
}

function moveBall(gameObjects, toPosition) {
  gameObjects
    .ball
    .position = toPosition;
  const team = gameObjects.teams.find(team => team.moves > 0);
  team.moves--;
  console.log(`Team moves left: ${team.moves}`);
}
function movePlayer(gameObjects, piece, toPosition) {
  const team = gameObjects
    .teams
    .find(t => t.name === piece.team);

  const player = team
    .players
    .find(p => p.number === piece.number);

  const diff = difference(player.position, toPosition);

  if (player.moves >= diff && team.moves >= diff && !deepEqual(player.position, toPosition)) {
    console.log(`From: ${player.position} To:${toPosition}`);
    player.position = toPosition;
    player.moves -= diff;
    team.moves -= diff;
    console.log(`Team moves left: ${team.moves}   Player moves left: ${player.moves}`);
  }
}

export const privateFunctions = {
  moveBall,
  movePlayer
};