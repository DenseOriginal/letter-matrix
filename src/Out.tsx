import { useMemo, useRef } from "react";
import { split } from "./helpers/helpers";
import { LetterEl } from "./Letter";
import { Letter } from "./types";
import { useAppSelector } from "./hooks/redux";
import { currentProjectSelector } from "./store/selectors";

interface Props {
	code: Letter[];
	highlight?: string;
	name?: string;
	columns: number;
	keyMode?: boolean
}

export function Out(props: Props) {
	return <figure>
		<SvgElement {...props} />
	</figure>
}

function SvgElement(props: Props) {
	const { style } = useAppSelector(currentProjectSelector);

	const svgRef = useRef<HTMLElement>();
	const id = useMemo(() => Math.random().toString(), []);

	const rows = split(props.code, props.columns);
	const width = getWidthInPx(props.columns);
	const height = getHeightInPx(rows.length, !!props.name);

	const paddingPx = remToPx(padding);

	const codeViewOffsetX = paddingPx;
	const codeViewOffsetY = paddingPx + (props.name ? remToPx(nameHeight) : 0);
	const codeViewHeight = remToPx(rows.length);
	const codeViewWidth = remToPx(props.columns);

	const download = () => {
		const fileName = `${props.name?.toUpperCase() || 'key'}.svg`;
		const fileContent = svgRef.current?.innerHTML || '';
		const myFile = new Blob([fileContent], { type: 'text/plain' });

		window.URL = window.URL || window.webkitURL;
		const dlBtn = document.createElement('a');

		dlBtn.setAttribute("href", window.URL.createObjectURL(myFile));
		dlBtn.setAttribute("download", fileName);
		dlBtn.click();
	}

	return <div className="relative">
		<div ref={ref => svgRef.current = ref!}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
			>
				<defs>
					<rect
						id={`rectangle-${id}`}
						x="0"
						y="0"
						width={width}
						height={height}
						rx="6"
					/>
					<clipPath id={`border-clip-${id}`}>
						<use xlinkHref={`#rectangle-${id}`} />
					</clipPath>
					{/* <style>
						@import url("https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i");
					</style> */}
				</defs>
				<use
					xlinkHref={`#rectangle-${id}`}
					clipPath={`url(#border-clip-${id})`}
					height={height}
					fill={style.background}
					{...(style.border ? {
						stroke: "black",
						strokeWidth: "4px"
					} : {})}
				/>
				{props.name && <text
					x={paddingPx}
					y={paddingPx + remToPx(nameFontSize) - 4}
					fontFamily="Courier New"
					textAnchor="start"
					fill={style.text}
					fontSize={`${remToPx(nameFontSize)}px`}
				>#{props.name.toUpperCase()}</text>}
				<svg
					viewBox={`0 0 ${codeViewWidth} ${codeViewHeight}`}
					width={codeViewWidth}
					height={codeViewHeight}
					x={codeViewOffsetX}
					y={codeViewOffsetY}
				>
					{rows.map((row, rowIdx) => row.map((letter, colIdx) => <LetterEl
						key={letter.char + rowIdx + colIdx}
						row={rowIdx}
						col={colIdx}
						letter={letter}
						selected={props.highlight || props.name}
						keyMode={props.keyMode}
						color={style.text}
					/>))}
				</svg>
			</svg>
		</div>
		<button
			onClick={download}
			className="absolute top-0 -right-4 translate-x-full px-2 py-1 text-white rounded-md bg-gray-700"
		>
			<i className="fa-solid fa-download"></i>
		</button>
	</div>
}

const nameFontSize = 1.75;
const padding = 0.5;
const nameHeight = nameFontSize + 0.5;
const getWidthInPx = (columns: number) => remToPx((padding * 2) + columns);
const getHeightInPx = (rows: number, withName = false) => remToPx((padding * 2) + rows + (withName ? nameHeight : 0));

export const remToPx = (rem: number) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
