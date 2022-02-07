import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import Loginbox from "./Loginbox";
import { IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";

export default function NavBar({ setUser }) {
	const { user } = useContext(UserContext);
	const [showLogin, setShowLogin] = useState(false);

	const handleLogIn = () => {
		if (showLogin) {
			setShowLogin(false);
		} else if (user) {
			setUser(false);
		} else {
			setShowLogin(true);
		}
	};

	return (
		<AppBar position="static">
			<div className="topnav">
				<IconButton color="inherit" aria-label="home" component={Link} to="/">
					<HomeIcon />
				</IconButton>
				{user ? (
					<div className="midnav">
						<PersonIcon />
						<Typography>{user.username}</Typography>
					</div>
				) : null}
				{user ? (
					<IconButton color="inherit" onClick={handleLogIn}>
						<LogoutIcon />
					</IconButton>
				) : (
					<>
						{showLogin ? (
							<IconButton color="inherit" onClick={handleLogIn}>
								<CloseIcon />
							</IconButton>
						) : (
							<IconButton color="inherit" onClick={handleLogIn}>
								<LoginIcon />
							</IconButton>
						)}
					</>
				)}
			</div>
			{showLogin ? (
				<Loginbox setUser={setUser} setShowLogin={setShowLogin} />
			) : null}
		</AppBar>
	);
}
/*
				<Button component={Link} to="/categories" color="inherit">
						Categories
					</Button>
*/
