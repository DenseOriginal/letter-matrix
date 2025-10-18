import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { store } from '../store'
import { Project, State } from '../types'
import { actions } from '../store/reducer'

type AppDispatch = typeof store.dispatch

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<State> = useSelector

export const useCurrentProjectUpdater = <K extends DeepKeys<Project>>(prop: K) => {
	const dispatch = useAppDispatch();
	return (val: DeepValue<Project, K>) => {
		dispatch(actions.setCurrentProjectProp({
			prop,
			update: val
		}))
	}
}