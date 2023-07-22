import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	totalItems: 0,
	totalPrice: 0,
	items: [],
};
//! доделать функции удаления прибавления и отбавления товара для корректного отображения общего количества товаров в карзине!
//* Вроде все работает теперь...
const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, { payload }) {
			const findItem = state.items.find((obj) => obj.id === payload.id);
			state.totalItems++;

			if (findItem) {
				findItem.count++;
			} else {
				state.items.push({
					...payload,
					count: 1,
				});
			}

			state.totalPrice = state.items.reduce((acc, val) => {
				return val.price * val.count + acc;
			}, 0);
		},
		plusItem(state, { payload }) {
			const findItem = state.items.find((obj) => obj.id === payload.id);

			if (findItem) {
				findItem.count++;
				state.totalItems++;
				state.totalPrice = state.items.reduce((acc, val) => {
					return val.price * val.count + acc;
				}, 0);
			}
		},
		minusItem(state, { payload }) {
			const findItem = state.items.find((obj) => obj.id === payload.id);

			if (findItem) {
				if (findItem.count !== 1) {
					findItem.count--;
					state.totalItems--;
					state.totalPrice = state.items.reduce((acc, val) => {
						return val.price * val.count + acc;
					}, 0);
				}
			}
		},
		removeItem(state, { payload }) {
			state.items = state.items.filter((obj) => obj.id !== payload);
			state.totalItems = state.items.reduce((acc, val) => {
				return acc + val.count;
			}, 0);
			state.totalPrice = state.items.reduce((acc, val) => {
				return val.price * val.count + acc;
			}, 0);
		},
		clearItems(state) {
			state.totalItems = 0;
			state.totalPrice = 0;
			state.items = [];
		},
	},
});

export const selectCart = (state) => state.cart;
export const selectCartItemById = (id) => (state) =>
	state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, clearItems, plusItem, minusItem } =
	cartSlice.actions;

export default cartSlice.reducer;
