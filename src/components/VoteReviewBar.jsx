import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";
import { deleteReview, incReviewVote } from "../utils/api";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const VoteReviewBar = ({ review }) => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const [reviewVotes, setReviewVotes] = useState(Number(review.votes));
	const [hasVoted, setHasVoted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const allowDelete = user.username === review.owner;

	const handleVote = () => {
		const vote = hasVoted ? -1 : 1;
		setIsLoading(true);
		setReviewVotes(reviewVotes + vote);

		incReviewVote(review.review_id, vote)
			.then(() => {
				setIsLoading(false);
				setHasVoted(!hasVoted);
			})
			.catch(() => {
				const vote = hasVoted ? 1 : -1;
				setReviewVotes(reviewVotes + vote);
				setIsLoading(false);
			});
	};

	const handleDelete = (id) => {
		deleteReview(id).then(() => {
			navigate("/");
		});
	};

	return (
		<div className="buttonbar">
			<p>Likes: {reviewVotes}</p>
			{allowDelete ? (
				<Button
					color="inherit"
					onClick={() => {
						handleDelete(review.review_id);
					}}
				>
					Delete Review
				</Button>
			) : (
				<Button
					variant={hasVoted ? "contained" : "outlined"}
					endIcon={<ThumbUpIcon />}
					onClick={handleVote}
					disabled={isLoading}
				>
					Like
				</Button>
			)}
		</div>
	);
};

export default VoteReviewBar;
