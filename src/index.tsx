import { h, render } from "preact";
import App from "./components/App";
import CountDownModel, { TimerStates, TimerState } from "./model";

let rafTimer: number;
const model = new CountDownModel(onStateChange);

function renderTimer(): void {
	render(<App model={model} />, document.body);
}

function tick(): void {
	renderTimer();
	rafTimer = requestAnimationFrame(tick);
}

function onStateChange(state: TimerState): void {
	cancelAnimationFrame(rafTimer);
	if (state === TimerStates.running) {
		tick();
	} else {
		renderTimer();
	}
}

renderTimer();
