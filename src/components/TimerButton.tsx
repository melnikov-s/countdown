import { h } from "preact";

import "./TimerButton.scss";

export default function TimerButton({
	label,
	onClick,
	disabled = false,
}: {
	disabled?: boolean;
	label: string;
	onClick: h.JSX.MouseEventHandler<HTMLButtonElement>;
}): h.JSX.Element {
	return (
		<button className="cd-timer-button" onClick={onClick} disabled={disabled}>
			{label}
		</button>
	);
}
