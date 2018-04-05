import openSocket from "socket.io-client";
import { range } from "./Helpers";
import { ItemTypes } from "../components/ItemTypes";
const equal = require("deep-equal");

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
			{ number: 3,  position: [4, 11] },
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
			{ number: 32, position: [19, 3] },
			{ number: 5,  position: [22, 7] },
			{ number: 17, position: [22, 10] },
			{ number: 27, position: [19, 14] },
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
let socket = openSocket("http://" + document.domain + ":" + location.port);

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
					c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
			}
	}
	return "";
}

socket.emit("uuid");
socket.on("generateUuid", (newUuid) => {
	console.log("New ID ", newUuid);
	if (!getCookie("uuid")) {
		document.cookie = "uuid=" + newUuid;
	}
});

socket.on("client", (msg) => {
	console.log(JSON.stringify(msg.id));
	if (msg.id !== getCookie("uuid")
		&& !equal(gameObjects, msg.game)) {
		gameObjects = msg.game;
		emitChange();
	}
});

function emitChange() {
	observer(gameObjects);
	socket.emit("server", { id: getCookie("uuid"), game: gameObjects });
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

export function canMove(piece, toX, toY) {
  if (piece.type === ItemTypes.BALL) {
		return canMoveBall(toX, toY);
	}	else {
		return canMovePlayer(piece, toX, toY);
	}
};

export function move(piece, toX, toY) {
	if (piece.type === ItemTypes.BALL) {
		moveBall(toX, toY);
	} else {
		movePlayer(piece, toX, toY);
	}
	emitChange();
};

function canMovePlayer(player, toX, toY) {
	const [x, y] = gameObjects
		.teams.find(t => t.name == player.team)
		.players.find(p => p.number == player.number)
		.position;
	const dx = Math.abs(toX - x);
	const dy = Math.abs(toY - y);

	return dx < 4 && dy < 4;
};
function movePlayer(player, toX, toY) {
	gameObjects
		.teams.find(t => t.name == player.team)
		.players.find(p => p.number == player.number)
		.position = [toX, toY];
};

function canMoveBall(toX, toY) {
	const [x, y] = gameObjects
		.ball
		.position;

	const positions = gameObjects
		.teams
		.reduce((a, b) => a.players.concat(b.players))
		.map(p => p.position);
	
	return (toX === x && range(y, toY).every(tempY => !positions.some(p => p[0] === toX && p[1] === tempY)))
		|| (toY === y && range(x, toX).every(tempX => !positions.some(p => p[0] === tempX && p[1] === toY)))
		|| (Math.abs(toY - y) === Math.abs(toX - x));
};
function moveBall(toX, toY) {
	gameObjects
		.ball
		.position = [toX, toY];
};
