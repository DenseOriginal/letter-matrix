import { split } from "./helpers";
import { LetterEl } from "./Letter";
import { Letter } from "./types";

interface Props {
	code: Letter[];
	highlight?: string;
	name?: string;
	columns: number;
	keyMode?: boolean
}

export function Out(props: Props) {
	const rows = split(props.code, props.columns);

	return <div className='p-2 bg-black rounded'>
		{props.name && <h2 className='text-xl text-white uppercase mb-2'>#{props.name}</h2>}
		<div>
			{rows.map((row, idx) => <div className='flex' key={idx}>
				{row.map((letter, idx) => <LetterEl
					key={letter.char + idx}
					letter={letter}
					selected={props.highlight || props.name}
					keyMode={props.keyMode}
				/>)}
			</div>)}
		</div>
	</div>
}
