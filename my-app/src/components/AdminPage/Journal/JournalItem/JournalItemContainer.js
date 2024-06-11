import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFile } from '../../../../redux/reducers/fileSlice';
import { PuffLoader } from 'react-spinners';
import JournalItem from './JournalItem';

function JournalItemContainer() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { processData, isLoading, isError } = useSelector((state) => state.fileSlice);

	useEffect(() => {
		dispatch(getFile(id));
	}, [id]);

	return isLoading ? (
		<div className="user_spinner">
			<PuffLoader
				color="#38A169"
				size={400}
			/>
		</div>
	) : processData?.id ? (
		<JournalItem file={processData} />
	) : isError ? (
		<div>Ошибка</div>
	) : null;
}

export default JournalItemContainer;
