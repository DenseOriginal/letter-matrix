import { useMemo, useState } from 'react';
import { distribute, hash } from './helpers/helpers';
import { useAppSelector } from './hooks/redux';
import { Out } from './Out';
import { ProjectsList } from './Projects';
import { Sentences } from './Sentences';
import { Settings } from './Settings';
import { currentProjectSelector } from './store/selectors';

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
	const { rows, cols, sentences, seed } = useAppSelector(currentProjectSelector);

	const [selected, setSelected] = useState('');
	const letters = useMemo(
		() => distribute(rows * cols, sentences, seed),
		[sentences, rows, cols]
	);

	const highlight = (hash: string) => setSelected(hash);

	return <section style={{maxWidth: "calc(100vw - 30rem)"}}>
		<Settings />
		<Sentences highlight={highlight} />

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
	</section>
}
