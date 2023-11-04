import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../reuseable-components/popup-menu";
export default function DashBoard() {
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
					<h1>dashboard</h1>
				</div>
			</main>
		</>
	);
}
