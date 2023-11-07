import { classNames } from "./helpers";
import { Letter } from "./types"

interface Props {
	letter: Letter;
	selected?: string;
	keyMode?: boolean;
}

export const LetterEl = (props: Props) => {
	const highlight = props.letter.parents.includes(props.selected || '');
	const keyMode = props.keyMode;

	return <span
		className={classNames(
			"leading-[16px] w-4 grid place-content-center text-white",
			!keyMode && highlight && 'bg-red-600',
			keyMode && !highlight && 'text-black',
			keyMode && highlight && 'bg-white text-white'
		)}
	>{props.letter.char}</span>
}
