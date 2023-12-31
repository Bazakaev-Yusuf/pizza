import React from 'react';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullSizePizza from './pages/FullSizePizza';
import MainLayout from './layout/MainLayout';

import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<MainLayout />}>
				<Route
					path=''
					element={<Home />}
				/>
				<Route
					path='cart'
					element={<Cart />}
				/>
				<Route
					path='pizza/:id'
					element={<FullSizePizza />}
				/>
				<Route
					path='*'
					element={<NotFound />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
