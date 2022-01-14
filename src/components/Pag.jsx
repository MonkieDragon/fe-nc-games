import { Button } from "@mui/material";
import React from "react";

const Pag = ({ page, setPage, pageLength, totalCount }) => {
	const handlePrev = () => {
		setPage((currPage) => currPage - 1);
	};

	const handleNext = () => {
		setPage((currPage) => currPage + 1);
	};
	console.log(
		"pageLength: ",
		pageLength,
		"page: ",
		page,
		"totalCount: ",
		totalCount
	);
	return (
		<div className="pagination">
			<Button onClick={handlePrev} disabled={page === 0}>
				Prev
			</Button>
			<p>
				Page {page + 1} / {Math.floor(totalCount / pageLength) + 1}
			</p>
			<Button
				onClick={handleNext}
				disabled={pageLength * (page + 1) >= totalCount}
			>
				Next
			</Button>
		</div>
	);
};

export default Pag;
