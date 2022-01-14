import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const ReviewCard = ({ review }) => {
	return (
		<div className="review-card">
			<div>
				<Typography variant="h6" align="center">
					{review.title}
				</Typography>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-evenly",
				}}
			>
				<div>
					<Typography>OWNER: {review.owner}</Typography>
					<Typography>CATEGORY: {review.category}</Typography>
					<Typography>VOTES: {review.votes}</Typography>
					<Typography>COMMENTS: {review.comment_count}</Typography>
				</div>
				<div>
					<Link to={`/review/${review.review_id}`}>
						<img
							className="card-product-pic"
							src={review.review_img_url}
							alt={review.title}
						></img>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
