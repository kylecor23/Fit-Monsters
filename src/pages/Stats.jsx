import React, { useContext, useState } from "react";
import StepsInputField from "../reuseable-components/StatInput";
import StatsProvider from "../reuseable-components/StatsTracker";

function stats() {
	return (
		<StatsProvider>
			<div>
				<h1>Stats</h1>
				<StepsInputField activity="steps" />
				<StepsInputField activity="calories" />
			</div>
		</StatsProvider>
	);
}

export default stats;
