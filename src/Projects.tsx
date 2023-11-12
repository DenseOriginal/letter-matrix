import { useLocalStorage } from "./hooks";
import { Project } from "./types";

const randomId = (length = 6) => {
	return Math.random().toString(36).substring(2, length + 2);
};

export const Projects = () => {
	const [projects, setProjects] = useLocalStorage<Project[]>('projects', []);

	const addProject = () => {
		const name = prompt('Name?') || 'New project';
		const seed = Date.now().toString();
		const id = randomId();

			setProjects([
				...projects,
				{ name, seed, id, sentences: [] }
			])
	}

	const selectProject = (id: string) => {
		
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
				<span>{project.name}</span>
				<button className="text-gray-500 hover:text-gray-700 transition-all">
					<i className="fa-solid fa-pencil"></i>
				</button>
			</li>)}
		</ul>
	</div>
}
