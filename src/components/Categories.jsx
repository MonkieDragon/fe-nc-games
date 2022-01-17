import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { capitalise, getCategories } from "../utils/api";

export default function Categories() {
	const [categories, setCategroies] = useState([]);

	useEffect(() => {
		getCategories().then((categoriesFromApi) => {
			setCategroies(categoriesFromApi);
		});
	}, []);

	return (
		<div>
			<h1>Categories</h1>
			<ul>
				{categories.map((category) => {
					const title = capitalise(category.slug.replaceAll("-", " "));

					return (
						<li key={category.slug}>
							<Link to={`/categories/${category.slug}`}>
								<h4>{title}</h4>
							</Link>
							<p>{category.description}</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
