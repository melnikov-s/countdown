import { h, Fragment } from "preact";
import { memo } from "preact/compat";
import { LapStat } from "../model";
import TimerDisplay from "./TimerDisplay";
import classNames from "classnames";

import "./Laps.scss";
import { toTimerDigit } from "../utils";

function Lap({ lap, index }: { lap: LapStat; index: number }): h.JSX.Element {
	console.log(index);
	return (
		<li
			className={classNames("cd-lap", {
				"exceeds-threshold": lap.exceedsThreshold,
			})}
		>
			<label>[{toTimerDigit(index + 1)}]</label>
			<TimerDisplay value={lap.duration} />
		</li>
	);
}

// Only the active lap needs to be updated each frame, we can use `memo` for the rest
const StaticLaps = memo(
	function ({ lapStats, length }: { lapStats: LapStat[]; length: number }) {
		return (
			<Fragment>
				{lapStats
					.map((lap, i) =>
						i < length - 1 ? <Lap lap={lap} index={i} /> : null
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
	lapStats,
	threshold,
}: {
	lapStats: LapStat[];
	threshold?: number;
}): h.JSX.Element {
	const thresholdElement = threshold ? (
		<div className="cd-laps-threshold">
			<label>Lap Threshold</label> <TimerDisplay value={threshold} />
		</div>
	) : null;

	const lastIndex = lapStats.length - 1;

	return (
		<Fragment>
			{thresholdElement}
			{lapStats.length > 0 && (
				<ul className="cd-laps">
					<Lap lap={lapStats[lastIndex]} index={lastIndex} />
					<StaticLaps lapStats={lapStats} length={lapStats.length} />
				</ul>
			)}
		</Fragment>
	);
}
