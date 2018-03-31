let players = [
	{ number: 14, position: [5, 5] },
	{ number: 4, position: [10, 10] },
	{ number: 6, position: [10, 5] },
	{ number: 8, position: [5, 10] },
	{ number: 10, position: [1, 4] },
];
let observer = null;

function emitChange() {
	observer(players);
}

export function observe(o) {
	if (observer) {
		throw new Error('Multiple observers not implemented.');
	}

	observer = o;
	emitChange();

	return () => {
		observer = null;
	}
}

export function canMovePiece(num, toX, toY) {
	const [x, y] = players.find(p => p.number == num).position;
	const dx = Math.abs(toX - x);
	const dy = Math.abs(toY - y);

	return dx < 4 && dy < 4;
}

export function movePiece(num, toX, toY) {
	players.find(p => p.number == num).position = [toX, toY];
	emitChange();
};
