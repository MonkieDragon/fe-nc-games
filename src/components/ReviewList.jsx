import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews } from "../utils/api";
import Pag from "./Pag";
import ReviewCard from "./ReviewCard";
import Sortbar from "./Sortbar";

const ReviewList = () => {
	const { category_name } = useParams();
	const [reviews, setReviews] = useState([]);
	const [localSort_by, setLocalSort_by] = useState("created_at");
	const [localOrder, setLocalOrder] = useState("ASC");
	const [isError, setIsError] = useState(false);
	const [page, setPage] = useState(0);
	const [totalReviews, setTotalReviews] = useState(0);
	const pageLength = 10;

	useEffect(() => {
		setIsError(false);
		getReviews({
			category: category_name,
			sort_by: localSort_by,
			order: localOrder,
			limit: pageLength,
			p: page * pageLength,
		})
			.then((reviewsFromAPI) => {
				setReviews(reviewsFromAPI);
				setTotalReviews(reviewsFromAPI[0].total_count);
			})
			.catch(() => {
				setIsError(true);
			});
	}, [category_name, localOrder, localSort_by, page]);

	console.log("totalReviews in reviewList: ", totalReviews);

	return (
		<section>
			<Sortbar
				order={localOrder}
				setOrder={setLocalOrder}
				sort_by={localSort_by}
				setSort_by={setLocalSort_by}
			/>
			<h1> {category_name ? `${category_name} Reviews` : "All Reviews"}</h1>
			<ul>
				{reviews.map((review) => {
					return (
						<li key={review.review_id}>
							<ReviewCard review={review} />
						</li>
					);
				})}
			</ul>
			<Pag
				page={page}
				setPage={setPage}
				pageLength={pageLength}
				totalCount={totalReviews}
			/>
		</section>
	);
};

export default ReviewList;
