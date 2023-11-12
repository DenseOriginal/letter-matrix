import { hash } from "./helpers/helpers";

interface Props {
	sentences: string[];
	remove: (string: string) => void;
	highlight: (hash: string) => void;
}

export function Sentences(props: Props) {
	return <div className="w-full my-2">
		<ul className="flex flex-col items-start gap-0">
			{props.sentences.map(sentence => <li className="text-xs flex justify-between w-full" key={hash(sentence)}>
				<span>{sentence} - <span className="uppercase">#{hash(sentence)}</span></span>
				<div className="flex gap-1">
					<button
						onClick={() => props.highlight(hash(sentence))}
					>Highlight</button>
					<span>|</span>
					<button
						onClick={() => props.remove(sentence)}
					>Remove</button>
				</div>
			</li>)}
		</ul>
	</div>
}