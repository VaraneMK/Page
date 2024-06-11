import React, { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Stack } from '@chakra-ui/react';
import { getHistory } from '../../../redux/reducers/userSlice';
import { Link } from 'react-router-dom';

function Navbar({ isGuest }) {
	const userData = useSelector((state) => state.userSlice);
	const ref = useRef();
	const dispatch = useDispatch();
	const list = userData.fileHistory;
	const { isLoading } = userData;
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		dispatch(getHistory({ limit: 10, offset: offset, isGuest: isGuest }));
	}, [offset]);

	useEffect(() => {
		const handleScroll = (e) => {
			const scrollHeight = e.target.scrollHeight;
			const currentHeight = e.target.scrollTop + e.target.offsetHeight;

			if (currentHeight + 50 >= scrollHeight && !isLoading) {
				setOffset(offset + 10);
			}
		};
		ref.current.addEventListener('scroll', handleScroll);
		return () => ref.current?.removeEventListener('scroll', handleScroll);
	}, [offset]);

	return (
		<nav className={styles.navbar}>
			<div className={styles.title}>История запросов</div>
			{/* {list.count === 0 ? (
				<Stack width={'100%'}>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'6.93rem'}
						width={'100%'}
						borderRadius={'0.4rem'}
						fadeDuration={1}
					/>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'6.93rem'}
						borderRadius={'0.4rem'}
						fadeDuration={1}
					/>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'6.93rem'}
						borderRadius={'0.4rem'}
						fadeDuration={1}
					/>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'6.93rem'}
						borderRadius={'0.4rem'}
						fadeDuration={1}
					/>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'6.93rem'}
						borderRadius={'0.4rem'}
						fadeDuration={1}
					/>
					<Skeleton
						startColor="#eceff1"
						endColor="white"
						height={'6.93rem'}
						borderRadius={'0.4rem'}
						fadeDuration={1}
					/>
				</Stack>
			) : ( */}
			<div
				ref={ref}
				className={styles.items__list}>
				{list.count === 0 ? (
					<div className={styles.history__empty}>История пуста</div>
				) : (
					list.files?.map((el, id) => {
						return (
							<Link
								to={`/file/${el.id}`}
								key={id}
								className={styles.item}>
								<div className={styles.item__id}>#{el.id}</div>
								<span className={styles.item__text}>
									{el.name.length > 25 ? el.name.slice(0, 25) + '...' : el.name}
								</span>
								<span className={styles.item__datetime}>
									{new Date(el.created_at).toLocaleTimeString().slice(0, 5) +
										' ' +
										new Date(el.created_at).toLocaleDateString()}
								</span>
							</Link>
						);
					})
				)}
			</div>
			{/* )} */}
		</nav>
	);
}

export default Navbar;
