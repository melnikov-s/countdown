import { h } from "preact";
import { splitMS, toTimerDigit } from "../utils";

export default function TimerDisplay({
	value = 0,
}: {
	value: number;
}): h.JSX.Element {
	const { minutes, seconds, ms, negative } = splitMS(value);

	return (
		<span>
			{negative ? "-" : ""}
			{toTimerDigit(minutes)}:{toTimerDigit(seconds)}:{toTimerDigit(ms)}
		</span>
	);
}
