import blackLogo from '../../assets/black-knight.png';
import whiteLogo from '../../assets/white-knight.png';
import { Figure, FigureName } from './Figure';
import { Colors } from '../Colors';
import { Cell } from '../Cell';

export class Knight extends Figure {
	constructor(color: Colors, cell: Cell) {
		super(color, cell);

		this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
		this.name = FigureName.KNIGHT;
	}

	public canMove(target: Cell): boolean {
		if (!super.canMove(target)) return false;

		const dx = Math.abs(this.cell.x - target.x);
		const dy = Math.abs(this.cell.y - target.y);

		if ((dx === 1 && dy === 2) || (dy === 1 && dx === 2)) return true;

		return false;
	}
}
