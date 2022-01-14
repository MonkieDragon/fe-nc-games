import {
	AppBar,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Toolbar,
} from "@mui/material";
import React, { useState } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const Sortbar = ({ order, setOrder, sort_by, setSort_by }) => {
	const handleOrder = () => {
		setOrder((currOrd) => {
			return currOrd === "ASC" ? "DESC" : "ASC";
		});
	};

	const handleSelect = (event) => {
		const { value } = event.target;
		setSort_by(value);
	};

	return (
		<Toolbar>
			<InputLabel id="sort-by-label">Sort By</InputLabel>
			<Select
				labelId="sort-by-label"
				id="sort-by-select"
				value={sort_by}
				label="Sort By"
				onChange={handleSelect}
			>
				<MenuItem value="comment_count">Comments</MenuItem>
				<MenuItem value="created_at">Date</MenuItem>
				<MenuItem value="votes">Votes</MenuItem>
			</Select>

			<Button color="inherit" onClick={handleOrder}>
				{" "}
				Order:{"  "}
				{order === "ASC" ? <ArrowCircleUpIcon /> : <ArrowCircleDownIcon />}
			</Button>
		</Toolbar>
	);
};

export default Sortbar;
