export function randomId() {
	return Math.random()
		.toString(32)
		.substr(8);
}
