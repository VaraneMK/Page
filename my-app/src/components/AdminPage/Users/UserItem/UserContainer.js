import React, { useEffect } from 'react';
import UserItem from './UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../../../redux/reducers/adminSlice';
import { useParams } from 'react-router-dom';
import { PuffLoader } from 'react-spinners';

function UserContainer() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { user, isLoading, isError } = useSelector((state) => state.adminSlice);

	useEffect(() => {
		dispatch(getUser(id));
	}, [id]);

	return isLoading ? (
		<div className="user_spinner">
			<PuffLoader
				color="#38A169"
				size={400}
			/>
		</div>
	) : user.id ? (
		<UserItem user={user} />
	) : isError ? (
		<div>Ошибка</div>
	) : null;
}

export default UserContainer;
