import { Project } from "../types";

export const onAddProject = (project: Project) => ({
	type: 'ADD_PROJECT' as const,
	project
});

export const onSetCurrentProject = (id: string | undefined) => ({
	type: 'SET_CURRENT_PROJECT' as const,
	id
});

export const onUpdateProject = (id: string, update: Partial<Project>) => ({
	type: 'UPDATE_PROJECT' as const,
	id,
	update
});

export const onDeleteProject = (id: string) => ({
	type: 'DELETE_PROJECT' as const,
	id
});

export type ActionCreators =
	| typeof onAddProject
	| typeof onSetCurrentProject
	| typeof onUpdateProject
	| typeof onDeleteProject

export type Actions = ReturnType<ActionCreators>;
