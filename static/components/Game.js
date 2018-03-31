let gameObjects = {
	ball: {
		position: [12, 9]
	},
	teams: [{
		name: "FC Barcelona",
		score: 0,
		moves: 0,
		players: [
			{ number: 1,  position: [1, 8] },
			{ number: 18, position: [6, 3] },
			{ number: 23, position: [4, 6] },
			{ number: 3,  position: [4, 10] },
			{ number: 20, position: [6, 14] },
			{ number: 8,  position: [10, 5] },
			{ number: 5,  position: [8, 8] },
			{ number: 4,  position: [10, 11] },
			{ number: 14, position: [12, 4] },
			{ number: 9,  position: [12, 8] },
			{ number: 10, position: [12, 12] },
		]
	},
	{
		name: "FC Bayern",
		score: 0,
		moves: 0,
		players: [
			{ number: 1,  position: [24, 9] },
			{ number: 32, position: [19, 14] },
			{ number: 5,  position: [22, 7] },
			{ number: 17, position: [22, 10] },
			{ number: 27, position: [19, 3] },
			{ number: 25, position: [16, 4] },
			{ number: 6,  position: [18, 9] },
			{ number: 11, position: [16, 12] },
			{ number: 10, position: [13, 13] },
			{ number: 9,  position: [15, 8] },
			{ number: 7,  position: [13, 3] },
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
