import axios from "axios";

const gamesApi = axios.create({
	baseURL: "https://northcoders-board-games.herokuapp.com/api",
});

export const postComment = (review_id, username, body) => {
	return gamesApi
		.post(`/reviews/${review_id}/comments`, { username, body })
		.then((res) => {
			return res.data.comment;
		});
};

export const deleteComment = (comment_id) => {
	return gamesApi.delete(`/comments/${comment_id}`).then((res) => {
		return res.status; //eg 204
	});
};

export const deleteReview = (review_id) => {
	return gamesApi.delete(`/reviews/${review_id}`).then((res) => {
		return res.status; //eg 204
	});
};

export const incReviewVote = (review_id, inc_votes) => {
	return gamesApi.patch(`/reviews/${review_id}`, { inc_votes }).then((res) => {
		return res.data.review;
	});
};

export const incCommentVote = (comment_id, inc_votes) => {
	return gamesApi
		.patch(`/comments/${comment_id}`, { inc_votes })
		.then((res) => {
			return res.data.comment;
		});
};

export const getReviewByID = (review_id) => {
	return gamesApi.get(`/reviews/${review_id}`).then((res) => {
		return res.data.review;
	});
};

export const getComments = (review_id, limit, p) => {
	return gamesApi
		.get(`/reviews/${review_id}/comments`, { params: { limit, p } })
		.then((res) => {
			return res.data.comments;
		});
};

export const getReviews = (params) => {
	return gamesApi.get(`/reviews`, { params }).then((res) => {
		return res.data.reviews;
	});
};

export const getUserbyUsername = (username) => {
	return gamesApi.get(`/users/${username}`).then((res) => {
		return res.data.user;
	});
};

export const getCategories = () => {
	return gamesApi.get("/categories").then((res) => {
		return res.data.categories;
	});
};

export const capitalise = (word) => {
	return word[0].toUpperCase() + word.slice(1).toLowerCase();
};
