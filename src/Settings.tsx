import { useState } from "react";
import { classNames } from "./helpers";

interface Props {
	add: (string: string) => void;
	setRows: (rows: number) => void;
	setColumns: (columns: number) => void;
	rows: number;
	columns: number;
}

export function Settings(props: Props) {
	const [input, setInput] = useState('');
	
	const addSentence = () => {
		if (input) {
			props.add(input);
			setInput('')
		}
	}


	return (
		<div className="w-full flex flex-col gap-1 text-sm mb-3">
			<div className="w-full flex gap-2">
				<input
					type="text"
					placeholder="Sentence"
					value={input}
					onChange={e => setInput(e.currentTarget.value)}
					className={inputClassNames}
				/>
				<button
					onClick={addSentence}
					className="border-black border rounded px-2"
				>Add</button>
			</div>
			<div className="flex gap-3">
				<div className="flex gap-1">
					<span>Rows</span>
					<input
						type="number"
						className={classNames(inputClassNames, 'w-14 pr-0')}
						value={props.rows} onChange={e => props.setRows(parseInt(e.currentTarget.value))}
					/>
				</div>
				<div className="flex gap-1">
					<span>Columns</span>
					<input
						type="number"
						className={classNames(inputClassNames, 'w-14 pr-0')}
						value={props.columns} onChange={e => props.setColumns(parseInt(e.currentTarget.value))}
					/>
				</div>
			</div>
		</div>
	)
}

const inputClassNames = "flex-grow border-black border rounded px-1";
