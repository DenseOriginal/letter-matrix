export const resolveProperty = <T, P extends DeepKeys<T>>(obj: T, path: P): DeepValue<T, P> => (path as string)
	.split('.')
	.reduce((acc, prop) => acc?.[prop], obj as Record<string, any>) as DeepValue<T, P>;

export const deepSetProperty = <T, P extends DeepKeys<T>>(obj: T, path: P, val: DeepValue<T, P>): T => {
	const splitPaths = (path as string).split(".");
	const currentKey = splitPaths[0];

	if (typeof obj != "object") {
		return obj;
	}

	// Check if we're at the deepest path
	if (currentKey == path) {
		return {
			...obj,
			[currentKey]: val
		}
	}

	return {
		...obj,
		[currentKey]: deepSetProperty((obj as any)[currentKey], splitPaths.slice(1).join("."), val)
	};
}
