import { useMemo, useState } from 'react';
import { distribute, hash } from './helpers/helpers';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { Out } from './Out';
import { ProjectsList } from './Projects';
import { Sentences } from './Sentences';
import { Settings } from './Settings';
import { onUpdateProject } from './store/actions';
import { Project as ProjectType } from './types';

function App() {
	const currentProject = useAppSelector(state => state.projects.find(project => project.id == state.currentProject));

	return (
		<div className='relative flex items-center flex-col py-5'>
			<h1 className='text-3xl font-bold'>Letter Matrix Generator</h1>

			<div className='relative w-full'>
				<ProjectsList />
				{currentProject ? <Project /> : <NoProject />}
			</div>
		</div>
	)
}

export default App

const NoProject = () => {
	return <div className='flex justify-center my-4'>
		<h2>No project selected</h2>
	</div>
}

const Project = () => {
	const dispatch = useAppDispatch();
	const { currentId, currentProject } = useAppSelector(state => ({
		currentId: state.currentProject!,
		currentProject: state.projects.find(project => project.id == state.currentProject)!,
	}));
	const { rows, cols, sentences } = currentProject;

	const updateProject = <K extends keyof ProjectType>(key: K) =>
		(value: ProjectType[K]) => dispatch(onUpdateProject(currentId, { [key]: value }));

	const setRows = updateProject('rows');
	const setColumns = updateProject('cols');
	const setSentences = updateProject('sentences');

	const [selected, setSelected] = useState('');
	const letters = useMemo(() => distribute(rows * cols, sentences), [sentences, rows, cols]);

	const add = (sentence: string) => setSentences([...sentences, sentence]);
	const remove = (sentence: string) => setSentences(sentences.filter(s => s != sentence));
	const highlight = (hash: string) => setSelected(hash);

	return <>
		<Settings
			add={add}
			setRows={setRows}
			setColumns={setColumns}
			rows={rows}
			columns={cols}
		/>
		<Sentences
			sentences={sentences}
			remove={remove}
			highlight={highlight}
		/>

		<Out code={letters} columns={cols} highlight={selected} />

		{/* Keys */}
		<div className='flex flex-col gap-3 mt-4 w-full'>
			<h2 className='w-full text-xl'>Keys</h2>
			{sentences.map(sentence => <Out
				code={letters}
				columns={cols}
				name={hash(sentence)}
				keyMode
				key={hash(sentence)}
			/>)}
		</div>
	</>
}
