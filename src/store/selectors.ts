import { createSelector } from "@reduxjs/toolkit";
import { State } from "../types";

export const currentProjectSelector = createSelector(
	(state: State) => state.currentProject,
	(state: State) => state.projects,
	(currentProject, projects) => projects.find(project => project.id == currentProject)!
)