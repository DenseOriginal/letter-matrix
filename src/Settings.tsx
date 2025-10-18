import { useState } from "react";
import { classNames } from "./helpers/helpers";
import { Dialog } from "./components/Dialog";
import { onUpdateProject } from './store/actions';
import { Project as ProjectType } from './types';
import { useAppDispatch, useAppSelector } from './hooks/redux';

interface Props {}

export function Settings(_: Props) {
	const dispatch = useAppDispatch();
	const currentId = useAppSelector(state => state.currentProject!);
	const projects = useAppSelector(state => state.projects);

	const currentProject = projects.find(project => project.id == currentId)!;
	const { rows, cols, sentences } = currentProject;

	const [input, setInput] = useState('');

	const updateProject = <K extends keyof ProjectType>(key: K) =>
		(value: ProjectType[K]) => dispatch(onUpdateProject(currentId, { [key]: value }));

	const setRows = updateProject('rows');
	const setColumns = updateProject('cols');
	const setSentences = updateProject('sentences');

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
		</div>
	)
}

const inputClassNames = "flex-grow border-black border rounded px-1";
