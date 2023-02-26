import { Colors } from '../../models/Colors';
import { Figure } from '../../models/figures/Figure';

interface LostFiguresProps {
	player: Colors
	figures: Array<Figure>
}

export const LostFigures = ({ player, figures }: LostFiguresProps) => (
	<div className="figures">
		<h3>{player}</h3>
		{figures.map((figure) => (
			<div className="figuresItem" key={figure.id}>
				{figure.name}
				{figure.logo && <img src={figure.logo} alt={figure.name} />}
			</div>
		))}
	</div>
);
