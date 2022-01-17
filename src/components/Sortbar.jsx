import {
	AppBar,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import { useNavigate } from "react-router-dom";
import { capitalise, getCategories } from "../utils/api";

const Sortbar = ({ category, order, setOrder, sort_by, setSort_by }) => {
	const navigate = useNavigate();

	const [categories, setCategories] = useState([]);
	useEffect(() => {
		getCategories().then((categoriesFromApi) => {
			setCategories(categoriesFromApi);
		});
	}, []);

	const handleOrder = (event) => {
		const { value } = event.target;
		setOrder(value);
	};

	const handleSort = (event) => {
		const { value } = event.target;
		setSort_by(value);
	};

	const handleCat = (event) => {
		const { value } = event.target;
		navigate(`/categories/${value}`);
	};

	return (
		<div className="sortbar">
			<div className="sortbar-top">
				<div>
					<SortIcon />
					<Select
						// labelId="sort-by-label"
						id="sort-by-select"
						value={sort_by}
						onChange={handleSort}
						size="small"
					>
						<MenuItem value="comment_count">Comments</MenuItem>
						<MenuItem value="created_at">Date</MenuItem>
						<MenuItem value="votes">Votes</MenuItem>
					</Select>
				</div>
				<div>
					<SortByAlphaIcon />
					<Select size="small" value={order} onChange={handleOrder}>
						<MenuItem value="ASC">ASC</MenuItem>
						<MenuItem value="DESC">DESC</MenuItem>
					</Select>
				</div>
			</div>
			<div className="cat_select">
				<FormControl size="small" fullWidth>
					<InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
					<Select
						labelId="demo-multiple-chip-label"
						id="demo-multiple-chip"
						value={category}
						vsize="small"
						onChange={handleCat}
						label="Categories"
					>
						<MenuItem selected value="">
							All Reviews
						</MenuItem>
						{categories.map((category) => {
							const title = capitalise(category.slug.replaceAll("-", " "));

							return (
								<MenuItem key={category.slug} value={category.slug}>
									{title}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
			</div>
		</div>
	);
};

export default Sortbar;
