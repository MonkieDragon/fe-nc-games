import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import Loginbox from "./Loginbox";
import { Button, IconButton, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";

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
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
							component={Link}
							to="/"
						>
							<HomeIcon />
						</IconButton>
					</Box>
					<Link to="/categories">
						<Typography component="div">Categories</Typography>
					</Link>
					<div className="topnav">
						{user ? (
							<>
								{" "}
								<PersonIcon />
								<Typography component="div">{user.username}</Typography>
								<Button color="inherit" onClick={handleLogIn}>
									{" "}
									Log Out{" "}
								</Button>
							</>
						) : (
							<>
								{showLogin ? (
									<button onClick={handleLogIn}> Hide </button>
								) : (
									<button onClick={handleLogIn}> Log In </button>
								)}
							</>
						)}
					</div>
					{showLogin ? (
						<div className="bottomnav">
							<Loginbox setUser={setUser} setShowLogin={setShowLogin} />
						</div>
					) : null}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
/*
<Link to="/categories">
<h6>Categories</h6>
</Link>
*/
