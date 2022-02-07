import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import ReviewList from "./components/ReviewList";
import Categories from "./components/Categories";
import Review from "./components/Review";
import NavBar from "./components/Navbar";
import { UserContext } from "./contexts/user";
import { CssBaseline } from "@mui/material";
import Error from "./components/Error";

function App() {
	const [user, setUser] = useState({ username: "jessjelly" });
	return (
		<UserContext.Provider value={{ user }}>
			<BrowserRouter>
				<CssBaseline />
				<div className="App">
					<NavBar setUser={setUser} />
					<Routes>
						<Route path="/" element={<ReviewList />} />
						<Route path="/categories/:category_name" element={<ReviewList />} />
						<Route path="/categories" element={<Categories />} />
						<Route path="/review/:review_id" element={<Review />} />
						<Route path="/*" element={<Error />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
