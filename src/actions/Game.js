import deepEqual from "deep-equal";
import canDragCore from "./dragCheckers";
import canMoveCore, { isALeftGoal, isARightGoal } from "./moveCheckers";
import { difference } from "./helpers";
import { ItemTypes } from "../components/ItemTypes";

let gameObjects = null;
let initialObjects = null;
let observer = null;
let currentPlayer = null;

export class Game {
	constructor(handler, objects) {
		observer = handler;
		gameObjects = objects;
		initialObjects = JSON.parse(JSON.stringify(gameObjects));
		changeTurn(gameObjects.teams[0].name);
	
		emitChange();
	}
	set gameObjects(newObjects) {
		gameObjects = newObjects;
	}
};

function changeTurn(teamName) {
	console.log(`Now it is the turn of ${teamName}`);
	const currentTeam = gameObjects
		.teams
		.find(t => t.name === teamName);
	currentTeam.moves = 5;
	currentTeam.players.forEach(p => p.moves = 3);
	currentPlayer = currentTeam.name; 

	const otherTeam = gameObjects
		.teams
		.find(t => t.name !== teamName);
		otherTeam.moves = 0;
		otherTeam.players.forEach(p => p.moves = 0);
}

function emitChange() {
	const currentTeam = gameObjects.teams.find(team => team.name === currentPlayer);
	if (currentTeam && currentTeam.moves === 0) {
		changeTurn(gameObjects.teams.find(t => t.name !== currentTeam.name).name);
	}

	observer(gameObjects);
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
};
function moveBall(toPosition) {
	gameObjects
		.ball
		.position = toPosition;
	const team = gameObjects.teams.find(team => team.moves > 0);
	team.moves--;
	console.log(`Team moves left: ${team.moves}`);

	if (isALeftGoal(toPosition)) {
		console.log("Gooooooooaaaal!");
		gameObjects = JSON.parse(JSON.stringify(initialObjects));
		changeTurn(gameObjects.teams[0].name);
	} else if (isARightGoal(toPosition)) {
		console.log("Gooooooooaaaal!");
		gameObjects = JSON.parse(JSON.stringify(initialObjects));
		gameObjects.teams[0].players[10].position[0] -= 2;
		gameObjects.teams[1].players[10].position[0] -= 2;
		gameObjects.teams[1].players[10].position[1]++;
		gameObjects.ball.position = [13, 8];
		changeTurn(gameObjects.teams[1].name);
	}
};
