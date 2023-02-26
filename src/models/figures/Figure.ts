import logo from '../../assets/black-bishop.png';
import { Colors } from '../Colors';
import { Cell } from '../Cell';

export enum FigureName {
	FIGURE = 'figure',
	KING = 'king',
	KNIGHT = 'knight',
	PAWN = 'pawn',
	QUEEN = 'queen',
	ROOK = 'rook',
	BISHOP = 'bishop',
}

export class Figure {
	color: Colors;

	logo: typeof logo | null;

	cell: Cell;

	name: FigureName;

	id: number;

	constructor(color: Colors, cell: Cell) {
		this.color = color;
		this.logo = null;
		this.cell = cell;
		this.cell.figure = this;
		this.name = FigureName.FIGURE;
		this.id = Math.random();
	}

	public canMove(target: Cell): boolean {
		if (target.figure?.color === this.color) return false;
		return target.figure?.name !== FigureName.KING;
	}

	public moveFigure(target: Cell) {

	}
}
