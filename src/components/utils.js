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

function getWeekNumber(date) {
	const target = new Date(date.valueOf());
	const dayNr = (date.getDay() + 6) % 7;
	target.setDate(target.getDate() - dayNr + 3);
	const firstThursday = target.valueOf();
	target.setMonth(0, 1);
	if (target.getDay() !== 4) {
		target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
	}
	return 1 + Math.ceil((firstThursday - target) / 604800000);
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

	if (type === "weekly") {
		seed = today.getFullYear() * 100 + getWeekNumber(today);
		console.log(seed);
	}

	index = Math.floor(seededRandom(seed) * filteredArray.length);
	return filteredArray[index];
}
