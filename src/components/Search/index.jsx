import React from 'react';

import debounce from 'lodash.debounce';

import { setSearchValue } from '../../redux/slices/filterSlice';

import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';

function Search() {
	const dispatch = useDispatch();

	const [value, setValue] = React.useState('');

	const inputRef = React.useRef();

	const updateSearchValue = React.useCallback(
		debounce((str) => {
			dispatch(setSearchValue(str));
		}, 350),
		[],
	);

	const clearInput = () => {
		dispatch(setSearchValue(''));
		setValue('');
		inputRef.current.focus();
	};

	const onChangeInput = (e) => {
		setValue(e.target.value);
		updateSearchValue(e.target.value);
	};

	return (
		<div className={styles.root}>
			<svg
				className={styles.search}
				height='48'
				id='search'
				viewBox='0 0 48 48'
				width='48'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					className='vi-accent'
					d='M25.283,28.611L35.889,39.218l2.828-2.828L28.111,25.783Z'
				/>
				<path
					className='vi-primary'
					d='M20,32A12,12,0,1,1,32,20,12,12,0,0,1,20,32Zm0-20a8,8,0,1,0,8,8A8,8,0,0,0,20,12Z'
				/>
			</svg>
			<input
				value={value}
				ref={inputRef}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...'
				type='text'
			/>
			{value && (
				<svg
					className={styles.close}
					onClick={clearInput}
					height='512px'
					id='Layer_1'
					version='1.1'
					viewBox='0 0 512 512'
					width='512px'
					xmlns='http://www.w3.org/2000/svg'>
					<path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
				</svg>
			)}
		</div>
	);
}

export default Search;
