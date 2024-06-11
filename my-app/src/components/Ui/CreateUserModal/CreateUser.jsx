import React, { useEffect, useState } from 'react';
import styles from './CreateUser.module.css';
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '../Input/Input';
import { ReactComponent as Check } from './../../../svg/check.svg';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { createUser } from '../../../redux/reducers/adminSlice';

function CreateUser() {
	const dispatch = useDispatch();
	const toast = useToast();
	const { createError } = useSelector((state) => state.adminSlice);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [values, setValues] = useState({
		loginValue: '',
		passwordValue: '',
		role: 'DEFAULT',
	});

	const { loginValue, passwordValue } = values;

	// const handleChange = (name, value) => {
	// 	setPasswords({ ...passwords, [name]: value });
	// };

	useEffect(() => {
		if (createError) {
			toast({
				duration: 3000,
				title: 'Ошибка. Попробуйте позже',
				status: 'error',
				isClosable: true,
			});
		}
	}, [createError]);

	const handleChange = (name, value) => {
		setValues({ ...values, [name]: value });
	};

	const onClick = () => {
		if (loginValue < 5) {
			toast({
				duration: 3000,
				title: 'Логин должен содержать минимум 5 символов',
				status: 'warning',
				isClosable: true,
			});
		} else if (passwordValue.length < 8) {
			toast({
				duration: 3000,
				title: 'Пароль должен содержать минимум 8 символов',
				status: 'warning',
				isClosable: true,
			});
		} else {
			dispatch(createUser(values));

			onClose();
		}
	};

	return (
		<div>
			<div
				className="primary__btn"
				onClick={onOpen}>
				+ Создать
			</div>

			<Modal
				isOpen={isOpen}
				onClose={onClose}>
				<ModalOverlay className={styles.modal__overlay} />
				<ModalContent
					maxWidth={'38rem'}
					maxHeight={'46rem'}
					className={styles.modal}>
					<ModalBody
						height={'auto'}
						className={styles.modal__content}>
						<div className={styles.modal__title}>Создать пользователя</div>
						<Input
							title="Логин"
							value={loginValue}
							name="loginValue"
							className="input__user"
							placeholder="some@email.com"
							type="email"
							onChange={handleChange}
						/>
						<Input
							title="Пароль"
							value={passwordValue}
							name="passwordValue"
							className="input__user"
							placeholder="•••••••••"
							type="password"
							onChange={handleChange}
							viewIcon={true}
						/>
						<div className={styles.select__area}>
							<div className={styles.area__title}>Роль</div>
							<Menu>
								<MenuButton className={styles.menu__btn}>
									{values.role === 'DEFAULT' ? <span>Пользователь</span> : <span>Администратор</span>}
									<ChevronDownIcon className={styles.arrow} />
								</MenuButton>
								<MenuList
									className={styles.menu}
									width={'28rem'}>
									<MenuItem
										paddingInlineStart={'none'}
										onClick={() => {
											setValues({ ...values, role: 'ADMIN' });
										}}
										className="menu__item">
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M7.55502 1.46613C7.80814 1.23958 8.19113 1.23958 8.44424 1.46613C9.74209 2.62776 11.4544 3.33331 13.333 3.33331C13.4599 3.33331 13.586 3.33009 13.7112 3.32374C14.0272 3.30771 14.311 3.51612 14.3903 3.8225C14.5706 4.51899 14.6663 5.2488 14.6663 6C14.6663 10.0392 11.9037 13.4315 8.16585 14.3936C8.05684 14.4216 7.94251 14.4216 7.8335 14.3936C4.09565 13.4315 1.33301 10.0392 1.33301 6C1.33301 5.24877 1.42874 4.51892 1.60903 3.82242C1.68834 3.51603 1.97212 3.30763 2.2882 3.32366C2.41339 3.33001 2.53946 3.33323 2.66634 3.33323C4.54495 3.33323 6.25718 2.62771 7.55502 1.46613ZM2.78731 4.66573C2.7079 5.098 2.66634 5.5439 2.66634 6C2.66634 9.35602 4.9213 12.187 7.99968 13.0575C11.0781 12.187 13.333 9.35602 13.333 6C13.333 5.54392 13.2915 5.09805 13.2121 4.66581C11.2479 4.63892 9.44051 3.95798 7.99962 2.83168C6.55875 3.95793 4.75143 4.63884 2.78731 4.66573ZM10.4711 6.19526C10.7314 6.45561 10.7314 6.87772 10.4711 7.13807L7.80441 9.80474C7.54406 10.0651 7.12195 10.0651 6.8616 9.80474L5.52827 8.47141C5.26792 8.21106 5.26792 7.78895 5.52827 7.5286C5.78862 7.26825 6.21073 7.26825 6.47108 7.5286L7.33301 8.39053L9.52827 6.19526C9.78862 5.93492 10.2107 5.93492 10.4711 6.19526Z"
												fill="#38A169"
											/>
										</svg>
										Администратор
										{values.role === 'ADMIN' ? <Check className={styles.check} /> : null}
									</MenuItem>
									<MenuItem
										paddingInlineStart={'none'}
										onClick={() => {
											setValues({ ...values, role: 'DEFAULT' });
										}}
										className="menu__item">
										<svg
											width="16"
											height="16"
											viewBox="0 0 16 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M8.00033 2.66667C6.89576 2.66667 6.00033 3.5621 6.00033 4.66667C6.00033 5.77124 6.89576 6.66667 8.00033 6.66667C9.10489 6.66667 10.0003 5.77124 10.0003 4.66667C10.0003 3.5621 9.10489 2.66667 8.00033 2.66667ZM4.66699 4.66667C4.66699 2.82572 6.15938 1.33333 8.00033 1.33333C9.84127 1.33333 11.3337 2.82572 11.3337 4.66667C11.3337 6.50762 9.84127 8 8.00033 8C6.15938 8 4.66699 6.50762 4.66699 4.66667ZM4.05563 13.3333H11.945C11.6276 11.4415 9.98232 10 8.00033 10C6.01833 10 4.37302 11.4415 4.05563 13.3333ZM2.66699 14C2.66699 11.0545 5.05481 8.66667 8.00033 8.66667C10.9458 8.66667 13.3337 11.0545 13.3337 14C13.3337 14.3682 13.0352 14.6667 12.667 14.6667H3.33366C2.96547 14.6667 2.66699 14.3682 2.66699 14Z"
												fill="#2B6CB0"
											/>
										</svg>
										Пользователь
										{values.role === 'DEFAULT' ? <Check className={styles.check} /> : null}
									</MenuItem>
								</MenuList>
							</Menu>
						</div>
						<div className={styles.btn__area}>
							<button
								onClick={onClick}
								className="primary__btn">
								Создать
							</button>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}

export default CreateUser;
