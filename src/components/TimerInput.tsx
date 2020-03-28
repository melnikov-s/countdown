import { h } from "preact";
import { toMS, splitMS } from "../utils";

import "./TimerInput.scss";

export default function TimerInput({
	label = "",
	value = 0,
	onValueChange,
	id,
}: {
	id: string;
	value: number;
	onValueChange: (value: number) => void;
	label?: string;
}): h.JSX.Element {
	const { minutes, seconds } = splitMS(value);

	return (
		<fieldset className="cd-timer-input-section" id={id}>
			<legend className="cd-timer-input-main-label">{label}</legend>
			<div className="cd-timer-input-wrapper">
				<span className="cd-timer-input-labels">
					<label for={`${id}_m`}>Minutes</label>
					<label for={`${id}_s`}>Seconds</label>
				</span>
				<span className="cd-timer-input">
					<input
						id={`${id}_m`}
						min="0"
						type="number"
						value={minutes}
						onInput={(e): void =>
							onValueChange(toMS(e.currentTarget.value, seconds))
						}
					/>
					<input
						id={`${id}_s`}
						min="0"
						type="number"
						value={seconds}
						onChange={(e): void =>
							onValueChange(toMS(minutes, e.currentTarget.value))
						}
					/>
				</span>
			</div>
		</fieldset>
	);
}
