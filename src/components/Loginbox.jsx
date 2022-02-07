import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { getUserbyUsername } from "../utils/api";

export default function Loginbox({ setUser, setShowLogin }) {
	const { user } = useContext(UserContext);
	const [newUser, setNewUser] = useState("");
	const [invalidUser, setInvalidUser] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (event) => {
		const { value } = event.target;
		setNewUser(value);
		setInvalidUser(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setInvalidUser(false);
		setIsLoading(true);
		getUserbyUsername(newUser)
			.then((userFromAPI) => {
				setUser(userFromAPI);
				setShowLogin(false);
				setIsLoading(false);
			})
			.catch((err) => {
				setInvalidUser(true);
				setIsLoading(false);
			});

		setNewUser("");
	};

	return (
		<form className="login_box" onSubmit={handleSubmit}>
			<TextField
				value={newUser}
				variant="outlined"
				onChange={handleChange}
				label="username"
				error={invalidUser}
				disabled={isLoading}
				size="small"
				fullWidth
			/>
			<Button onClick={handleSubmit} variant="contained">
				Submit
			</Button>
		</form>
	);
}
