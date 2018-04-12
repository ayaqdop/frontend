import openSocket from "socket.io-client";
import { canMoveBall, canMovePlayer } from "./moveCheckers"
import { ItemTypes } from "../components/ItemTypes";
import { equal } from "deep-equal";

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

	changeTurn(gameObjects.teams[0].name);

	return () => {
		observer = null;
	};
};

export function canDragBall() {
	// TODO
	return true;
};
export function canDrag(teamName, playerNumber) {
	const team = gameObjects
	.teams
	.find(t => t.name === teamName);

	return team.moves > 0
		&& team
			.players
			.find(p => p.number === playerNumber)
			.moves > 0;
};

function changeTurn(teamName) {
	const team = gameObjects
		.teams
		.find(t => t.name === teamName);

	team.moves = 5;
	team.players.forEach(p => p.moves = 3);	
}

export function canMove(piece, toPosition) {
	let allPositions = gameObjects
		.teams
		.reduce((a, b) => a.players.concat(b.players))
		.map(p => p.position);

		allPositions.push(gameObjects.ball.position);

  if (piece.type === ItemTypes.BALL) {
		return canMoveBall(allPositions, gameObjects.ball.position, toPosition);
	}	else {
		const player = gameObjects
			.teams.find(t => t.name === piece.team)
			.players.find(p => p.number === piece.number);
			
		return player.moves > 0 && canMovePlayer(allPositions, player.position, toPosition);
	}
};

export function move(piece, toPosition) {
	if (piece.type === ItemTypes.BALL) {
		moveBall(toPosition);
	} else {
		movePlayer(piece, toPosition);
	}
	emitChange();
};

function movePlayer(piece, toPosition) {
	const team = gameObjects
		.teams
		.find(t => t.name === piece.team);
	
	const player = team
		.players
		.find(p => p.number === piece.number);

	if (player.moves) {
		player.position = toPosition;
		player.moves--;
		team.moves--;
	}
	
	if (!team.moves) {
		changeTurn(gameObjects.teams.find(t => t.name !== piece.team).name);
	}
};

function moveBall(toPosition) {
	gameObjects
		.ball
		.position = toPosition;
};
