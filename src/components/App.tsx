import { h } from "preact";
import { useState } from "preact/hooks";

import "./App.scss";
import CountDownModel, { TimerStates } from "../model";

export default function App({
	model,
}: {
	model: CountDownModel;
}): h.JSX.Element {
	const [duration, setDuration] = useState(0);
	const [threshold, setThreshold] = useState(0);

	return (
		<div class="countdown">
			<div>{model.progress}</div>
			<div>{model.secondsRemaining}</div>
			<div>{JSON.stringify(model.lapStats)}</div>
			{(model.timerState === TimerStates.initial ||
				model.timerState === TimerStates.finished) && [
				<input
					type="text"
					value={duration}
					onChange={(e): void =>
						setDuration(parseInt((e.target as HTMLInputElement).value))
					}
				/>,
				<input
					type="text"
					value={threshold}
					onChange={(e): void =>
						setThreshold(parseInt((e.target as HTMLInputElement).value))
					}
				/>,
				<input
					type="button"
					value="start"
					onClick={(): void => model.start(duration, threshold)}
				/>,
			]}
			{model.timerState === TimerStates.running && [
				<input type="button" value="stop" onClick={(): void => model.stop()} />,
				<input
					type="button"
					value="pause"
					onClick={(): void => model.pause()}
				/>,
				<input
					type="button"
					value="lap"
					onClick={(): void => model.addLap()}
				/>,
				model.laps.length > 0 && (
					<input
						type="button"
						value="undo"
						onClick={(): void => model.removeLap()}
					/>
				),
			]}
			{model.timerState === TimerStates.paused && (
				<input
					type="button"
					value="resume"
					onClick={(): void => model.resume()}
				/>
			)}
		</div>
	);
}
