import React, { useState } from 'react';
import { ReactComponent as Arrow } from './../../../../svg/arrow-left.svg';
import { Input } from '../../../Ui/Input/Input';
import { Link } from 'react-router-dom';
import styles from './JournalItem.module.css';

function JournalItem({ file }) {
	const [values, setValues] = useState({
		loginValue: '',
		passwordValue: '',
	});

	const [valid, setValid] = useState(false);

	const { loginValue, passwordValue } = values;

	const handleChange = (name, value) => {
		setValues({ ...values, [name]: value });
	};

	const checkData = (e) => {
		e.preventDefault();
		///Дописать
	};

	const downloadTxtFile = () => {
		const element = document.createElement('a');
		const fileObj = new Blob(['adasdasdasdasd'], { type: 'text/plain' });
		element.href = URL.createObjectURL(fileObj);
		element.download = `${file.name.split('.')[0]}.txt`;
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();
	};

	return (
		<div className={styles.file__item}>
			<div className={styles.file__info}>
				<Link
					to="/journal"
					className={styles.arrow}>
					<Arrow />
				</Link>

				<div className={styles.file__title}>
					Запись <span className={styles.file__id}>#{file.id}</span>
				</div>
			</div>
			<Input
				title="Владелец"
				value={file.name}
				readOnly={true}
				name="loginValue"
				className="input"
				placeholder="some@email.com"
				type="email"
				onChange={handleChange}
			/>
			<Input
				title="Размер"
				value={(file.size * 0.000001).toFixed(2) + ' МБ'}
				readOnly={true}
				name="passwordValue"
				className="input"
				placeholder="МБ"
				type="text"
			/>
			<Input
				title="Статус"
				value={
					file.status === 'NEW'
						? 'Новый'
						: file.status === 'RUNNING'
						? 'Запущен'
						: file.status === 'OK'
						? 'Выполнен'
						: file.status === 'ERROR'
						? 'Ошибка'
						: null
				}
				readOnly={true}
				name="loginValue"
				className="input"
				placeholder="some@email.com"
				type="email"
				onChange={handleChange}
			/>
			<Input
				title="Создан"
				value={
					new Date(file.created_at).toLocaleTimeString().slice(0, 5) +
					' ' +
					new Date(file.created_at).toLocaleDateString()
				}
				readOnly={true}
				name="passwordValue"
				className="input"
				placeholder="МБ"
				type="text"
			/>
			<button
				className="secondary__btn"
				onClick={downloadTxtFile}>
				Скачать текст
			</button>
		</div>
	);
}

export default JournalItem;
