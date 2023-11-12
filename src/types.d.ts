export interface Letter {
	char: string;
	parents: string[];
}

export interface Project {
	name: string;
	sentences: string[];
	seed: string;
	id: string;
}

export interface State {
	projects: Project[];
	currentProject: string | undefined;
}
