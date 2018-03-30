let piecePosition = [1, 1];
let observer = null;

function emitChange() {
	observer(piecePosition);
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

export function canMovePiece(toX, toY) {
	const [x, y] = piecePosition;
	const dx = toX - x;
	const dy = toY - y;

	return dx < 4 && dy < 4;
}

export function movePiece(toX, toY) {
	piecePosition = [toX, toY];
	emitChange();
};
