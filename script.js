import Grid from './Grid.js';
import Tile from './Tile.js';

const gameBoard = document.getElementById('gameBoard');

const grid = new Grid(gameBoard);

// --- DEV ---
// console.log(grid.randomEmptyCell());
// -----------

grid.randomEmptyCell().tile = new Tile(gameBoard);
grid.randomEmptyCell().tile = new Tile(gameBoard);

// --- DEV ---
// console.log(grid.cellsByColumn);
// -----------

const setupInput = () => {
	window.addEventListener('keydown', handleInput, {once: true});
}

const handleInput = (event) => {
	// --- DEV ---
	// console.log(event.key);
	// -----------

	switch (event.key) {
		case 'ArrowUp': moveUp(); break;
		case 'ArrowDown': moveDown(); break;
		case 'ArrowLeft': moveLeft(); break;
		case 'ArrowRight': moveRight(); break;
		default: setupInput(); return;
	}

	setupInput();
}

setupInput();

const moveUp = () => {
	slideTiles(grid.cellsByColumn);
}

const moveDown = () => {
	slideTiles(grid.cellsByColumn);
}

const moveLeft = () => {
	slideTiles(grid.cellsByRow);
}

const moveRight = () => {
	slideTiles(grid.cellsByRow);
}
