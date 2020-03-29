import { h } from "preact";
import Laps from "./Laps";
import TimerDisplay from "./TimerDisplay";

import "./Report.scss";

export default function Report({
	laps,
	compareTime,
	remaining,
	threshold = 0,
}: {
	laps: number[];
	remaining: number;
	compareTime: number;
	threshold?: number;
}): h.JSX.Element {
	return (
		<div className="cd-report">
			<h2>Results:</h2>
			<div class="cd-report-remaining">
				<label>Time Remaining:</label> <TimerDisplay value={remaining} />
			</div>
			<Laps laps={laps} threshold={threshold} compareTime={compareTime} />
		</div>
	);
}
