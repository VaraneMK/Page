import React from 'react';
import styles from './UnAuthPage.module.css';

import AuthPage from '../AuthForm/AuthForm';

function UnAuthPage() {
	return (
		<div className={styles.main}>
			<AuthPage />
		</div>
	);
}

export default UnAuthPage;
