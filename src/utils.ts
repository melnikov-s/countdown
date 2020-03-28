export function toMS(
	minutes: number | string,
	seconds: number | string
): number {
	return (
		parseFloat((minutes as string) || "0") * 60 * 1000 +
		parseFloat((seconds as string) || "0") * 1000
	);
}

export function splitMS(
	value: number
): { minutes: number; seconds: number; ms: number; negative: boolean } {
	const absValue = Math.abs(value);
	const minutes = Math.floor(absValue / 1000 / 60);
	const seconds = Math.floor((absValue / 1000) % 60);
	const ms = Math.floor((absValue / 10) % 100);

	return { minutes, seconds, ms, negative: value < 0 };
}

export function toTimerDigit(value: number): string {
	if (value < 10) {
		return `0${value}`;
	}

	return String(value);
}
