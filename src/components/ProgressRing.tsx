import { h } from "preact";

import "./ProgressRing.scss";

// adapted from https://css-tricks.com/building-progress-ring-quickly/
export default function ProgressRing(props: {
	radius: number;
	stroke: number;
	progress: number;
}): h.JSX.Element {
	const { radius, stroke, progress } = props;

	const normalizedRadius = radius - stroke * 2;
	const circumference = normalizedRadius * 2 * Math.PI;

	const strokeDashoffset = circumference - (progress / 100) * circumference;

	return (
		<svg height={radius * 2} width={radius * 2}>
			<circle
				className="cd-backing-circle"
				fill="transparent"
				stroke-width={Math.max(stroke / 2, 1)}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
			<circle
				className="cd-loading-circle"
				fill="transparent"
				stroke-dasharray={circumference + " " + circumference}
				style={{ strokeDashoffset }}
				stroke-width={stroke}
				r={normalizedRadius}
				cx={radius}
				cy={radius}
			/>
		</svg>
	);
}
