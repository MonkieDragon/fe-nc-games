import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { getUserbyUsername } from "../utils/api";

export default function Loginbox ({ setUser, setShowLogin }) {
	const { user } = useContext(UserContext);
	const [newUser, setNewUser] = useState("");
	const [invalidUser, setInvalidUser] = useState(false);

	const handleChange = (event) => {
		const { value } = event.target;
		setNewUser(value);
		setInvalidUser(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setInvalidUser(false);
		getUserbyUsername(newUser)
			.then((user) => {
				setUser(user);
				setShowLogin(false);
			})
			.catch((err) => {
				setInvalidUser(true);
			});

		setNewUser("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label className={invalidUser? "label-red" : "label"} >
					{invalidUser ? "Invalid UserName " : "Login "}
					<input
						type="text"
						value={newUser}
						onChange={handleChange}
						placeholder="username"
					></input>
				</label>
			</form>
		</div>
	);
};


