import { h, Fragment } from "preact";
import { useState } from "preact/hooks";

import "./App.scss";
import CountDownModel, { TimerStates } from "../model";
import ProgressRing from "./ProgressRing";
import TimerInput from "./TimerInput";
import TimerDisplay from "./TimerDisplay";
import Laps from "./Laps";
import Report from "./Report";
import TimerButton from "./TimerButton";

export default function App({
	model,
}: {
	model: CountDownModel;
}): h.JSX.Element {
	const [duration, setDuration] = useState(0);
	const [threshold, setThreshold] = useState(0);

	let contentElement;

	if (model.timerState === TimerStates.initial) {
		contentElement = (
			<Fragment>
				<div class="cd-timer-section">
					<div class="cd-timer-initial">
						<TimerInput
							id="timer"
							label="timer"
							value={duration}
							onValueChange={setDuration}
						/>
						<TimerInput
							id="lap_threshold"
							label="lap threshold"
							value={threshold}
							onValueChange={setThreshold}
						/>
					</div>
					<ProgressRing stroke={4} radius={120} progress={100} />
				</div>
				<div class="cd-controls-section">
					<TimerButton
						label="start"
						disabled={duration === 0}
						onClick={(): void => model.start(duration, threshold)}
					/>
				</div>
			</Fragment>
		);
	} else if (model.timerState === TimerStates.finished) {
		contentElement = (
			<Fragment>
				<TimerButton label="restart" onClick={(): void => model.restart()} />
				<Report
					remaining={model.timeRemaining}
					laps={model.laps}
					threshold={model.lapThreshold}
					compareTime={model.compareTime}
				/>
			</Fragment>
		);
	} else {
		contentElement = (
			<Fragment>
				<div class="cd-timer-section">
					<div class="cd-timer">
						<TimerDisplay value={model.timeRemaining} />
					</div>

					<ProgressRing
						stroke={4}
						radius={120}
						progress={100 - model.progress}
					/>
				</div>
				<div class="cd-controls-section">
					<TimerButton label="stop" onClick={(): void => model.stop()} />
					{model.timerState === TimerStates.running ? (
						<TimerButton label="pause" onClick={(): void => model.pause()} />
					) : (
						<TimerButton label="resume" onClick={(): void => model.resume()} />
					)}
					<TimerButton label="lap" onClick={(): void => model.addLap()} />
					{model.laps.length > 0 && (
						<TimerButton label="undo" onClick={(): void => model.removeLap()} />
					)}
				</div>
				<div class="cd-lap-section">
					<div class="cd-lap-section-inner">
						<Laps
							laps={model.laps}
							threshold={model.lapThreshold}
							compareTime={model.compareTime}
						/>
					</div>
				</div>
			</Fragment>
		);
	}

	return (
		<main class="cd-app">
			<h1>Countdown Timer</h1>
			<div class="cd-app-section">{contentElement}</div>
		</main>
	);
}
