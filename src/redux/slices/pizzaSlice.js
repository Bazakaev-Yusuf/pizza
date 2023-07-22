import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzas',
	async (params) => {
		const { order, sortBy, category, search, currentPage } = params;

		const { data } = await axios.get(
			`https://646a742d70b2302c85e5e9d1.mockapi.io/Pizzas_list?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
		);
		return data;
	},
);

const initialState = {
	items: [],
	status: 'loading', // loading | success | error
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, { payload }) {
			state.items = payload;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, { payload }) => {
				state.items = payload;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},

	//* Reux RTK предупреждал что данный способ будет удален в версии 2.0 и он считается утаревшим/устаривающим
	// {
	// 	[fetchPizzas.pending]: (state) => {
	// 		state.status = 'loading';
	// 		state.items = [];
	// 	},

	// 	[fetchPizzas.fulfilled]: (state, { payload }) => {
	// 		state.items = payload;
	// 		state.status = 'success';
	// 	},

	// 	[fetchPizzas.rejected]: (state) => {
	// 		state.status = 'error';
	// 		state.items = [];
	// 	},
	// },
});

export const selectPizza = (state) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
