import { currentProjectSelector } from "./store/selectors";
import { hash } from './helpers/helpers';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { onUpdateProject } from './store/actions';
import { Project as ProjectType } from './types';

interface Props {
	highlight: (hash: string) => void;
}

export function Sentences(props: Props) {
	const dispatch = useAppDispatch();

	const { sentences, id } = useAppSelector(currentProjectSelector);

	const updateProject = <K extends keyof ProjectType>(key: K) =>
		(value: ProjectType[K]) => dispatch(onUpdateProject(id, { [key]: value }));

	const setSentences = updateProject('sentences');
	const remove = (sentence: string) => setSentences(sentences.filter(s => s != sentence));

	return <div className="w-full my-2 overflow-hidden">
		<ul className="flex flex-col items-start gap-0 overflow-hidden">
			{sentences.map(sentence => <li className="text-xs flex justify-between w-full" key={hash(sentence)}>
				<span className="truncate"><span className="uppercase">#{hash(sentence)}</span> - {sentence}</span>
				<div className="flex gap-1">
					<button
						onClick={() => props.highlight(hash(sentence))}
					>Highlight</button>
					<span>|</span>
					<button
						onClick={() => remove(sentence)}
					>Remove</button>
				</div>
			</li>)}
		</ul>
	</div>
}