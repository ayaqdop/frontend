let gameObjects = {
	ball: {
		position: [12, 9]
	},
	teams: [{
		name: "FC Barcelona",
		score: 0,
		moves: 0,
		players: [
			{ number: 14, position: [5, 5] },
			{ number: 4, position: [10, 10] },
			{ number: 6, position: [10, 5] },
			{ number: 8, position: [5, 10] },
			{ number: 10, position: [1, 4] },
		]
	},
	{
		name: "FC Bayern",
		score: 0,
		moves: 0,
		players: [
			{ number: 22, position: [23, 5] },
			{ number: 24, position: [22, 10] },
		]
	}]
};

let observer = null;

function emitChange() {
	observer(gameObjects);
}

export function observe(o) {
	if (observer) {
		throw new Error('Multiple observers not implemented.');
	}

	observer = o;
	emitChange();

	return () => {
		observer = null;
	};
};

export function canMovePlayer(player, toX, toY) {
	const [x, y] = gameObjects
		.teams.find(t => t.name == player.team)
		.players.find(p => p.number == player.number)
		.position;
	const dx = Math.abs(toX - x);
	const dy = Math.abs(toY - y);

	return dx < 4 && dy < 4;
};

export function movePiece(player, toX, toY) {
	gameObjects
		.teams.find(t => t.name == player.team)
		.players.find(p => p.number == player.number)
		.position = [toX, toY];
	emitChange();
};
