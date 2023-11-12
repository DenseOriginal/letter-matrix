import { useMemo, useState } from 'react';
import { distribute, hash } from './helpers';
import { useAppSelector } from './hooks/redux';
import { Out } from './Out';
import { ProjectsList } from './Projects';
import { Sentences } from './Sentences';
import { Settings } from './Settings';

const initialSentences = [
	"Lorem ipsum dolor amet",
];

function App() {
	const state = useAppSelector(state => state);
	const currentProject = state.projects.find(project => project.id == state.currentProject);

	return (
		<div className='relative flex justify-center flex-col py-5'>
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
	const [rows, setRows] = useState(22);
	const [columns, setColumns] = useState(35);
	const [sentences, setSentences] = useState(initialSentences);
	const [selected, setSelected] = useState('');
	const letters = useMemo(() => distribute(rows * columns, sentences), [sentences, rows, columns]);

	const add = (sentence: string) => setSentences(sentences => [...sentences, sentence]);
	const remove = (sentence: string) => setSentences(sentences => sentences.filter(s => s != sentence));
	const highlight = (hash: string) => setSelected(hash);

	return <>
		<Settings
			add={add}
			setRows={setRows}
			setColumns={setColumns}
			rows={rows}
			columns={columns}
		/>
		<Sentences
			sentences={sentences}
			remove={remove}
			highlight={highlight}
		/>

		<Out code={letters} columns={columns} highlight={selected} />

		{/* Keys */}
		<div className='flex flex-col gap-3 mt-4 w-full'>
			<h2 className='w-full text-xl'>Keys</h2>
			{sentences.map(sentence => <Out
				code={letters}
				columns={columns}
				name={hash(sentence)}
				keyMode
				key={hash(sentence)}
			/>)}
		</div>
	</>
}
