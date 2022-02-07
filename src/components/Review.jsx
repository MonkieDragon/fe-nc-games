import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getReviewByID, capitalise } from "../utils/api";
import VoteReviewBar from "./VoteReviewBar";
import Comments from "./Comments";
import { Container } from "@mui/material";
import dayjs from "dayjs";

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Review = () => {
	const { review_id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [review, setReview] = useState({});
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsError(false);
		getReviewByID(review_id)
			.then((reviewFromAPI) => {
				setReview(reviewFromAPI);
				setIsLoading(false);
			})
			.catch(() => {
				setIsError(true);
			});
	}, [review_id]);

	const incComments = (incValue) => {
		setReview((currReview) => {
			return { ...currReview, total_count: incValue };
		});
	};

	return isError ? (
		<h2>Unable to find category</h2>
	) : (
		<Container className="review page">
			{isLoading ? (
				<p>Loading review...</p>
			) : (
				<div>
					<div className="card-product">
						<div className="card-product-info">
							<p>{review.title}</p>
							<p>{capitalise(review.category)}</p>
							<p>{review.designer}</p>
						</div>
						<div>
							<img
								className="card-product-pic"
								src={review.review_img_url}
								alt={review.title}
							></img>
						</div>
					</div>
					<div className="card review_info">
						<div className="bar-even">
							<p>{review.owner}</p>
							<p>{dayjs(review.created_at).fromNow()}</p>
						</div>
						<p>{review.review_body}</p>
						<VoteReviewBar review={review} />
					</div>
				</div>
			)}
			<Comments
				review_id={review_id}
				totalComments={review.comment_count}
				incComments={incComments}
			/>
		</Container>
	);
};

export default Review;
