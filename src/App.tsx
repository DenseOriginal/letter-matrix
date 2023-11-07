import { useMemo, useState } from 'react';
import { distribute, hash, split } from './helpers';
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
		<div className='flex justify-center items-center flex-col py-5'>
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

			{/* Keys */}
			<div className='flex flex-col gap-3 mt-4 w-full'>
				<h2 className='w-full text-xl'>Keys</h2>
				{sentences.map(sentence => <div className='p-2 bg-black rounded'>
					<h2 className='text-xl text-white uppercase mb-2'>#{hash(sentence)}</h2>
					<div>
						{letterRows.map((row, idx) => <div className='flex' key={idx}>
							{row.map((letter, idx) => <LetterEl key={letter.char + idx} letter={letter} onlyShow={hash(sentence)} />)}
						</div>)}
					</div>
				</div>)}
			</div>
		</div>
	)
}

export default App
