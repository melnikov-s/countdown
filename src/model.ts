export const TimerStates = {
	initial: 0,
	running: 1,
	paused: 2,
	finished: 3,
} as const;

export type TimerState = typeof TimerStates[keyof typeof TimerStates];

export default class CountDownModel {
	lapThreshold: number = 0;
	startTime: number = 0;
	duration: number = 0;
	laps: number[] = [];
	pausedAt: number = 0;
	finishedAt: number = 0;
	timerState: TimerState = TimerStates.initial;
	onStateChange: (state: TimerState) => void;

	constructor(onStateChange: (state: TimerState) => void) {
		this.onStateChange = onStateChange;
	}

	private transitionState(
		newState: TimerState,
		validStates?: TimerState[]
	): void {
		if (!validStates || validStates.includes(this.timerState)) {
			this.timerState = newState;
			this.onStateChange(this.timerState);
		} else {
			throw new Error("Invalid state change");
		}
	}

	get compareTime(): number {
		switch (this.timerState) {
			case TimerStates.running:
				return Date.now();
			case TimerStates.paused:
				return this.pausedAt;
			case TimerStates.finished:
				return this.finishedAt;
			default:
				return 0;
		}
	}

	get progress(): number {
		if (
			this.timerState === TimerStates.running ||
			this.timerState === TimerStates.paused
		) {
			return Math.min(
				((this.compareTime - this.startTime) / this.duration) * 100,
				100
			);
		}

		return 0;
	}

	get timeRemaining(): number {
		return this.startTime + this.duration - this.compareTime;
	}

	get lapExceedsThreshold(): boolean {
		const current = this.laps[this.laps.length - 1];

		return current != null && current + this.lapThreshold > Date.now();
	}

	start(duration: number, lapThreshold: number = 0): void {
		this.duration = duration;
		this.startTime = Date.now();
		this.lapThreshold = lapThreshold;

		this.transitionState(TimerStates.running, [TimerStates.initial]);
	}

	restart(): void {
		this.laps = [];
		this.transitionState(TimerStates.initial, [TimerStates.finished]);
	}

	stop(): void {
		this.finishedAt = Date.now();
		this.transitionState(TimerStates.finished, [
			TimerStates.running,
			TimerStates.paused,
		]);
	}

	pause(): void {
		this.pausedAt = Date.now();
		this.transitionState(TimerStates.paused, [TimerStates.running]);
	}

	resume(): void {
		this.startTime += Date.now() - this.pausedAt;
		this.laps = this.laps.map((v) => v + Date.now() - this.pausedAt);
		this.transitionState(TimerStates.running, [TimerStates.paused]);
	}

	addLap(): void {
		this.laps.push(Date.now());
		this.transitionState(TimerStates.running, [
			TimerStates.running,
			TimerStates.paused,
		]);
	}

	removeLap(): void {
		this.laps.pop();
		this.transitionState(TimerStates.running, [
			TimerStates.running,
			TimerStates.paused,
		]);
	}

	fromJSON(json: Partial<this>): void {
		(Object.keys(json) as (keyof this)[]).forEach((key) => {
			this[key] = json[key]!;
		});

		this.transitionState(this.timerState);
	}

	toJSON(): Partial<this> {
		return (Object.getOwnPropertyNames(this) as (keyof this)[]).reduce(
			(json, prop) => {
				if (typeof this[prop] !== "function") {
					json[prop] = this[prop];
				}
				return json;
			},
			{} as Partial<this>
		);
	}
}
