import { classNames } from "./helpers";
import { remToPx } from "./Out";
import { Letter } from "./types"

interface Props {
	letter: Letter;
	row: number;
	col: number;
	selected?: string;
	keyMode?: boolean;
}

export const LetterEl = (props: Props) => {
	const highlight = props.letter.parents.includes(props.selected || '');
	const keyMode = props.keyMode;

	const rem = remToPx(1);

	return keyMode ? (
		highlight ? (
			<rect x={props.col * rem} y={props.row * rem} width={rem} height={rem} fill="white" />
		) : null
	) : <>
		{/* <rect x={props.col * rem} y={props.row * rem} width={rem} height={rem} stroke="white" strokeWidth={1} /> */}
		{highlight && <rect x={props.col * rem} y={props.row * rem} width={rem} height={rem} fill="red" />}
		<text
			x={props.col * rem + 3}
			y={props.row * rem + rem - 2.5}
			width={rem}
			height={rem}
			fontFamily="Roboto mono"
			fill="white"
			fontSize={rem}
			style={{ userSelect: 'none' }}
		>{props.letter.char}</text>
	</>

	return <span
		className={classNames(
			"leading-[1rem] w-4 grid place-content-center text-white",
			!keyMode && highlight && 'bg-red-600',
			keyMode && !highlight && '!text-black',
			keyMode && highlight && 'bg-white text-white'
		)}
	>{props.letter.char}</span>
}
