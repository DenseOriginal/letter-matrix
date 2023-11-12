import { useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.error(error);
			return initialValue;
		}
	});

	const setValue = (value: T) => {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			setStoredValue(value);
		} catch (error) {
			console.error(error);
		}
	};

	return [storedValue, setValue];
}
