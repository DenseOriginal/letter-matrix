import { classNames } from "./helpers";
import { Letter } from "./types"

interface Props {
	letter: Letter;
	selected?: string;
	onlyShow?: string;
}

export const LetterEl = (props: Props) => {
	const showThisOnly = props.onlyShow && props.letter.parents.includes(props.onlyShow);

	return <span
		className={classNames(
			"leading-[16px] w-4 grid place-content-center text-white",
			props.letter.parents.includes(props.selected || '') && 'bg-red-600',
			props.onlyShow && !showThisOnly && 'text-black',
			props.onlyShow && showThisOnly && 'bg-white text-white'
		)}
	>{props.letter.char}</span>
}
