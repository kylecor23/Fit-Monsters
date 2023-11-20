import "./App.css";
import "./login.css";
import { StatsProvider } from "./reuseable-components/StatsTracker";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";

function App() {
	return (
		<StatsProvider>
			<div className="App">
				<RouterProvider router={router} />
			</div>
		</StatsProvider>
	);
}

export default App;
