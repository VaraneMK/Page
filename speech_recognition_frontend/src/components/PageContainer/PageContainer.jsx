import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../Header/Header';
import AdminPage from '../AdminPage/AdminPage';
import DefaultPage from '../DefaultPage/DefaultPage';
import UnAuthPage from '../UnAuthPage/UnAuthPage';

function PageContainer() {
	const isLogin = useSelector((state) => state.userSlice.isLogin);
	const isAdmin = useSelector((state) => state.userSlice.isAdmin);

	const [isGuest, setGuestMode] = useState(false);

	return (
		<div>
			<Header
				isAuth={isLogin}
				isAdmin={isAdmin}
				isGuest={isGuest}
				setGuestMode={setGuestMode}
			/>
			{/* {isAdmin ? <AdminPage /> : isLogin || isGuest ? <DefaultPage isGuest={isGuest} /> : <UnAuthPage />}
			 */}
			<AdminPage />
		</div>
	);
}

export default PageContainer;
