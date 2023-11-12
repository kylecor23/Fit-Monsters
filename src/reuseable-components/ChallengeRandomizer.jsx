import React, { useState, useEffect } from "react";

function RandomChallengeSelector({ label, challengeList }) {
	const [selectedChallenge, setSelectedChallenge] = useState(null);

	useEffect(() => {
		selectRandomChallenge();
	}, []);

	const selectRandomChallenge = () => {
		const randomIndex = Math.floor(Math.random() * challengeList.length);
		const randomChallenge = challengeList[randomIndex];
		setSelectedChallenge(randomChallenge);
	};

	return (
		<div className="challengesTwo">
			<h2>{label}</h2>
			{selectedChallenge && <p>{selectedChallenge}</p>}
		</div>
	);
}

export default RandomChallengeSelector;
