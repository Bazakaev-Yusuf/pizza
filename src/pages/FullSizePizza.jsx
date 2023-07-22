import React from 'react';

import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';

import './Fullpizza.scss';

function FullSizePizza() {
	const [pizza, setPizza] = React.useState();

	const navigate = useNavigate();

	const poison = [
		'Вероятности отравления нет! Ни разу на этот продукт не поступало Жалоб! Можете смело есть данную пиццу',
		'Неплохое качество, но могло быть и лучше... Шанс отравится этой пиццой хоть и минимален но присутствует',
		'Бро тебе точно не сдобровать после поедания сие продукта... уж это мы тебе гарантируем!!!',
		'Говорят того кто попробовал ЭТО ждут мучения! Даже просто смотреть на это через монитор компьютера не безопасностно. По некоторым данным именно этот продукт стал причиной вымирания племени МАЙЙА! В теории может стать причиной начала зомби апокалипсиса... Тебе это не нужно бро, ОДУМАЙСЯ глупец',
	];

	const typeNames = ['тонкое', 'традиционное'];
	const { id } = useParams();

	//! Try Catch выдает ошибку почему-то...
	React.useEffect(() => {
		async function fetchFullPizza() {
			try {
				const { data } = await axios.get(
					'https://646a742d70b2302c85e5e9d1.mockapi.io/Pizzas_list/' + id,
				);
				setPizza(data);
			} catch (err) {
				alert(
					'Ошибка! Слишком долгое время ожидания. Нажмите ОК чтобы перейти на главную страницу',
				);
				navigate('/');
			}
		}

		fetchFullPizza();
	}, []);

	if (!pizza) {
		return (
			<div className='container'>
				<h1>Загрузка...</h1>
			</div>
		);
	}

	console.log(pizza);

	return (
		<div className='root'>
			<img
				className='pizza_img'
				src={pizza.imageUrl}
				alt='pizza_Icon'
			/>
			<div className='table'>
				<h2>{pizza.title}</h2>
				<div className='table-column'>
					<h4>Размеры</h4>
					<div className='table-info'>
						{pizza.sizes.map((i, idx) => {
							return <p key={idx}>{i} см</p>;
						})}
					</div>
				</div>
				<div className='table-column'>
					<h4>Тип теста</h4>
					<div className='table-info'>
						{pizza.types.map((i) => {
							return <p>{typeNames[i]} </p>;
						})}
					</div>
				</div>
				<div className='table-column'>
					<h4>Рейтинг</h4>
					<p className={pizza.rating < 5 ? 'low_rating' : 'height_rating'}>
						{pizza.rating}
					</p>
				</div>
				<div className='table-column'>
					<h4>Вероятность Отравления</h4>
					<p className='poison_risk'>{poison[pizza.risk]}</p>
				</div>
				<div className='table-column'>
					<h4>Цена</h4>
					<p>
						от <span className='low_rating'>{pizza.price}</span> ₽
					</p>
				</div>
			</div>
		</div>
	);
}

export default FullSizePizza;
