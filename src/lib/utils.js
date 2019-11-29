export function getRandomId() {
	return Math.random()
		.toString(32)
		.substr(8);
}
