import React from 'react';

import error_404 from '../../assets/img/not_found_pizza.png';

import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

function NotFoundInner() {
	return (
		<div className={styles.root}>
			{/* <h1 className={styles.root}>
				<span>&#129300;</span>
				<br />
				Ничего не найдено
			</h1> */}
			<Link to={'/'}>
				<img
					className={styles.error_btn}
					src={error_404}
					alt='error 404'
				/>
			</Link>
			<h1>Ничего не найдено!</h1>
			<br />
			<h3>Вернитесь на главную страницу</h3>
		</div>
	);
}

export default NotFoundInner;
