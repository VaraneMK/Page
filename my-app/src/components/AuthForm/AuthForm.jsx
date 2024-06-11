import React, { useEffect, useState } from 'react';
import styles from './AuthForm.module.css';
import { Input } from '../Ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../redux/reducers/userSlice';
import { Button, ChakraProvider, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function AuthForm() {
	const dispatch = useDispatch();
	const userData = useSelector((state) => state.userSlice);
	const { isAuthError } = userData;
	const toast = useToast();

	useEffect(() => {
		if (isAuthError === true) {
			toast({
				duration: 3000,
				title: 'Неверный логин или пароль',
				status: 'error',
				isClosable: true,
			});
		}
	}, [dispatch, isAuthError]);

	const [values, setValues] = useState({
		loginValue: '',
		passwordValue: '',
	});

	const { loginValue, passwordValue } = values;

	const handleChange = (name, value) => {
		setValues({ ...values, [name]: value });
	};

	const checkData = (e) => {
		e.preventDefault();

		setValues({ loginValue: '', passwordValue: '' });
		dispatch(setLogin(values));
	};

	return (
		<div className={styles.auth__page}>
			<ChakraProvider>
				<span className={styles.title}>Авторизация</span>
				<Input
					title="Логин"
					value={loginValue}
					name="loginValue"
					className="input"
					placeholder="some@email.com"
					type="email"
					onChange={handleChange}
				/>
				<Input
					title="Пароль"
					value={passwordValue}
					name="passwordValue"
					className="input"
					placeholder="•••••••••"
					type="password"
					onChange={handleChange}
				/>
				<div className={styles.btn__area}>
					<Link
						to="/"
						onClick={checkData}
						className="primary__btn">
						Войти
					</Link>
				</div>
			</ChakraProvider>
		</div>
	);
}

export default AuthForm;
