import React, { useState, useEffect } from "react";
import { getComments } from "../utils/api";
import Pag from "./Pag";
import PostComment from "./PostComment";
import VoteCommentBar from "./VoteCommentBar";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Comments = ({ review_id, totalComments, incComments }) => {
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [page, setPage] = useState(0);
	const pageLength = 5;

	console.log("commentCount = ", totalComments);

	useEffect(() => {
		getComments(review_id, pageLength, page * pageLength)
			.then((commentsFromAPI) => {
				setComments(commentsFromAPI);
				setIsLoading(false);
			})
			.catch(() => {
				//error
			});
	}, [page, review_id]);

	return (
		<>
			{isLoading ? (
				<p>Comments Loading...</p>
			) : (
				<div className="comment_list">
					<PostComment
						review_id={review_id}
						setPage={setPage}
						setComments={setComments}
						incComments={incComments}
					/>
					<p>Comments: {totalComments}</p>
					<ul>
						{comments.map((comment) => {
							return (
								<li className="comment-card" key={comment.comment_id}>
									<div className="bar-even">
										<p>{comment.author}</p>
										<p>{dayjs(comment.created_at).fromNow()}</p>
									</div>
									<p>{comment.body}</p>

									<VoteCommentBar
										comment={comment}
										setComments={setComments}
										incComments={incComments}
									/>
								</li>
							);
						})}
					</ul>
					<Pag
						page={page}
						setPage={setPage}
						pageLength={pageLength}
						totalCount={totalComments}
					/>
				</div>
			)}
		</>
	);
};

export default Comments;
