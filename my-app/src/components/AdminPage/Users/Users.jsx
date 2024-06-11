import React, { useEffect, useState } from 'react';
import styles from './Users.module.css';
import { ReactComponent as Globe } from './../../../svg/globe.svg';
import { ReactComponent as Check } from './../../../svg/check.svg';
import {
	ChakraProvider,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Skeleton,
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, setAuthStatus } from '../../../redux/reducers/adminSlice';
import PaginationBar from '../../Ui/PaginationBar/PaginationBar';
import CreateUser from '../../Ui/CreateUserModal/CreateUser';

function Users() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.adminSlice);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		handleChange();
	}, [currentPage]);

	const limit = 10;
	const skeletonArray = [];
	for (let i = 0; i < limit; i++) {
		skeletonArray.push(
			<Tr key={i}>
				<td>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'48px'}
						width={'100%'}
						fadeDuration={1}
					/>
				</td>
				<td>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'48px'}
						width={'100%'}
						fadeDuration={1}
					/>
				</td>
				<td>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'48px'}
						width={'100%'}
						fadeDuration={1}
					/>
				</td>
				<td>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'48px'}
						width={'100%'}
						fadeDuration={1}
					/>
				</td>
			</Tr>,
		);
	}

	const handleChange = () => {
		dispatch(getUsers({ limit: limit, offset: (currentPage - 1) * limit }));
	};

	return (
		<div className="tablepage__content">
			<div className="content__header">
				<ChakraProvider>
					<Menu>
						<MenuButton className={styles.globe}>
							{data.authStatus ? (
								<svg
									width="48"
									height="48"
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
							) : (
								<Globe />
							)}
						</MenuButton>
						<MenuList
							className="menu"
							position={'absolute'}
							left={'-12rem'}>
							<MenuItem
								paddingInlineStart={'none'}
								className="menu__item"
								onClick={() => dispatch(setAuthStatus(false))}>
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
								Публичный
								{!data.authStatus ? <Check className={styles.check} /> : null}
							</MenuItem>
							<MenuItem
								paddingInlineStart={'none'}
								className="menu__item"
								onClick={() => dispatch(setAuthStatus(true))}>
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
								Авторизованные
								{data.authStatus ? <Check className={styles.check} /> : null}
							</MenuItem>
						</MenuList>
					</Menu>
					<span className="tablepage__title">Пользователи</span>
					<CreateUser />
				</ChakraProvider>
			</div>
			<TableContainer>
				<Table className="table">
					<Thead className="table__header">
						<Tr>
							<Th className="header__item">Логин</Th>
							<Th className="header__item">Роль</Th>
							<Th className="header__item">Статус</Th>
							<Th
								className="header__item"
								textAlign={'right'}>
								Последний вход
							</Th>
						</Tr>
					</Thead>
					<Tbody className="table__body">
						{data.isLoading ? (
							<>{skeletonArray}</>
						) : (
							data.users.users?.map((el, index) => {
								return (
									<Tr
										key={index}
										className="body__row">
										<Td className="body__item">
											<Link
												to={`/users/${el.id}`}
												className="item__link">
												{el.login}
											</Link>
										</Td>
										<Td className="body__item">
											<Link
												to={`/users/${el.id}`}
												className="item__link">
												{el.role === 'ADMIN' ? 'Администратор' : 'Пользователь'}
											</Link>
										</Td>
										<Td className="body__item">
											<Link
												to={`/users/${el.id}`}
												className="item__link">
												{el.status === 'OK' ? (
													'Действует'
												) : (
													<span className="red__text">Заблокирован</span>
												)}
											</Link>
										</Td>
										<Td className="body__item">
											<Link
												to={`/users/${el.id}`}
												className="item__link">
												{new Date(el.last_login).toLocaleTimeString().slice(0, 5) +
													' ' +
													new Date(el.last_login).toLocaleDateString()}
											</Link>
										</Td>
									</Tr>
								);
							})
						)}
					</Tbody>
				</Table>
			</TableContainer>
			{data.users.count / limit < 1 ? null : (
				<PaginationBar
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					limit={limit}
					totalCount={data.users.count}
					handleChange={handleChange}
				/>
			)}
		</div>
	);
}

export default Users;
