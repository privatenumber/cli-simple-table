
interface Options {
	columnPadding: number;
	headerSeparator: number;
}

interface HeaderObject {
	text: string;
	align?: 'left' | 'right';
	maxWidth?: number;
}

type Header = HeaderObject | string;

declare class SimpleTable {
	constructor(options?: Options);
	header(...args: Header[]): void;
	row(...args: string[]): void;
	renderHeader(): string;
	renderHeaderSeparator(): string[];
	renderRows(): string[];
	toString(): string;
}

export = SimpleTable;
