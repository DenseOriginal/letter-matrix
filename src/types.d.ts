export interface Letter {
	char: string;
	parents: string[];
}

export interface Project {
	name: string;
	sentences: string[];
	seed: number;
	id: string;
	rows: number;
	cols: number;
}

export interface State {
	projects: Project[];
	currentProject: string | undefined;
}
