import { Letter } from './types';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!?=@#:;*/';

const randomLetter = (): Letter => ({
	char: characters[Math.floor(Math.random() * characters.length)],
	parents: []
})

export const distribute = (totalLength: number, sentences: string[]): Letter[] => {
	const mappedSentences: Letter[][] = sentences.map(sentence =>
		[...sentence].map(char => ({ char: char.toUpperCase(), parents: [hash(sentence)] }))
	);

	const allChars = merge(mappedSentences);

	if (allChars.length > totalLength) {
		throw new Error('Total length is shorter than the combined sentences length.');
	}

	// Create an array to hold the final distribution of characters
	const distribution = new Array(totalLength);

	// Generate a list of unique random positions in the distribution array
	const positions = new Set<number>();
	while (positions.size < allChars.length) {
		positions.add(Math.floor(Math.random() * totalLength));
	}
	const uniquePositions = Array.from(positions);

	// Sort the list of positions to maintain the order of the sentences
	uniquePositions.sort((a, b) => a - b);

	// Fill in the letters from the sentences at the unique random positions
	for (let i = 0; i < allChars.length; i++) {
		distribution[uniquePositions[i]] = allChars[i];
	}

	// Fill in the remaining positions with random letters
	for (let i = 0; i < totalLength; i++) {
		if (distribution[i] === undefined) {
			distribution[i] = randomLetter();
		}
	}

	// Join the array into a string and return it
	return distribution;
}

export const merge = (arrays: Letter[][]): Letter[] => {
	const propability = arrays.flatMap((arr, i) => arr.map(() => i));
	const result: Letter[] = [];
	const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);

	const lastPositions: Record<string, number> = {};

	const getSet = (n: number) => arrays[n];
	const doesLetterExist = (set: string, letter: Letter) => {
		const lastPosition = lastPositions[set] + 1 || 0;
		const found = result.slice(lastPosition).findIndex((el: Letter) => el.char == letter.char);
		return found == -1 ? -1 : found + lastPosition;
	}

	for (let i = 0; i < totalLength; i++) { 
		const propIndex = Math.floor(Math.random() * propability.length);
		const setIndex = propability[propIndex];
		const currentLetter = getSet(setIndex).shift()!;
		const parent = currentLetter.parents[0];
		const positionAlready = doesLetterExist(parent, currentLetter);

		if (positionAlready == -1) {
			result.push(currentLetter);
		} else {
			result[positionAlready] = { ...result[positionAlready], parents: [...result[positionAlready].parents, parent] };
		}

		const position = positionAlready == -1 ? result.length - 1 : positionAlready;

		lastPositions[parent] = position;
		propability.splice(propIndex, 1);
	}

	return result
}

export const hash = (string: string): string => {
    var hash = 0;
    for (var i = 0; i < string.length; i++) {
        var char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = Math.abs(hash & hash); // Convert to 32bit integer
    }
    return hash.toString(36);
}

export const split = <T>(arr: T[], size: number): T[][] => {
	const result: T[][] = [];
	for (let i = 0; i < arr.length; i += size) {
		result.push(arr.slice(i, i + size));
	}
	return result;
}

export const classNames = (...classes: (string | undefined | boolean)[]): string => classes.filter(Boolean).join(' ');
