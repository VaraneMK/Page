import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFile } from '../../../redux/reducers/fileSlice';
import { PacmanLoader } from 'react-spinners';
import File from './File';
import ErrorComponent from '../../ErrorComponent/ErrorComponent';

function FileContainer() {
	const dispatch = useDispatch();
	const file = useSelector((state) => state.fileSlice);

	const { processData } = file;
	const { data } = file;

	console.log(data.id);
	console.log(processData.status);

	useEffect(() => {
		if (data.id && data.status !== 'OK') {
			setTimeout(() => {
				dispatch(getFile(data.id));
			}, 3000);
		}
	}, [processData, data.id]);

	switch (data.status) {
		case 'NEW':
			return (
				<div className="spinner">
					{' '}
					<PacmanLoader
						color="#38A169"
						margin={5}
						size={70}
					/>
				</div>
			);
			break;
		case 'OK':
			return <File />;
			break;
		case 'ERROR':
			return <ErrorComponent />;
			break;
		default:
			break;
	}
}

export default FileContainer;
