import {
	memo, useCallback, useEffect, useRef, useState,
} from 'react';
import { Player } from '../../models/Player';
import { Colors } from '../../models/Colors';

interface TimerProps {
	currentPlayer: Player | null
	restart: () => void
}

export const Timer = memo(({ currentPlayer, restart }: TimerProps) => {
	const [whiteTime, setWhiteTime] = useState(300);
	const [blackTime, setBlackTime] = useState(300);
	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const decrWhiteTimer = useCallback(() => {
		setWhiteTime((prev) => prev - 1);
	}, []);

	const decrBlackTimer = useCallback(() => {
		setBlackTime((prev) => prev - 1);
	}, []);

	const startTimer = useCallback(() => {
		if (timerRef.current) clearInterval(timerRef.current);

		const callback = currentPlayer?.color === Colors.WHITE ? decrWhiteTimer : decrBlackTimer;

		timerRef.current = setInterval(callback, 1000);
	}, [currentPlayer?.color, decrBlackTimer, decrWhiteTimer]);

	const onRestart = () => {
		restart()
		setWhiteTime(300)
		setBlackTime(300)
	}

	useEffect(() => {
		startTimer();
	}, [currentPlayer, startTimer]);

	return (
		<div>
			<div>
				<button type="button" onClick={onRestart}>Restart game</button>
			</div>
			<h2>
				White time -
				{' '}
				{whiteTime}
			</h2>
			<h2>
				Black time -
				{' '}
				{blackTime}
			</h2>
		</div>
	);
});
