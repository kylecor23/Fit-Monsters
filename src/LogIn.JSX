import React, { useState } from "react";

return (
	<div>
		<h2>Login</h2>
		<form onSubmit={handleLogin}>
			<div>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
);

export default Login;
