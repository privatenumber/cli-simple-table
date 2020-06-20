declare module 'cli-simple-table' {

	interface Options {
		columnPadding: number;
	}

	interface HeaderObject {
		text: string;
		align?: 'left' | 'right';
		maxWidth?: number;
	}

	type Header = HeaderObject | string;

	export default class SimpleTable {
		constructor(options?: Options);
		header(...args: Header[]): void;
		row(...args: string[]): void;
		toString(): string;
	}
}
