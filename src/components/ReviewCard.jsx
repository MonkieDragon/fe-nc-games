import { Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CasinoIcon from "@mui/icons-material/Casino";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const ReviewCard = ({ review }) => {
	const navigate = useNavigate();
	const snip_length = 100;
	const snip_end = review.review_body.length > snip_length ? '..."' : '"';
	const snippet = '"' + review.review_body.slice(0, snip_length) + snip_end;

	const handleClick = () => {
		navigate(`/review/${review.review_id}`);
	};

	return (
		<div className="review-card" onClick={handleClick}>
			<div className="review-card-outer">
				<div>
					<CasinoIcon />
					<Typography noWrap variant="body2" align="left">
						{review.title}
					</Typography>
				</div>
				<div className="no_shrink">
					<AccessTimeIcon />
					<Typography variant="body2" align="left">
						{dayjs(review.created_at).fromNow()}
					</Typography>
				</div>
			</div>
			<div className="review-card-inner">
				<img
					className="card-product-pic"
					src={review.review_img_url}
					alt={review.title}
				></img>

				<div className="snip_box">
					<Typography className="snippet" variant="body1" align="center">
						{snippet}
					</Typography>
				</div>
			</div>
			<div className="review-card-outer">
				<div>
					<PersonIcon />
					<Typography variant="body2" align="left">
						{review.owner}
					</Typography>
				</div>
				<div>
					<ThumbUpIcon />
					<Typography variant="body2" align="left">
						{review.votes}
					</Typography>
				</div>
				<div>
					<CommentIcon />
					<Typography variant="body2" align="left">
						{review.comment_count}
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default ReviewCard;
