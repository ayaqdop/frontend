export default function canDragCore(gameObjects, teamName, playerNumber) {
  if (teamName && playerNumber) {
    const team = gameObjects
      .teams
      .find(t => t.name === teamName);

    const player = team
      .players
      .find(p => p.number === playerNumber);

    return canDragPlayer(team, player);
  } else {
    return canDragBall(gameObjects);
  }
}

function canDragBall(gameObjects) {
  const [x, y] = gameObjects.ball.position;

  return gameObjects
    .teams
    .some(team => team
      .players
      .some(player => 
      {
        const dX = Math.abs(player.position[0] - x);
        const dY = Math.abs(player.position[1] - y);
        return 0 <= dX && dX <= 1
						&& 0 <= dY && dY <= 1;
      }));
}
function canDragPlayer(team, player) {
  return team.moves > 0
		&& player.moves > 0;
}

export const privateFunctions = {
  canDragBall,
  canDragPlayer
};
