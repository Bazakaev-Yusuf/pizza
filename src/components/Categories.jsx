import React from 'react';

function Categories({ value, onChangeCategory }) {
	const categories = [
		'Все',
		'Мясные',
		'Вегетарианская',
		'Гриль',
		'Острые',
		'Закрытые',
	];

	return (
		<div className='categories'>
			<ul>
				{categories.map((item, idx) => (
					<li
						key={idx}
						onClick={() => onChangeCategory(idx)}
						className={value === idx ? 'active' : ''}>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
