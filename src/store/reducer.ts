import { State } from "../types";
import { Actions } from "./actions";

const localStorageState = localStorage.getItem('state') || '{}';
const parsedState = JSON.parse(localStorageState);

const initialState: State = {
	// Fallback state
	projects: [],

	// State from localStorage
	...parsedState,

	// Overwrite localStorage state with default state
	currentProject: undefined
}

const setState = (state: State, update: Partial<State>) => {
	const newState = { ...state, ...update };
	localStorage.setItem('state', JSON.stringify(state));
	return newState;
}

export const reducer = (state: State = initialState, action: Actions) => {
	switch (action.type) {
		case 'ADD_PROJECT':
			return setState(state, {
				projects: [...state.projects, action.project]
			});
		case 'SET_CURRENT_PROJECT':
			return setState(state, {
				currentProject: action.id
			});
		case 'UPDATE_PROJECT':
			return setState(state, {
				projects: state.projects.map(project => {
					if (project.id === action.id) {
						return { ...project, ...action.update };
					}
					return project;
				})
			});
		case 'DELETE_PROJECT':
			return setState(state, {
				projects: state.projects.filter(project => project.id !== action.id)
			});
		default:
			return state;
	}
}
