import React, { useState, useEffect } from "react";

function RandomChallengeSelector({ label, challengeList }) {
	const randomIndex = Math.floor(Math.random() * challengeList.length);
	const randomChallenge = challengeList[randomIndex];

	return (
		<div className="challengesTwo">
			<h2>{label}</h2>
			{randomChallenge && <p>{randomChallenge}</p>}
		</div>
	);
}

export default RandomChallengeSelector;
