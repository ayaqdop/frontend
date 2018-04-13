
export function canDragBall(gameObjects) {
	// TODO
	return true;
};
export function canDragPlayer(team, player) {
	return team.moves > 0
		&& player.moves > 0;
};
