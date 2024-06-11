import React, { useEffect } from 'react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react';
import { useState } from 'react';
import { Input } from '../../Ui/Input/Input';

import styles from './Modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../redux/reducers/userSlice';

function ModalWindow({ toast }) {
	const dispatch = useDispatch();
	const { isChangeError, isLoading } = useSelector((state) => state.userSlice);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [passwords, setPasswords] = useState({
		newPassword: '',
		repeatNewPassword: '',
	});

	const { newPassword, repeatNewPassword } = passwords;

	const handleChange = (name, value) => {
		setPasswords({ ...passwords, [name]: value });
	};

	useEffect(() => {
		if (isChangeError) {
			toast({
				duration: 3000,
				title: 'Ошибка. Попробуйте позже',
				status: 'error',
				isClosable: true,
			});
		}
	}, [isChangeError]);

	const onClick = () => {
		if (newPassword !== repeatNewPassword) {
			toast({
				duration: 3000,
				title: 'Пароли не совпадают',
				status: 'error',
				isClosable: true,
			});
		} else if (newPassword.length < 8) {
			toast({
				duration: 3000,
				title: 'Пароль должен содержать минимум 8 символов',
				status: 'warning',
				isClosable: true,
			});
		} else if (newPassword === repeatNewPassword) {
			dispatch(changePassword(newPassword));
			setPasswords({ newPassword: '', repeatNewPassword: '' });
			onClose();
		}
	};

	return (
		<div>
			<div
				className={styles.modal__btn}
				onClick={onOpen}>
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M4.66667 4.66667C4.66667 2.82572 6.15905 1.33334 8 1.33334C9.84095 1.33334 11.3333 2.82572 11.3333 4.66667V6.66667H12C13.1046 6.66667 14 7.5621 14 8.66667V12.6667C14 13.7712 13.1046 14.6667 12 14.6667H4C2.89543 14.6667 2 13.7712 2 12.6667V8.66667C2 7.5621 2.89543 6.66667 4 6.66667H4.66667V4.66667ZM6 6.66667H10V4.66667C10 3.5621 9.10457 2.66667 8 2.66667C6.89543 2.66667 6 3.5621 6 4.66667V6.66667ZM4 8C3.63181 8 3.33333 8.29848 3.33333 8.66667V12.6667C3.33333 13.0349 3.63181 13.3333 4 13.3333H12C12.3682 13.3333 12.6667 13.0349 12.6667 12.6667V8.66667C12.6667 8.29848 12.3682 8 12 8H4ZM8 9.33334C8.36819 9.33334 8.66667 9.63181 8.66667 10V11.3333C8.66667 11.7015 8.36819 12 8 12C7.63181 12 7.33333 11.7015 7.33333 11.3333V10C7.33333 9.63181 7.63181 9.33334 8 9.33334Z"
						fill="#3B454E"
					/>
				</svg>
				Сменить пароль
			</div>

			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay className={styles.modal__overlay} />
				<ModalContent
					maxWidth={'38rem'}
					className={styles.modal}>
					<ModalBody className={styles.modal__content}>
						<div className={styles.modal__title}>Смена пароля</div>
						<Input
							title="Новый пароль"
							value={newPassword}
							name="newPassword"
							className="input"
							placeholder="•••••••••"
							type="password"
							onChange={handleChange}
						/>
						<Input
							title="Повторите новый пароль"
							value={repeatNewPassword}
							name="repeatNewPassword"
							className="input"
							placeholder="•••••••••"
							type="password"
							onChange={handleChange}
						/>
						<div className={styles.btn__area}>
							<button
								onClick={onClick}
								className="primary__btn">
								Сменить пароль
							</button>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}

export default ModalWindow;
