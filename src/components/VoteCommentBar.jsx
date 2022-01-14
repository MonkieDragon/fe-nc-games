import { Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user";
import { deleteComment, incCommentVote } from "../utils/api";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const VoteCommentBar = ({ comment, setComments, incComments }) => {
	const { user } = useContext(UserContext);
	const [commentVotes, setCommentVotes] = useState(Number(comment.votes));
	const [hasVoted, setHasVoted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const allowDelete = user.username === comment.author;
	console.log("allowDelete: ", allowDelete);
	console.log("user.username", user.username);
	console.log("comment.author", user.username);

	const handleVote = () => {
		const vote = hasVoted ? -1 : 1;
		setIsLoading(true);
		setCommentVotes(commentVotes + vote);
		incCommentVote(comment.comment_id, vote)
			.then(() => {
				setIsLoading(false);
				setHasVoted(!hasVoted);
			})
			.catch(() => {
				const vote = hasVoted ? 1 : -1;
				setCommentVotes(commentVotes + vote);
				setIsLoading(false);
			});
	};

	const handleDelete = (id) => {
		deleteComment(id).then(() => {
			incComments(-1);
			setComments((currComments) => {
				return currComments.filter(
					(currComment) => currComment.comment_id !== id
				);
			});
		});
	};

	return (
		<div className="buttonbar">
			<p>Likes: {commentVotes}</p>
			{allowDelete ? (
				<Button
					variant="contained"
					onClick={() => {
						handleDelete(comment.comment_id);
					}}
				>
					Delete Comment
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

export default VoteCommentBar;
