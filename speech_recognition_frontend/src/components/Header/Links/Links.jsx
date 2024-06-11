import { ReactComponent as Users } from './../../../svg/users.svg';
import { ReactComponent as Journal } from './../../../svg/journal.svg';
import { Link } from 'react-router-dom';

import { Menu, MenuButton, MenuList, MenuItem, useToast } from '@chakra-ui/react';
import ModalWindow from '../../Ui/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../../redux/reducers/userSlice';

export const AdminPanel = () => {
	const dispatch = useDispatch();
	const { login } = useSelector((state) => state.userSlice.data);
	const toast = useToast();
	return (
		<>
			<Link
				to="/users"
				className="tertiary__btn">
				<Users />
				Пользователи
			</Link>
			<Link
				to="/journal"
				className="tertiary__btn">
				<Journal />
				Журнал
			</Link>
			<Menu>
				<MenuButton className="secondary__btn">{login}</MenuButton>
				<MenuList className="menu">
					<MenuItem
						paddingInlineStart={'none'}
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
								d="M2.7076 7.33334H5.34478C5.39625 5.88421 5.61419 4.56299 5.95301 3.54654C6.01728 3.35372 6.08723 3.1678 6.16315 2.9913C4.32275 3.66632 2.95782 5.32674 2.7076 7.33334ZM7.99967 1.33334C4.31778 1.33334 1.33301 4.3181 1.33301 8C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8C14.6663 4.3181 11.6816 1.33334 7.99967 1.33334ZM7.99967 2.66667C7.99967 2.66667 8.00357 2.66679 8.00987 2.66871C8.0173 2.67097 8.03197 2.67655 8.05396 2.69005C8.10006 2.71835 8.16936 2.77606 8.25456 2.88416C8.42803 3.10428 8.61341 3.46411 8.78143 3.96818C9.06817 4.82838 9.26936 6.00184 9.32034 7.33334H6.67901C6.72999 6.00184 6.93118 4.82838 7.21792 3.96818C7.38594 3.46411 7.57132 3.10428 7.74479 2.88416C7.82999 2.77606 7.89929 2.71835 7.94539 2.69005C7.96737 2.67655 7.98205 2.67097 7.98948 2.66871C7.99638 2.6666 7.99967 2.66667 7.99967 2.66667ZM5.34478 8.66667H2.7076C2.95782 10.6733 4.32275 12.3337 6.16315 13.0087C6.08723 12.8322 6.01728 12.6463 5.95301 12.4535C5.61419 11.437 5.39625 10.1158 5.34478 8.66667ZM10.6546 7.33334C10.6031 5.88421 10.3852 4.56299 10.0463 3.54654C9.98207 3.35372 9.91212 3.1678 9.8362 2.9913C11.6766 3.66631 13.0415 5.32674 13.2917 7.33334H10.6546ZM13.2917 8.66667C13.0415 10.6733 11.6766 12.3337 9.8362 13.0087L13.2917 8.66667ZM6.67901 8.66667C6.72999 9.99817 6.93118 11.1716 7.21792 12.0318C7.38594 12.5359 7.57132 12.8957 7.74479 13.1158C7.82999 13.2239 7.89929 13.2817 7.94539 13.31C7.96737 13.3235 7.98205 13.329 7.98948 13.3313C8.33301 13 9.33301 8.66667 9.33301 8.66667"
								fill="#3B454E"
							/>
						</svg>
						<Link to="/">На сайт</Link>
					</MenuItem>
					<MenuItem
						paddingInlineStart={'none'}
						className="menu__item">
						<ModalWindow toast={toast} />
					</MenuItem>
					<Link
						to="/"
						className="menu__item"
						onClick={() => {
							localStorage.removeItem('jwt_token');
							dispatch(userLogout());
						}}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M4.00016 3.33333C3.26378 3.33333 2.66683 3.93029 2.66683 4.66667V11.3333C2.66683 12.0697 3.26378 12.6667 4.00016 12.6667H6.66683C7.40321 12.6667 8.00016 12.0697 8.00016 11.3333V10.6667C8.00016 10.2985 8.29864 10 8.66683 10C9.03502 10 9.3335 10.2985 9.3335 10.6667V11.3333C9.3335 12.8061 8.13959 14 6.66683 14H4.00016C2.5274 14 1.3335 12.8061 1.3335 11.3333V4.66667C1.3335 3.19391 2.5274 2 4.00016 2H6.66683C8.13959 2 9.3335 3.19391 9.3335 4.66667V5.33333C9.3335 5.70152 9.03502 6 8.66683 6C8.29864 6 8.00016 5.70152 8.00016 5.33333V4.66667C8.00016 3.93029 7.40321 3.33333 6.66683 3.33333H4.00016ZM10.8621 4.86193C11.1224 4.60158 11.5446 4.60158 11.8049 4.86193L14.4716 7.5286C14.7319 7.78895 14.7319 8.21106 14.4716 8.4714L11.8049 11.1381C11.5446 11.3984 11.1224 11.3984 10.8621 11.1381C10.6017 10.8777 10.6017 10.4556 10.8621 10.1953L12.3907 8.66667L4.66683 8.66667C4.29864 8.66667 4.00016 8.36819 4.00016 8C4.00016 7.63181 4.29864 7.33333 4.66683 7.33333L12.3907 7.33333L10.8621 5.80474C10.6017 5.54439 10.6017 5.12228 10.8621 4.86193Z"
								fill="#3B454E"
							/>
						</svg>
						Выйти
					</Link>
				</MenuList>
			</Menu>
		</>
	);
};

export const UserPanel = () => {
	const dispatch = useDispatch();
	const toast = useToast();
	const { login } = useSelector((state) => state.userSlice.data);
	return (
		<>
			<Link
				to="/"
				className="primary__btn">
				Распознать
			</Link>
			<Menu>
				<MenuButton className="secondary__btn">{login}</MenuButton>
				<MenuList className="menu">
					<div className="menu__item">
						<ModalWindow toast={toast} />
					</div>
					<Link
						to="/"
						className="menu__item"
						onClick={() => {
							localStorage.removeItem('jwt_token');
							dispatch(userLogout());
						}}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 16 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M4.00016 3.33333C3.26378 3.33333 2.66683 3.93029 2.66683 4.66667V11.3333C2.66683 12.0697 3.26378 12.6667 4.00016 12.6667H6.66683C7.40321 12.6667 8.00016 12.0697 8.00016 11.3333V10.6667C8.00016 10.2985 8.29864 10 8.66683 10C9.03502 10 9.3335 10.2985 9.3335 10.6667V11.3333C9.3335 12.8061 8.13959 14 6.66683 14H4.00016C2.5274 14 1.3335 12.8061 1.3335 11.3333V4.66667C1.3335 3.19391 2.5274 2 4.00016 2H6.66683C8.13959 2 9.3335 3.19391 9.3335 4.66667V5.33333C9.3335 5.70152 9.03502 6 8.66683 6C8.29864 6 8.00016 5.70152 8.00016 5.33333V4.66667C8.00016 3.93029 7.40321 3.33333 6.66683 3.33333H4.00016ZM10.8621 4.86193C11.1224 4.60158 11.5446 4.60158 11.8049 4.86193L14.4716 7.5286C14.7319 7.78895 14.7319 8.21106 14.4716 8.4714L11.8049 11.1381C11.5446 11.3984 11.1224 11.3984 10.8621 11.1381C10.6017 10.8777 10.6017 10.4556 10.8621 10.1953L12.3907 8.66667L4.66683 8.66667C4.29864 8.66667 4.00016 8.36819 4.00016 8C4.00016 7.63181 4.29864 7.33333 4.66683 7.33333L12.3907 7.33333L10.8621 5.80474C10.6017 5.54439 10.6017 5.12228 10.8621 4.86193Z"
								fill="#3B454E"
							/>
						</svg>
						Выйти
					</Link>
				</MenuList>
			</Menu>
		</>
	);
};

export const AuthPanel = ({ setGuestMode }) => {
	const { authStatus } = useSelector((state) => state.adminSlice);
	return (
		<>
			{!authStatus ? (
				<Link
					to="/"
					className="secondary__btn"
					onClick={() => {
						setGuestMode(true);
					}}>
					Гостевой доступ
				</Link>
			) : (
				<></>
			)}
		</>
	);
};

export const GuestPanel = ({ setGuestMode }) => {
	return (
		<>
			<Link
				to="/"
				className="secondary__red_btn"
				onClick={() => {
					setGuestMode(false);
				}}>
				Выйти для авторизации
			</Link>
		</>
	);
};
