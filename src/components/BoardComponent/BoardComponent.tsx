import {
	Fragment, useCallback, useEffect, useState,
} from 'react';
import { Board } from '../../models/Board';
import { CellComponent } from '../../components/CellComponent/CellComponent';
import { Cell } from '../../models/Cell';
import { Player } from '../../models/Player';

interface BoardComponentProps {
	board: Board
	setBoard: (board: Board) => void
	currentPlayer: Player | null
	swapPlayer: () => void
}

export const BoardComponent = ({
	board, setBoard, swapPlayer, currentPlayer,
}: BoardComponentProps) => {
	const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

	const onSelectCell = useCallback((cell: Cell) => {
		if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
			selectedCell.moveFigure(cell);
			setSelectedCell(null);
			swapPlayer();
		} else if (cell.figure?.color === currentPlayer?.color) {
			setSelectedCell(cell);
		}
	}, [currentPlayer?.color, selectedCell, swapPlayer]);

	const onUpdateBoard = useCallback(() => {
		setBoard(board.getCopyBoard());
	}, [board, setBoard]);

	const highlightCells = useCallback(() => {
		board.highlightCells(selectedCell);
		onUpdateBoard();
	}, [board, onUpdateBoard, selectedCell]);

	useEffect(() => {
		highlightCells();
		// eslint-disable-next-line
	}, [selectedCell]);

	return (
		<div className="board">
			{board.cells.map((row, index) => (
				<Fragment key={index}>
					{row.map((cell) => (
						<CellComponent
							selected={selectedCell?.x === cell.x && selectedCell?.y === cell.y}
							key={cell.id}
							cell={cell}
							onClick={onSelectCell}
						/>
					))}
				</Fragment>
			))}
		</div>
	);
};
