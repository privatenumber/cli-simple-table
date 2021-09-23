import stripAnsi from 'strip-ansi';
import { bold } from 'colorette';
import truncate from 'cli-truncate';

type Options = {
	columnPadding?: number;
	headerSeparator?: number;
}

type HeaderObject = {
	text: string;
	align?: 'left' | 'right';
	maxWidth?: number;
}

type InternalHeaderObject = HeaderObject & {
	longestLen?: number;
}

type Header = HeaderObject | string;

const pad = (
	text: string,
	length: number,
	align: HeaderObject['align'],
) => {
	let fillBy = length - stripAnsi(text).length;
	if (fillBy < 0) {
		fillBy = 0;
	}

	const fill = ' '.repeat(fillBy);
	return (align === 'left') ? (text + fill) : (fill + text);
};

class SimpleTable {
	columnPadding: number;

	headerSeparator: number;

	columnMeta: InternalHeaderObject[];

	data: string[][];

	constructor({
		columnPadding = 10,
		headerSeparator = 1,
	}: Options = {}) {
		this.columnPadding = columnPadding;
		this.headerSeparator = headerSeparator;
		this.columnMeta = [];
		this.data = [];
	}

	header(...columns: Header[]): void {
		this.columnMeta.push(...columns.map((column) => {
			const headerObject: InternalHeaderObject = (
				typeof column === 'string'
					? {
						text: column,
						align: 'left' as const,
						maxWidth: 70,
					}
					: {
						text: column.text,
						align: column.align ?? 'left',
						maxWidth: column.maxWidth ?? 70,
					}
			);

			headerObject.longestLen = stripAnsi(headerObject.text).length;

			return headerObject;
		}));
	}

	row(...columns: string[]): void {
		columns = columns.map((column, index) => {
			column = column.toString();

			const stringLength = stripAnsi(column).length;

			const columnMeta = this.columnMeta[index]!;
			if ((columnMeta.longestLen ?? 0) < stringLength) {
				columnMeta.longestLen = stringLength;
			}

			return column;
		});

		this.data.push(columns);
	}

	renderHeader(): string {
		const columnFill = ' '.repeat(this.columnPadding);
		return this.columnMeta.map(c => pad(
			bold(c.text),
			Math.min(c.longestLen ?? 0, c.maxWidth ?? 0),
			c.align,
		)).join(columnFill);
	}

	renderHeaderSeparator(): string[] {
		return Array.from(
			{ length: this.headerSeparator },
			() => '',
		);
	}

	renderRows(): string[] {
		const columnFill = ' '.repeat(this.columnPadding);
		return this.data.map(
			row => row
				.map((_text, i) => {
					const { longestLen, align, maxWidth } = this.columnMeta[i];
					const length = Math.min(longestLen ?? 0, maxWidth ?? 0);

					let text = _text;
					if (stripAnsi(text).length > length) {
						text = truncate(text, length, { position: 'middle' });
					}

					return pad(text, length, align);
				})
				.join(columnFill),
		);
	}

	toString(): string {
		return [
			this.renderHeader(),
			...this.renderHeaderSeparator(),
			...this.renderRows(),
		].join('\n');
	}
}

export default SimpleTable;
