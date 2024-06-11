import React, { useEffect } from 'react';
import styles from './DefaultPage.module.css';

import Navbar from './Navbar/Navbar';
import FileArea from './FileArea/FileArea';
import { Route, Routes } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getLogin } from '../../redux/reducers/userSlice';
import FileContainer from './File/FileContainer';
import File from './File/File';

function DefaultPage({ isGuest }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLogin(isGuest));
	}, [dispatch]);

	return (
		<div className={styles.default__page}>
			<Navbar isGuest={isGuest} />
			<Routes>
				<Route
					path="/"
					element={<FileArea />}
				/>
				<Route
					path="/file"
					element={<FileContainer />}
				/>
				<Route
					path="/file/:id"
					element={<File />}
				/>
			</Routes>
		</div>
	);
}

export default DefaultPage;
