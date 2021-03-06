const GRID_SIZE = 4;
const CELL_SIZE = '20vmin';
const CELL_GAP = '2vmin';

export default class Grid {
	#cells;

	constructor(gridElement) {
		gridElement.style.setProperty('--gridSize', GRID_SIZE);
		gridElement.style.setProperty('--cellSize', CELL_SIZE);
		gridElement.style.setProperty('--cellGap', CELL_GAP);

		this.#cells = createCellElements(gridElement).map(
			(cellElement, index) => {
				return new Cell(
					cellElement,
					index % GRID_SIZE,
					Math.floor(index / GRID_SIZE)
				);
			}
		);
	}

	get cells() { return this.#cells; }

	get cellsByRow() {
		return this.#cells.reduce((row, cell) => {
			row[cell.y] = row[cell.y] || [];
			row[cell.y][cell.x] = cell;
			return row;
		}, []);
	}

	get cellsByColumn() {
		return this.#cells.reduce((column, cell) => {
			column[cell.x] = column[cell.x] || [];
			column[cell.x][cell.y] = cell;
			return column;
		}, []);
	}

	get #emptyCells() {
		return this.#cells.filter(cell => cell.tile == null);
	}

	randomEmptyCell() {
		const randomIndex = Math.floor(Math.random() * this.#emptyCells.length);
		return this.#emptyCells[randomIndex];
	}
}

class Cell {
	#cellElement; #x; #y; #tile; #mergeTile;

	constructor(cellElement, x, y) {
		this.#cellElement = cellElement;
		this.#x = x;
		this.#y = y;
	}

	get x() { return this.#x; }
	get y() { return this.#y; }
	get tile() { return this.#tile; }
	get mergeTile() { return this.#mergeTile; }

	set tile(value) {
		this.#tile = value;
		if (value == null) return;
		this.#tile.x = this.#x;
		this.#tile.y = this.#y;
	}

	set mergeTile(value) {
		this.#mergeTile = value;
		if (value == null) return;
		this.#mergeTile.x = this.#x;
		this.#mergeTile.y = this.#y;
	}

	canAccept(tile) {
		return (
			this.tile == null ||
			(this.mergeTile == null && this.tile.value === tile.value)
		);
	}

	mergeTiles() {
		if (this.tile == null || this.mergeTile == null) return;
		this.tile.value = this.tile.value + this.mergeTile.value;
		this.mergeTile.remove();
		this.mergeTile = null;
	}
}

const createCellElements = (gridElement) => {
	const cells = [];

	for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cells.push(cell);
		gridElement.append(cell);
	}

	return cells;
}
