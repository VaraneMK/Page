import styles from './Input.module.css';
// import { ReactComponent as Error } from './../../../svg/error-circle.svg';
import React, { useState } from 'react';

import { ReactComponent as View } from './../../../svg/view.svg';

export const Input = ({
	value,
	name,
	onChange,
	className,
	placeholder,
	type,
	errorText,
	error,
	onKeyDown,
	title,
	viewIcon,
	readOnly,
}) => {
	function handleChange(e) {
		onChange(name, e.target.value.trim());
	}

	const [view, setView] = useState(true);

	return (
		<div className={styles.input__form}>
			<div className={styles.title}>{title}</div>
			<div className={styles.input__area}>
				<div className="input__group">
					<input
						value={value}
						onChange={handleChange}
						className={className}
						placeholder={placeholder}
						onKeyDown={onKeyDown}
						type={view ? type : 'text'}
						readOnly={readOnly}
					/>
					{viewIcon && (
						<View
							className={styles.view}
							onClick={() => {
								setView(!view);
							}}
						/>
					)}
				</div>

				{/* {error && <Error />} */}
				{error && (
					<div className={styles.error__text}>
						<p>{errorText}</p>
					</div>
				)}
			</div>
		</div>
	);
};
