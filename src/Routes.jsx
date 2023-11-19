import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LogIn from "./pages/LogIn";
import DashBoard from "./pages/DashBoard";
import Stats from "./pages/Stats";

const router = createBrowserRouter([
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/about",
		element: <AboutPage />,
	},
	{
		path: "/login",
		element: <LogIn />,
	},
	{
		path: "/dashboard",
		element: <DashBoard />,
	},
	{
		path: "/stats",
		element: <Stats />,
	},
]);

export default router;
