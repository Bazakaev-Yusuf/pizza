import React from 'react';

import qs from 'qs';

import { useNavigate, Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';

import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/Card/Skeleton';
import PizzaBlock from '../components/Card/PizzaBlock';
import Pagination from '../components/Pagination';

import { list } from '../components/Sort';

function Home() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);

	const { items, status } = useSelector(selectPizza);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (num) => {
		dispatch(setCurrentPage(num));
	};

	const getPizzas = () => {
		const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';

		const sortBy = sort.sortProperty.replace('-', '');

		const category = categoryId > 0 ? `category=${categoryId}` : '';

		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				order,
				sortBy,
				category,
				search,
				currentPage,
			}),
		);
	};

	React.useEffect(() => {
		if (isMounted.current) {
			const querySrting = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${querySrting}`);
		}
		isMounted.current = true;
	}, [categoryId, sort, currentPage, navigate]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = list.find(
				(obj) => obj.sortProperty === params.sortProperty,
			);

			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, [categoryId, sort, searchValue, currentPage, dispatch]);

	React.useEffect(() => {
		getPizzas();

		isSearch.current = false;
	}, [categoryId, sort, searchValue, currentPage]);

	const pizzas = items.map((obj) => (
		<PizzaBlock
			key={obj.id}
			{...obj}
		/>
	));

	const skeleton = [...new Array(4)].map((_, idx) => <Skeleton key={idx} />);

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					value={categoryId}
					onChangeCategory={onChangeCategory}
				/>
				<Sort />
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<div className='content__items'>
				{status === 'loading' ? skeleton : pizzas}
			</div>
			<Pagination
				currentPage={currentPage}
				onChangePage={onChangePage}
			/>
		</div>
	);
}

export default Home;
