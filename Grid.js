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

		// --- DEV ---
		// console.log(this.#cells);
		// -----------
	}

	get cellsByColumn() {
		return this.#cells.reduce((cellGrid, cell) => {
			cellGrid[cell.x] = cellGrid[cell.x] || [];
			cellGrid[cell.x][cell.y] = cell;
			return cellGrid;
		}, [])
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
	#cellElement; #x; #y; #tile;

	constructor(cellElement, x, y) {
		this.#cellElement = cellElement;
		this.#x = x;
		this.#y = y;
	}

	get x() { return this.#x; }
	get y() { return this.#y; }
	get tile() { return this.#tile; }

	set tile(value) {
		this.#tile = value;
		if (value == null) return;
		this.#tile.x = this.#x;
		this.#tile.y = this.#y;
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