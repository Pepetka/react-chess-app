import { Cell } from '../../models/Cell';

interface CellComponentProps {
	cell: Cell
	selected: boolean
	onClick: (cell: Cell) => void
}

export const CellComponent = ({ cell, selected, onClick }: CellComponentProps) => {
	const classes = [
		'cell',
		cell.color,
		selected && cell.figure ? 'selected' : '',
		cell.available && cell.figure ? 'attacked' : '',
	].join(' ');

	return (
		<div
			className={classes}
			onClick={() => onClick(cell)}
		>
			{cell.available && !cell.figure && <div className="available" />}
			{cell.figure?.logo && <img className="figure" src={cell.figure?.logo} alt={cell.figure.name} />}
		</div>
	);
};
