import { useMemo, useState } from 'react';
import { distribute, split } from './helpers';
import { LetterEl } from './Letter';
import { Sentences } from './Sentences';
import { Settings } from './Settings';

const initialSentences = [
	"Lorem ipsum dolor amet",
];

function App() {
	const [rows, setRows] = useState(22);
	const [columns, setColumns] = useState(35);
	const [sentences, setSentences] = useState(initialSentences);
	const [selected, setSelected] = useState('');
	const letters = useMemo(() => distribute(rows * columns, sentences), [sentences, rows, columns]);
	const letterRows = split(letters, columns);

	const add = (sentence: string) => setSentences(sentences => [...sentences, sentence]);
	const remove = (sentence: string) => setSentences(sentences => sentences.filter(s => s != sentence));
	const highlight = (hash: string) => setSelected(hash);

	return (
			<div className='flex justify-center items-center flex-col'>
				<h1 className='text-3xl font-bold'>Letter Matrix Generator</h1>
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
				{/* Out */}
				<div className='p-2 bg-black rounded'>
					{letterRows.map((row, idx) => <div className='flex' key={idx}>
						{row.map((letter, idx) => <LetterEl key={letter.char + idx} letter={letter} selected={selected} />)}
					</div>)}
				</div>
			</div>
	)
}

export default App
