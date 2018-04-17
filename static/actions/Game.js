import openSocket from "socket.io-client";
import deepEqual from "deep-equal";
import canDragCore from "./dragCheckers";
import canMoveCore from "./moveCheckers";
import { difference } from "./helpers";
import { ItemTypes } from "../components/ItemTypes";

let gameObjects = {
	ball: {
		position: [12, 9]
	},
	teams: [{
		name: "FC Barcelona",
		score: 0,
		moves: 0,
		players: [
			{ number: 1,  moves: 0, position: [1, 8] },
			{ number: 18, moves: 0, position: [6, 3] },
			{ number: 23, moves: 0, position: [4, 6] },
			{ number: 3,  moves: 0, position: [4, 11] },
			{ number: 20, moves: 0, position: [6, 14] },
			{ number: 8,  moves: 0, position: [10, 5] },
			{ number: 5,  moves: 0, position: [8, 8] },
			{ number: 4,  moves: 0, position: [10, 12] },
			{ number: 14, moves: 0, position: [12, 4] },
			{ number: 9,  moves: 0, position: [12, 8] },
			{ number: 10, moves: 0, position: [12, 13] },
		]
	},
	{
		name: "FC Bayern",
		score: 0,
		moves: 0,
		players: [
			{ number: 1,   moves: 0, position: [24, 9] },
			{ number: 32,  moves: 0, position: [19, 3] },
			{ number: 5,   moves: 0, position: [22, 7] },
			{ number: 17,  moves: 0, position: [22, 10] },
			{ number: 27,  moves: 0, position: [19, 14] },
			{ number: 25,  moves: 0, position: [16, 4] },
			{ number: 6,   moves: 0, position: [18, 9] },
			{ number: 11,  moves: 0, position: [16, 13] },
			{ number: 10,  moves: 0, position: [13, 14] },
			{ number: 9,   moves: 0, position: [15, 8] },
			{ number: 7,   moves: 0, position: [13, 3] },
		]
	}]
};

const initialObjects = JSON.parse(JSON.stringify(gameObjects));

let observer = null;
// let socket = openSocket("http://localhost:4200");
let socket = openSocket("http://ayaqdop-backend.herokuapp.com");

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
	if (msg.id !== getCookie("uuid")
		&& !deepEqual(gameObjects, msg.game)) {
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

function changeTurn(teamName) {
	const currentTeam = gameObjects
		.teams
		.find(t => t.name === teamName);
	currentTeam.moves = 5;
	currentTeam.players.forEach(p => p.moves = 3);

	const otherTeam = gameObjects
		.teams
		.find(t => t.name !== teamName);
		otherTeam.moves = 0;
		otherTeam.players.forEach(p => p.moves = 0);
}

export function canMove(piece, toPosition) {
	return canMoveCore(gameObjects, piece, toPosition);
};
export function canDrag(teamName, playerNumber) {
	return canDragCore(gameObjects, teamName, playerNumber);
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
	
	const diff = difference(player.position, toPosition);
		
	if (player.moves >= diff && team.moves >= diff && !deepEqual(player.position, toPosition)) {
		console.log(`From: ${player.position} To:${toPosition}`);
		player.position = toPosition;
		player.moves -= diff;
		team.moves -= diff;
	}
	
	if (team.moves === 0) {
		changeTurn(gameObjects.teams.find(t => t.name !== piece.team).name);
	}
};
function moveBall(toPosition) {
	gameObjects
		.ball
		.position = toPosition;

	if (isAGoal(toPosition)) {
		console.log("Gooooooooaaaal!");
		gameObjects = JSON.parse(JSON.stringify(initialObjects));
		changeTurn(gameObjects.teams.find(t => t.moves === 0).name);
	}
};

function isAGoal(toPosition) {
	const [toX, toY] = toPosition;

	return (5 < toY && toY < 12)
		&& (toX === 0 || toX === 25);
}

