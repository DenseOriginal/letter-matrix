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
	style: {
		background: string;
		text: string;
		border: boolean;
	}
}

export interface State {
	projects: Project[];
	currentProject: string | undefined;
}
