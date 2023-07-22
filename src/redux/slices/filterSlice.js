import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярности',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setCategoryId(state, { payload }) {
			state.categoryId = payload;
		},
		setSearchValue(state, { payload }) {
			state.searchValue = payload;
		},
		setSort(state, { payload }) {
			state.sort = payload;
		},
		setCurrentPage(state, { payload }) {
			state.currentPage = payload;
		},
		setFilters(state, { payload }) {
			state.sort = payload.sort;
			state.currentPage = Number(payload.currentPage);
			state.categoryId = Number(payload.categoryId);
		},
	},
});

export const selectFilter = (state) => state.filter;

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
