
export function canDragCore(gameObjects, teamName, playerNumber) {
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
	// TODO
	return true;
};
function canDragPlayer(team, player) {
	return team.moves > 0
		&& player.moves > 0;
};

exports.privateFunctions = {
  canDragBall,
  canDragPlayer
};
