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
};

function canDragBall(gameObjects) {
	const [x, y] = gameObjects.ball.position;

	return gameObjects
		.teams
		.find(team => team
			.players
			.some(player => 
				Math.abs(player.position[1] - y) === 1
				|| Math.abs(player.position[0] - x) === 1)) != null;
};
function canDragPlayer(team, player) {
	return team.moves > 0
		&& player.moves > 0;
};

exports.privateFunctions = {
  canDragBall,
  canDragPlayer
};
