import { h } from "preact";
import { LapStat } from "../model";
import Laps from "./Laps";

import "./Report.scss";
import TimerDisplay from "./TimerDisplay";

export default function Report({
	lapStats,
	remaining,
	threshold = 0,
}: {
	lapStats: LapStat[];
	remaining: number;
	threshold?: number;
}): h.JSX.Element {
	return (
		<div className="cd-report">
			<h2>Results:</h2>
			<div class="cd-report-remaining">
				<label>Time Remaining:</label> <TimerDisplay value={remaining} />
			</div>
			<Laps lapStats={lapStats} threshold={threshold} />
		</div>
	);
}
