let piecePosition = [1, 7];
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

	return (
		(Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
		(Math.abs(dx) === 1 && Math.abs(dy) === 2)
	);
}

export function movePiece(toX, toY) {
	piecePosition = [toX, toY];
	emitChange();
}