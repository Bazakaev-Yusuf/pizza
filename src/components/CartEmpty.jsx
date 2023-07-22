import React, { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import emptyIcon from '../assets/img/empty-cart.png';
import roflanPominki from '../assets/img/roflan-pominki.png';

function CartEmpty() {
	const navigate = useNavigate();

	useEffect(() => {
		const onKeyPress = (e) => {
			if (e.key === 'f') {
				navigate('/');
			}
		};

		document.body.addEventListener('keyup', onKeyPress);

		return () => {
			document.body.removeEventListener('keyup', onKeyPress);
		};
	}, []);

	return (
		<>
			<div className='cart cart--empty'>
				<h2>Корзина пустая !!!</h2>
				{/* <p>
					Вы не добавили ни одной пиццы в корзину.
					<br />
					Для того, чтобы добавить пиццу, перейди на главную страницу.
				</p> */}

				<h2>
					Press{' '}
					<span
						onClick={() => navigate('/')}
						className='cart--empty__F'>
						F
					</span>{' '}
					to pay respect
				</h2>
				<img
					src={roflanPominki}
					alt='Empty cart'
				/>
				<Link
					to='/'
					className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</>
	);
}

export default CartEmpty;
