import React, { useRef, useState } from 'react';
import { ReactComponent as Files } from './../../../svg/files.svg';
import { ReactComponent as FileLogo } from './../../../svg/fileLogo.svg';
import styles from './FileArea.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../../redux/reducers/fileSlice';

function FileArea() {
	const [file, setFile] = useState(null);
	const wrapperRef = useRef(null);
	const dispatch = useDispatch();

	const onDragEnter = () => {
		wrapperRef.current.classList.add(`${styles.dragover}`);
	};
	const onDragLeave = () => {
		wrapperRef.current.classList.remove(`${styles.dragover}`);
	};

	const onDrop = () => {
		wrapperRef.current.classList.remove(`${styles.dragover}`);
	};

	const onFileDrop = (e) => {
		const newFile = e.target.files[0];
		setFile(newFile);
	};

	const cancelOperation = (e) => {
		e.preventDefault();
		setFile(null);
	};

	const handleSubmit = () => {
		dispatch(uploadFile(file));
	};
	return (
		<section className={styles.file__area}>
			{file === null ? (
				<div
					onDragEnter={onDragEnter}
					onDragLeave={onDragLeave}
					onDrop={onDrop}
					ref={wrapperRef}
					className={styles.drag__drop__area}>
					<div className={styles.action__area}>
						<div className={styles.action__body}>
							<div className={styles.action__title}>Перетащите аудио-файл</div>
							<Files />
							<span className={styles.action__info}>Размер файла должен быть не более 500МБ</span>
						</div>
					</div>
					<input
						type="file"
						onChange={onFileDrop}></input>
				</div>
			) : (
				<div className={styles.is__file}>
					<FileLogo />
					<div className={styles.file__info}>
						<span className={styles.file__name}>{file.name}</span>
						<span className={styles.file__size}>{(file.size * 0.000001).toFixed(4)} МБайт</span>
					</div>
					<div className={styles.btn__block}>
						<Link
							to="/file"
							className="primary__btn"
							onClick={handleSubmit}>
							Запустить
						</Link>
						<button
							className="secondary__red_btn"
							onClick={cancelOperation}>
							Отменить
						</button>
					</div>
				</div>
			)}
		</section>
	);
}

export default FileArea;
