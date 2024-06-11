import React from 'react';
import styles from './AdminPage.module.css';
import { Route, Routes } from 'react-router-dom';
import Users from './Users/Users';
import Journal from './Journal/Journal';
import UserItem from './Users/UserItem/UserItem';
import JournalItem from './Journal/JournalItem/JournalItem';
import DefaultPage from '../DefaultPage/DefaultPage';
import UserContainer from './Users/UserItem/UserContainer';
import JournalItemContainer from './Journal/JournalItem/JournalItemContainer';
import FileContainer from '../DefaultPage/File/FileContainer';
import File from '../DefaultPage/File/File';
import Navbar from '../DefaultPage/Navbar/Navbar';

function AdminPage() {
	return (
		<div className={styles.admin__page}>
			<Routes>
				<Route
					path="/"
					element={<DefaultPage />}
				/>
				<Route
					path="/users"
					element={<Users />}
				/>
				<Route
					path="/journal"
					element={<Journal />}
				/>
				<Route
					path="/users/:id"
					element={<UserContainer />}
				/>
				<Route
					path="/file"
					element={
						<div className="div__flex">
							<Navbar />
							<FileContainer />
						</div>
					}
				/>
				<Route
					path="/file/:id"
					element={
						<div className="div__flex">
							{' '}
							<Navbar />
							<File />
						</div>
					}
				/>
				<Route
					path="/admin/file/:id"
					element={<JournalItemContainer />}
				/>
			</Routes>
		</div>
	);
}

export default AdminPage;
