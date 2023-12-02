function RandomChallengeSelector({ label, challengeList }) {
	const randomIndex = Math.floor(Math.random() * challengeList.length);
	const randomChallenge = challengeList[randomIndex];

	return (
		<div className="challengesTwo">
			<h2>{label}</h2>
			{randomChallenge && <p>{randomChallenge.label}</p>}
		</div>
	);
}

export default RandomChallengeSelector;
