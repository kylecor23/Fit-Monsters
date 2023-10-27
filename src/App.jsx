import React, { useState } from "react";
import "./App.css";

function App() {
	const [isPopupOpen, setIsPopupOpen] = useState(false);

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	return (
		<div className="App">
			<header>
				<h1>Fit Monsters</h1>
				<nav className="nav">
					<button onClick={togglePopup}>Show Popup</button>
					<div
						className={`overlay ${isPopupOpen ? "active" : ""}`}
						onClick={togglePopup}
					>
						<div className="popup">
							<ul>
								<li>
									<a href="#">About</a>
								</li>
								<li>
									<a href="#">Features</a>
								</li>
								<li>
									<a href="#">Gallery</a>
								</li>
							</ul>
							<button>Sign In</button>
						</div>
					</div>
				</nav>
			</header>

			<main>
				<div>
					<h1 className="topPage">Fit Monsters</h1>
					<p className="bottomTop">Re-Introduce fun to your workouts</p>
				</div>
				<div className="section2">
					<div className="about">
						<h2>About</h2>
					</div>
					<p>
						Fit Monsters is a web application designed to help you nurture,
						develop, and maintain fitness companions (monsters) while
						simultaneously monitoring your personal fitness objectives. Engage
						in daily, weekly, and monthly challenges to unlock new monsters and
						expand your collection, all while challenging your friends to join
						you in this fun and fitness-focused journey.
					</p>
				</div>
				<div>
					<h2>Our Features</h2>
					<ul>
						<li>
							<h3>Number 1</h3>
							<p>bla bla bla bla</p>
						</li>
						<li>
							<h3>Number 2</h3>
							<p>sla bla bla bla</p>
						</li>
						<li>
							<h3>Number 3</h3>
							<p>la bla bla bla</p>
						</li>
						<li>
							<h3>Number 4</h3>
							<p>la bla bla bla</p>
						</li>
					</ul>
				</div>
			</main>
			<footer>
				<p>&copy; {new Date().getFullYear()} My Website</p>
				<p>Contact: contact@mywebsite.com</p>
			</footer>
		</div>
	);
}

export default App;

// const [count, setCount] = useState(0);
// const MyFancyButton = [];
// for (let i = 1; i <= 10; i++) {
// 	MyFancyButton.push(<button key={i}>Button {i}</button>);
// }

// 	return (
// 		<>
// 			<div>
// 				<a href="https://vitejs.dev" target="_blank">
// 					<img src={viteLogo} className="logo" alt="Vite logo" />
// 				</a>
// 				<a href="https://react.dev" target="_blank">
// 					<img src={reactLogo} className="logo react" alt="React logo" />
// 				</a>
// 			</div>
// 			<h1>Fit Monsters</h1>
// 			<div className="card">
// 				<button onClick={() => setCount((count) => count + 1)}>
// 					count is {count}
// 				</button>
// 				<p>
// 					Edit <code>src/App.jsx</code> and save to test HMR
// 				</p>
// 			</div>
// 			<p className="read-the-docs">
// 				Click on the Vite and React logos to learn more
// 			</p>
// 			{MyFancyButton};
// 		</>
// 	);
// }
