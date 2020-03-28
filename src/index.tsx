import { h, render } from "preact";
import App from "./components/App";
import CountDownModel, { TimerStates, TimerState } from "./model";

const STORAGE_KEY = "counterStateV1";

function renderTimer(): void {
	render(<App model={model} />, document.body);
}

function tick(): void {
	renderTimer();
	rafTimer = requestAnimationFrame(tick);
}

function saveToStorage(): void {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(model.toJSON()));
	} catch (e) {
		console.warn("Saving to storage failed", e);
	}
}

function onStateChange(state: TimerState): void {
	saveToStorage();
	cancelAnimationFrame(rafTimer);
	if (state === TimerStates.running) {
		tick();
	} else {
		renderTimer();
	}
}

function onLapChange(): void {
	saveToStorage();
}

let rafTimer: number;
const model = new CountDownModel(onStateChange, onLapChange);

let storage;

try {
	storage = localStorage.getItem(STORAGE_KEY);
} catch (e) {
	console.warn("Loading from  storage failed", e);
}

if (storage) {
	model.fromJSON(JSON.parse(storage));
} else {
	renderTimer();
}
