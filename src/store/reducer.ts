import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project, State } from "../types";

const localStorageState = localStorage.getItem('state') || '{}';
const parsedState = JSON.parse(localStorageState);

const jasonMapper = (state: any) => ({
	...state,
	projects: state.projects.map((project: any) => ({
		...project,
		style: project.style || { background: "#202029", text: "#ffffff", border: false },
	}))
})

const initialState: State = {
	// Fallback state
	projects: [],

	// State from localStorage
	...jasonMapper(parsedState),

	// Overwrite localStorage state with default state
	currentProject: undefined
}

const slice = createSlice({
	name: "letter-matrix",
	initialState,
	reducers: {
		addProject: (state, action: PayloadAction<Project>) => {
			state.projects.push(action.payload);
		},
		setCurrentProject: (state, action: PayloadAction<string | undefined>) => {
			state.currentProject = action.payload;
		},
		updateProject: (state, action: PayloadAction<{ id: string, update: Partial<Project> }>) => {
			state.projects = state.projects.map(
				project => project.id == action.payload.id ?
					{ ...project, ...action.payload.update } :
					project
			);
		},
		updateCurrentProject: (state, action: PayloadAction<Partial<Project>>) => {
			state.projects = state.projects.map(
				project => project.id == state.currentProject ?
					{ ...project, ...action.payload } :
					project
			);
		},
		setCurrentProjectProp: <K extends DeepKeys<Project>>(state: State, action: PayloadAction<{ prop: K, update: DeepValue<Project, K> }>) => {
			const currentProject = state.projects.find(cur => cur.id == state.currentProject);
			if (!currentProject) return;
			
			const splitPaths = action.payload.prop.split(".");
			let current: Record<string, any> = currentProject;
			while(splitPaths.length > 1) {
				const key = splitPaths.shift()!;
				current = current[key];
			}

			const lastKey = splitPaths[0];
			current[lastKey] = action.payload.update;
		},
		deleteProject: (state, action: PayloadAction<string>) => {
			state.projects = state.projects.filter(project => project.id != action.payload);
		}
	}

})

export const reducer = slice.reducer;
export const actions = slice.actions;
