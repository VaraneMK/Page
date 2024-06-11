import React from 'react';
import styles from './PaginationBar.module.css';
function PaginationBar({ totalCount, limit, currentPage, setCurrentPage, handleChange }) {
	return (
		<div className={styles.block}>
			<svg
				onClick={() => {
					if (currentPage - 1 > 0) {
						setCurrentPage((prev) => prev - 1);
						// handleChange();
					}
				}}
				width="35"
				height="35"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10.7071 4.29289C11.0976 4.68342 11.0976 5.31658 10.7071 5.70711L5.41421 11L21 11C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H5.41421L10.7071 18.2929C11.0976 18.6834 11.0976 19.3166 10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071L2.29289 12.7071C1.90237 12.3166 1.90237 11.6834 2.29289 11.2929L9.29289 4.29289C9.68342 3.90237 10.3166 3.90237 10.7071 4.29289Z"
					fill="#3B454E"
				/>
			</svg>
			<span className={styles.page__number}>{currentPage}</span>
			<svg
				onClick={() => {
					if (currentPage + 1 <= Math.ceil(totalCount / limit)) {
						setCurrentPage((prev) => prev + 1);
						// handleChange();
					}
				}}
				width="35"
				height="35"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M13.2929 4.29289C13.6834 3.90237 14.3166 3.90237 14.7071 4.29289L21.7071 11.2929C21.8946 11.4804 22 11.7348 22 12C22 12.2652 21.8946 12.5196 21.7071 12.7071L14.7071 19.7071C14.3166 20.0976 13.6834 20.0976 13.2929 19.7071C12.9024 19.3166 12.9024 18.6834 13.2929 18.2929L18.5858 13L3 13C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11L18.5858 11L13.2929 5.70711C12.9024 5.31658 12.9024 4.68342 13.2929 4.29289Z"
					fill="#3B454E"
				/>
			</svg>
		</div>
	);
}

export default PaginationBar;
