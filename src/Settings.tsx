import { useState } from "react";
import { classNames } from "./helpers/helpers";
import { useAppSelector, useCurrentProjectUpdater } from './hooks/redux';
import { currentProjectSelector } from "./store/selectors";

interface Props {}

export function Settings(_: Props) {
	const { rows, cols, sentences, style } = useAppSelector(currentProjectSelector);

	const [input, setInput] = useState('');

	const setRows = useCurrentProjectUpdater('rows');
	const setColumns = useCurrentProjectUpdater('cols');
	const setSentences = useCurrentProjectUpdater('sentences');
	const setBackgroundColor = useCurrentProjectUpdater('style.background');
	const setTextColor = useCurrentProjectUpdater('style.text');
	const setBorder = useCurrentProjectUpdater('style.border');

	const addSentence = () => {
		if (input) {
			setSentences([...sentences, input])
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
					onKeyUp={e => e.key == 'Enter' && addSentence()}
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
						value={rows} onChange={e => setRows(parseInt(e.currentTarget.value))}
					/>
				</div>
				<div className="flex gap-1">
					<span>Columns</span>
					<input
						type="number"
						className={classNames(inputClassNames, 'w-14 pr-0')}
						value={cols} onChange={e => setColumns(parseInt(e.currentTarget.value))}
					/>
				</div>
			</div>
			<div className="flex gap-3">
				<div className="flex gap-1">
					<span>Text color</span>
					<input
						type="color"
						className={classNames(inputClassNames, 'w-14 !p-0')}
						value={style.text} onInput={e => setTextColor(e.currentTarget.value)}
					/>
				</div>
				<div className="flex gap-1">
					<span>Background color</span>
					<input
						type="color"
						className={classNames(inputClassNames, 'w-14 !p-0')}
						value={style.background} onInput={e => setBackgroundColor(e.currentTarget.value)}
					/>
				</div>
				<div className="flex gap-1">
					<label htmlFor="border-checkbox">Border</label>
					<input
						id="border-checkbox"
						type="checkbox"
						className={classNames(inputClassNames, 'w-6 !p-0')}
						checked={style.border} onChange={() => setBorder(!style.border)}
					/>
				</div>
			</div>
		</div>
	)
}

const inputClassNames = classNames("flex-grow border-black border rounded px-1 h-6");
