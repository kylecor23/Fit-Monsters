import "./App.css";
import "./login.css";
import { StatsProvider } from "./components/StatsTracker";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";

function App() {
	return (
		<div className="App">
			<StatsProvider>
				<RouterProvider router={router} />
			</StatsProvider>
		</div>
	);
}

export default App;
