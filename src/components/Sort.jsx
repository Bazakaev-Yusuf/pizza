import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { selectFilter, setSort } from '../redux/slices/filterSlice';

export const list = [
	{ name: 'популярности (мин.)', sortProperty: 'rating' },
	{ name: 'популярности (макс.)', sortProperty: '-rating' },
	{ name: 'цене (мин.)', sortProperty: 'price' },
	{ name: 'цене (макс.)', sortProperty: '-price' },
	{ name: 'алфавиту (мин.)', sortProperty: 'title' },
	{ name: 'алфавиту (макс.)', sortProperty: '-title' },
];

function Sort() {
	const dispatch = useDispatch();

	const { sort } = useSelector(selectFilter);

	const [open, setOpen] = React.useState(false);

	const sortRef = React.useRef(null);

	const sortListVisible = (obj) => {
		dispatch(setSort(obj));
		setOpen(false);
	};

	// ! FIXME: найти путь до элемента (path). при переносе в отдельную функцию не работает composedPath()...
	React.useEffect(() => {
		const handleClickOutside = (e) => {
			if (!sortRef.current.contains(e.target)) {
				setOpen(false);
			}
		};
		// слушатель события на body для отслеживания был ли клик на компоненте Sort
		if (setOpen) document.body.addEventListener('click', handleClickOutside);

		// удаления слушателя событий чтобы он не добавлялся если компонент закрыт
		return () =>
			document.body.removeEventListener('click', handleClickOutside);
	}, []);

	return (
		<div
			ref={sortRef}
			className='sort'>
			<div className='sort__label'>
				<svg
					width='10'
					height='6'
					viewBox='0 0 10 6'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z'
						fill='#2C2C2C'
					/>
				</svg>
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)}>{sort.name}</span>
			</div>
			{open && (
				<div className='sort__popup'>
					<ul>
						{list.map((obj, idx) => (
							<li
								key={idx}
								onClick={() => sortListVisible(obj)}
								className={
									sort.sortProperty === obj.sortProperty
										? 'active'
										: ''
								}>
								{obj.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Sort;
