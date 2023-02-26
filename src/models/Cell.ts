import { Colors } from './Colors';
import { Figure } from './figures/Figure';
import { Board } from './Board';

export class Cell {
	readonly x: number;

	readonly y: number;

	readonly color: Colors;

	figure: Figure | null;

	board: Board;

	available: boolean;

	id: string;

	constructor(
		board: Board,
		x: number,
		y: number,
		color: Colors,
		figure: Figure | null,
	) {
		this.board = board;
		this.x = x;
		this.y = y;
		this.color = color;
		this.figure = figure;
		this.available = false;
		this.id = String(x) + String(y);
	}

	public isEmpty(): boolean {
		return this.figure === null;
	}

	public isEnemy(target: Cell): boolean {
		if (target.figure) return target.figure?.color !== this.figure?.color;

		return false;
	}

	public isEmptyVertical(target: Cell): boolean {
		if (this.x !== target.x) return false;

		const min = Math.min(this.y, target.y);
		const max = Math.max(this.y, target.y);

		for (let y = min + 1; y < max; y++) {
			if (!this.board.getCell(this.x, y).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	public isEmptyHorizontal(target: Cell): boolean {
		if (this.y !== target.y) return false;

		const min = Math.min(this.x, target.x);
		const max = Math.max(this.x, target.x);

		for (let x = min + 1; x < max; x++) {
			if (!this.board.getCell(x, this.y).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	public isEmptyDiagonal(target: Cell): boolean {
		if (Math.abs(this.y - target.y) !== Math.abs(this.x - target.x)) return false;

		const dx = this.x < target.x ? 1 : -1;
		const dy = this.y < target.y ? 1 : -1;

		for (let i = 1; i < Math.abs(this.y - target.y); i++) {
			if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
				return false;
			}
		}

		return true;
	}

	public setFigure(figure: Figure) {
		this.figure = figure;
		this.figure.cell = this;
	}

	public addLostFigure(figure: Figure) {
		if (figure.color === Colors.BLACK) {
			this.board.lostBlack.push(figure);
		} else {
			this.board.lostWhite.push(figure);
		}
	}

	public moveFigure(target: Cell) {
		if (this.figure && this.figure?.canMove(target)) {
			this.figure.moveFigure(target);

			if (target.figure) this.addLostFigure(target.figure);

			target.setFigure(this.figure);
			this.figure = null;
		}
	}
}
