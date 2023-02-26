import {
	memo, useCallback, useEffect, useState,
} from 'react';
import { BoardComponent } from './components/BoardComponent/BoardComponent';
import { Board } from './models/Board';
import './App.scss';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import { LostFigures } from './components/LostFigures/LostFigures';
import { Timer } from './components/Timer/Timer';

export const App = memo(() => {
	const [board, setBoard] = useState<Board>(new Board());
	const [whitePlayer] = useState(new Player(Colors.WHITE));
	const [blackPlayer] = useState(new Player(Colors.BLACK));
	const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

	const restart = useCallback(() => {
		const newBoard = new Board();
		newBoard.initCells();
		newBoard.addFigures();
		setCurrentPlayer(whitePlayer);
		setBoard(newBoard);
	}, [whitePlayer]);

	const swapPlayer = useCallback(() => {
		setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
	}, [blackPlayer, currentPlayer?.color, whitePlayer]);

	useEffect(restart, [restart]);

	return (
		<div className="App">
			<h2>
				Current player -
				{' '}
				<i>{currentPlayer?.color}</i>
			</h2>
			<div className="game">
				<LostFigures player={Colors.WHITE} figures={board.lostWhite} />
				<BoardComponent
					board={board}
					setBoard={setBoard}
					currentPlayer={currentPlayer}
					swapPlayer={swapPlayer}
				/>
				<LostFigures player={Colors.BLACK} figures={board.lostBlack} />
			</div>
			<Timer currentPlayer={currentPlayer} restart={restart} />
		</div>
	);
});
