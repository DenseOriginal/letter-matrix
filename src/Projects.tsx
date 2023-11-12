import { classNames } from "./helpers/helpers";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { onAddProject, onDeleteProject, onSetCurrentProject } from "./store/actions";

const randomId = (length = 6) => {
	return Math.random().toString(36).substring(2, length + 2);
};

const defaultRows = 22
const defaultCols = 35

export const ProjectsList = () => {
	const projects = useAppSelector(state => state.projects);
	const currentProject = useAppSelector(state => state.currentProject);
	const dispatch = useAppDispatch();

	const addProject = () => {
		const name = prompt('Name?') || 'New project';
		const seed = Date.now();
		const id = randomId();

		dispatch(onAddProject({
			name,
			seed,
			id,
			sentences: [],
			rows: defaultRows,
			cols: defaultCols,
		}));

		dispatch(onSetCurrentProject(id));
	}

	const selectProject = (id: string) => {
		dispatch(onSetCurrentProject(id));
	}

	const deleteProject = (id: string) => {
		if (id == currentProject) {
			dispatch(onSetCurrentProject(undefined));
		}

		dispatch(onDeleteProject(id));
	}

	return <div className="absolute top-0 -left-6 -translate-x-full w-44">
		<div className="flex justify-between items-center">
			<h2>Projects</h2>
			<button onClick={addProject}>
				<i className="fa-solid fa-plus"></i>
			</button>
		</div>
		<hr />
		<ul>
			{projects.map(project => <li key={project.name} className="flex justify-between items-center text-sm">
				<span
					className={classNames(currentProject == project.id && "text-red-700")}
				>{project.name}</span>
				<div className="flex gap-3">
					<button
						className="text-gray-500 hover:text-gray-700 transition-all"
						onClick={() => deleteProject(project.id)}
					>
						<i className="fa-solid fa-trash-can"></i>
					</button>
					<button
						className="text-gray-500 hover:text-gray-700 transition-all"
						onClick={() => selectProject(project.id)}
					>
						<i className="fa-solid fa-pencil"></i>
					</button>
				</div>
			</li>)}
		</ul>
	</div>
}
