import React, { useEffect, useState } from 'react';
import { Skeleton, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteHistory, getHistory } from '../../../redux/reducers/adminSlice';

import PaginationBar from '../../Ui/PaginationBar/PaginationBar';

function Journal() {
	const dispatch = useDispatch();
	const data = useSelector((state) => state.adminSlice);
	const [currentPage, setCurrentPage] = useState(1);
	const toast = useToast();

	useEffect(() => {
		handleChange();
	}, [currentPage]);

	useEffect(() => {
		if (data.isError) {
			toast({
				duration: 3000,
				title: 'Ошибка. Попробуйте позже',
				status: 'error',
				isClosable: true,
			});
		}
	}, [data.isError]);

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
		dispatch(getHistory({ limit: limit, offset: (currentPage - 1) * limit, is_history: false }));
	};

	return (
		<div className="tablepage__content">
			<div className="content__header">
				<span className="tablepage__title">Журнал</span>
				<button
					disabled={data.fileHistory.count === 0}
					onClick={() => {
						dispatch(deleteHistory());
					}}
					className="primary__red_btn">
					<svg
						width="16"
						height="16"
						viewBox="0 0 16 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M5.33333 2.66668C5.33333 1.9303 5.93029 1.33334 6.66667 1.33334H9.33333C10.0697 1.33334 10.6667 1.9303 10.6667 2.66668V4.00001H12.6598C12.6639 3.99997 12.668 3.99997 12.6722 4.00001H13.3333C13.7015 4.00001 14 4.29849 14 4.66668C14 5.03487 13.7015 5.33334 13.3333 5.33334H13.2874L12.7534 12.8092C12.6787 13.8558 11.8078 14.6667 10.7585 14.6667H5.24149C4.19221 14.6667 3.32133 13.8558 3.24657 12.8092L2.71259 5.33334H2.66667C2.29848 5.33334 2 5.03487 2 4.66668C2 4.29849 2.29848 4.00001 2.66667 4.00001H3.32783C3.33197 3.99997 3.33609 3.99997 3.34021 4.00001H5.33333V2.66668ZM4.04932 5.33334L4.57652 12.7142C4.60144 13.063 4.89173 13.3333 5.24149 13.3333H10.7585C11.1083 13.3333 11.3986 13.063 11.4235 12.7142L11.9507 5.33334H4.04932ZM9.33333 4.00001H6.66667V2.66668H9.33333V4.00001ZM6.66667 6.66668C7.03486 6.66668 7.33333 6.96515 7.33333 7.33334V11.3333C7.33333 11.7015 7.03486 12 6.66667 12C6.29848 12 6 11.7015 6 11.3333V7.33334C6 6.96515 6.29848 6.66668 6.66667 6.66668ZM9.33333 6.66668C9.70152 6.66668 10 6.96515 10 7.33334V11.3333C10 11.7015 9.70152 12 9.33333 12C8.96514 12 8.66667 11.7015 8.66667 11.3333V7.33334C8.66667 6.96515 8.96514 6.66668 9.33333 6.66668Z"
							fill="white"
						/>
					</svg>
					Очистить
				</button>
			</div>
			<TableContainer>
				<Table className="table">
					<Thead className="table__header">
						<Tr>
							<Th className="header__item">Идентификатор</Th>
							<Th className="header__item">Владелец</Th>
							<Th className="header__item">Размер</Th>
							<Th className="header__item">Статус</Th>
							<Th
								className="header__item"
								textAlign={'right'}>
								Создан
							</Th>
						</Tr>
					</Thead>
					<Tbody className="table__body">
						{data.isLoading ? (
							<>{skeletonArray}</>
						) : (
							data.fileHistory?.files?.map((el, index) => {
								return (
									<Tr
										key={index}
										className="body__row">
										<Td className="body__item">
											<Link
												to={`/admin/file/${el.id}`}
												className="item__link">
												{el.id}
											</Link>
										</Td>
										<Td className="body__item">
											<Link
												to={`/admin/file/${el.id}`}
												className="item__link">
												{el.owner}
											</Link>
										</Td>
										<Td className="body__item">
											<Link
												to={`/admin/file/${el.id}`}
												className="item__link">
												{(el.size * 0.000001).toFixed(2)} МБ
											</Link>
										</Td>
										<Td className="body__item">
											<Link
												to={`/admin/file//${el.id}`}
												className="item__link">
												{el.status === 'NEW' ? (
													<span>Новый</span>
												) : el.status === 'RUNNING' ? (
													<span className="running__text">Запущен</span>
												) : el.status === 'OK' ? (
													<span className="ok__text">Выполнен</span>
												) : el.status === 'ERROR' ? (
													<span className="error_text">Ошибка</span>
												) : null}
											</Link>
										</Td>
										<Td className="body__item">
											<Link
												to={`/admin/file/${el.id}`}
												className="item__link">
												{new Date(el.created_at).toLocaleTimeString().slice(0, 5) +
													' ' +
													new Date(el.created_at).toLocaleDateString()}
											</Link>
										</Td>
									</Tr>
								);
							})
						)}
					</Tbody>
				</Table>
			</TableContainer>
			{data.fileHistory.count / limit < 1 ? null : (
				<PaginationBar
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					limit={limit}
					totalCount={data.fileHistory.count}
					handleChange={handleChange}
				/>
			)}
		</div>
	);
}

export default Journal;
