import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const HandleLogIn = () => {
		if (username === "name" && password === "1234") {
			navigate("/dashboard");
		} else {
			alert("Invalid username or password. Please try again.");
		}
	};

	return (
		<div className="login-container">
			<h1 className="login-title">Log In</h1>
			<div className="form-group">
				<label htmlFor="username">User Name</label>
				<input
					type="text"
					id="userName"
					name="userName"
					placeholder="User Name"
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<button onClick={HandleLogIn}>Log In</button>
			</div>
		</div>
	);
};
export default Login;
