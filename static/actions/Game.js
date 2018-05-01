import openSocket from "socket.io-client";
import deepEqual from "deep-equal";
import canDragCore from "./dragCheckers";
import canMoveCore, { isALeftGoal, isARightGoal } from "./moveCheckers";
import { difference } from "./helpers";
import { ItemTypes } from "../components/ItemTypes";

let gameObjects = null;
let initialObjects = null;
let observer = null;

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

export function observe(o, objects) {
	if (observer) {
		throw new Error('Multiple observers not implemented.');
	}

	observer = o;
	gameObjects = objects;
	initialObjects = JSON.parse(JSON.stringify(gameObjects));
	changeTurn(gameObjects.teams[0].name);
	
	emitChange();

	return () => {
		observer = null;
	};
};

function changeTurn(teamName) {
	console.log(`Now it is the turn of ${teamName}`);
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
		console.log(`Team moves left: ${team.moves}   Player moves left: ${player.moves}`);
	}
	
	if (team.moves === 0) {
		changeTurn(gameObjects.teams.find(t => t.name !== piece.team).name);
	}
};
function moveBall(toPosition) {
	gameObjects
		.ball
		.position = toPosition;

	if (isALeftGoal(toPosition)) {
		console.log("Gooooooooaaaal!");
		gameObjects = JSON.parse(JSON.stringify(initialObjects));
		changeTurn(gameObjects.teams[0].name);
	} else if (isARightGoal(toPosition)) {
		console.log("Gooooooooaaaal!");
		gameObjects = JSON.parse(JSON.stringify(initialObjects));
		gameObjects.ball.position = [13, 8];
		changeTurn(gameObjects.teams[1].name);
	}
};
