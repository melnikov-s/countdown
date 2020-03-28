import { h, Fragment } from "preact";
import { LapStat } from "../model";
import TimerDisplay from "./TimerDisplay";
import classNames from "classnames";

import "./Laps.scss";
import { toTimerDigit } from "../utils";

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

	return (
		<Fragment>
			{thresholdElement}
			<ul className="cd-laps">
				{lapStats
					.map((lap, i) => (
						<li
							className={classNames("cd-lap", {
								"exceeds-threshold": lap.exceedsThreshold,
							})}
						>
							<label>[{toTimerDigit(i + 1)}]</label>
							<TimerDisplay value={lap.duration} />
						</li>
					))
					.reverse()}
			</ul>
		</Fragment>
	);
}
