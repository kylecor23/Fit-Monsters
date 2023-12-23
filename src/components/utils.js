export function getStartOfNextDay(currentDate) {
	const nextDay = new Date(currentDate);
	nextDay.setDate(nextDay.getDate() + 1);
	nextDay.setHours(0, 0, 0, 0);
	return nextDay;
}

function seededRandom(seed) {
	let x = Math.sin(seed) * 10000;
	return x - Math.floor(x);
}

export function pickItemBasedOnDate(array, type) {
	let index;
	let seed;
	let filteredArray = array.filter((item) => item.type === type);
	const today = new Date();

	if (type === "daily") {
		seed =
			today.getFullYear() * 10000 +
			(today.getMonth() + 1) * 100 +
			today.getDate();
	}

	if (type === "monthly") {
		seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100;
	}

	index = Math.floor(seededRandom(seed) * filteredArray.length);
	return filteredArray[index];
}
