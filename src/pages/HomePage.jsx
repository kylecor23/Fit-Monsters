import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../reuseable-components/popup-menu";

export default function HomePage() {
	const navigate = useNavigate();

	return (
		<>
			<header>
				<h1>Fit Monsters</h1>
				<nav className="nav">
					<Popup>
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
						<button onClick={() => navigate("/login")}>Sign In</button>
					</Popup>
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
		</>
	);
}
