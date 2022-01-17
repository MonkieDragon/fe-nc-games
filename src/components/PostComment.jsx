import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../contexts/user";
import { postComment } from "../utils/api";

const PostComment = ({ review_id, setPage, setComments, incComments }) => {
	const { user } = useContext(UserContext);
	const [newComment, setNewComment] = useState("");

	const handleChange = (event) => {
		const { value } = event.target;
		setNewComment(value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newComment.length > 0) {
			postComment(review_id, user.username, newComment)
				.then((postedComment) => {
					setNewComment("");
					incComments(1);
					setComments((currComments) => [postedComment, ...currComments]);
					setPage(0);
				})
				.catch(() => {
					//error
				});
		}
	};

	return (
		<form onSubmit={handleSubmit} className="post-comment">
			<TextField
				id="outlined-basic"
				label="Post Comment"
				variant="outlined"
				onChange={handleChange}
				value={newComment}
				multiline
				maxRows={5}
				size="small"
				fullWidth
			/>
			<Button onClick={handleSubmit} variant="contained">
				Post
			</Button>
		</form>
	);
};

export default PostComment;
