import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducer'

export const store = configureStore({
	reducer
})

store.subscribe(() => {
	const state = store.getState();
	localStorage.setItem('state', JSON.stringify(state));
})