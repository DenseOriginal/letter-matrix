import { classNames } from "./helpers";
import { Letter } from "./types"

interface Props {
	letter: Letter;
	selected: string;
}

export const LetterEl = (props: Props) => {
	return <span
		className={classNames(
			"leading-[16px] w-4 grid place-content-center text-white",
			props.letter.parents.includes(props.selected) && 'bg-red-600'
		)}
	>{props.letter.char}</span>
}
