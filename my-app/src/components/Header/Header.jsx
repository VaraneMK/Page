import React from 'react';
import styles from './Header.module.css';
import { ReactComponent as Logo } from './../../svg/logo.svg';

import { Link } from 'react-router-dom';
import { AdminPanel, AuthPanel, GuestPanel, UserPanel } from './Links/Links';
import { ChakraProvider } from '@chakra-ui/react';

function Header({ isAuth, isAdmin, isGuest, setGuestMode }) {
	return (
		<div className={styles.header}>
			<ChakraProvider>
				<Link to="/">
					<Logo />
				</Link>

				<div className={styles.btn__area}>
					{isAuth ? (
						isAdmin ? (
							<AdminPanel />
						) : (
							<UserPanel />
						)
					) : isGuest ? (
						<GuestPanel setGuestMode={setGuestMode} />
					) : (
						<AuthPanel setGuestMode={setGuestMode} />
					)}
					{}
				</div>
			</ChakraProvider>
		</div>
	);
}

export default Header;
