import { configureStore } from '@reduxjs/toolkit'
import { State } from '../types'
import { Actions } from './actions'
import { reducer } from './reducer'

export const store = configureStore<State, Actions>({
	reducer
})
