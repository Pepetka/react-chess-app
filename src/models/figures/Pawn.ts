import blackLogo from '../../assets/black-pawn.png';
import whiteLogo from '../../assets/white-pawn.png';
import { Figure, FigureName } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';

export class Pawn extends Figure {
	isFirst = true;

	constructor(color: Colors, cell: Cell) {
		super(color, cell);

		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureName.PAWN;
	}

	public canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;

		const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
		const directionFirst = this.cell.figure?.color === Colors.BLACK ? 2 : -2;

		if ((target.y === this.cell.y + direction
				|| (this.isFirst && (target.y === this.cell.y + directionFirst)))
			&& target.x === this.cell.x
			&& this.cell.board.getCell(target.x, target.y).isEmpty()) return true;

		if (target.y === this.cell.y + direction
			&& (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
			&& this.cell.isEnemy(target)) return true;

		return false;
	}

	public moveFigure(target: Cell) {
		super.moveFigure(target);
		this.isFirst = false;
	}
}
