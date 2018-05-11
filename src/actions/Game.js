import canDragCore from "./dragCheckers";
import canMoveCore, { isALeftGoal, isARightGoal } from "./moveCheckers";
import moveCore from "./movers";

let gameObjects = null;
let initialObjects = null;
let observer = null;
let currentPlayer = null;

export default class Game {
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
	const ballPosition = gameObjects.ball.position;

	if (isALeftGoal(ballPosition)) {
		gameObjects = JSON.parse(JSON.stringify(initialObjects));
		gameObjects.teams[1].score++;
		initialObjects = JSON.parse(JSON.stringify(gameObjects));
		console.log("Gooooooooaaaal!");
		console.log(`The score is ${gameObjects.teams[0].name}: ${gameObjects.teams[0].score}, ${gameObjects.teams[1].name}: ${gameObjects.teams[1].score}`);
		changeTurn(gameObjects.teams[0].name);
	} else if (isARightGoal(ballPosition)) {
		gameObjects = JSON.parse(JSON.stringify(initialObjects));
		gameObjects.teams[0].score++;
		initialObjects = JSON.parse(JSON.stringify(gameObjects));
		gameObjects.teams[0].players[10].position[0] -= 2;
		gameObjects.teams[1].players[10].position[0] -= 2;
		gameObjects.teams[1].players[10].position[1]++;
		gameObjects.ball.position = [13, 8];
		console.log("Gooooooooaaaal!");
		console.log(`The score is ${gameObjects.teams[0].name}: ${gameObjects.teams[0].score}, ${gameObjects.teams[1].name}: ${gameObjects.teams[1].score}`);
		changeTurn(gameObjects.teams[1].name);
	}

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
	moveCore(gameObjects, piece, toPosition);
	emitChange();
};
