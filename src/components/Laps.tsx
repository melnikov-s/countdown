import { h, Fragment } from "preact";
import { memo } from "preact/compat";
import TimerDisplay from "./TimerDisplay";
import classNames from "classnames";

import "./Laps.scss";
import { toTimerDigit } from "../utils";

function Lap({
	duration,
	index,
	threshold = 0,
}: {
	duration: number;
	index: number;
	threshold?: number;
}): h.JSX.Element {
	return (
		<li
			className={classNames("cd-lap", {
				"exceeds-threshold": threshold > 0 && duration > threshold,
			})}
		>
			<label>[{toTimerDigit(index + 1)}]</label>
			<TimerDisplay value={duration} />
		</li>
	);
}

// Only the active lap needs to be updated each frame, we can use `memo` for the rest
const StaticLaps = memo(
	function ({
		laps,
		length,
		threshold,
	}: {
		laps: number[];
		length: number;
		threshold?: number;
	}) {
		return (
			<Fragment>
				{laps
					.map((lap, i) =>
						i < length - 1 ? (
							<Lap
								duration={laps[i + 1] - lap}
								index={i}
								threshold={threshold}
							/>
						) : null
					)
					.reverse()}
			</Fragment>
		);
	},
	(prevProps, nextProps) => {
		return prevProps.length === nextProps.length;
	}
);

export default function Laps({
	laps,
	threshold,
	compareTime,
}: {
	laps: number[];
	threshold?: number;
	compareTime: number;
}): h.JSX.Element {
	const thresholdElement = threshold ? (
		<div className="cd-laps-threshold">
			<label>Lap Threshold</label> <TimerDisplay value={threshold} />
		</div>
	) : null;

	const lastIndex = laps.length - 1;

	return (
		<Fragment>
			{thresholdElement}
			{laps.length > 0 && (
				<ul className="cd-laps">
					<Lap
						duration={compareTime - laps[lastIndex]}
						index={lastIndex}
						threshold={threshold}
					/>
					<StaticLaps laps={laps} length={laps.length} threshold={threshold} />
				</ul>
			)}
		</Fragment>
	);
}
