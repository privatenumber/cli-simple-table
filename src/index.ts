import stripAnsi from 'strip-ansi';
import { bold } from 'colorette';
import truncate from 'cli-truncate';

type Options = {
	columnPadding?: number;
	headerSeparator?: number;
}

type HeaderObject = {
	text?: string;
	align?: 'left' | 'right';
	maxWidth?: number;
}

type InternalHeaderObject = {
	text?: string;
	align: 'left' | 'right';
	longestLen: number;
	maxWidth: number;
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

const createHeaderObject = (obj?: Partial<InternalHeaderObject>): InternalHeaderObject => ({
	align: 'left' as const,
	maxWidth: 70,
	longestLen: 0,
	...obj,
});

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

	header(...columns: Header[]) {
		this.columnMeta.push(...columns.map((column) => {
			const headerObject = (
				typeof column === 'string'
					? createHeaderObject({ text: column })
					: createHeaderObject({
						text: column.text,
						align: column.align ?? 'left',
						maxWidth: column.maxWidth ?? 70,
					})
			);

			headerObject.longestLen = stripAnsi(headerObject.text ?? '').length;

			return headerObject as InternalHeaderObject;
		}));
	}

	row(...columns: string[]) {
		if (columns.length > this.columnMeta.length) {
			const addColumns = columns.length - this.columnMeta.length;

			this.columnMeta.push(
				...Array.from(
					{ length: addColumns },
					() => createHeaderObject(),
				),
			);
		}

		columns = columns.map((column, index) => {
			column = column.toString();
			
			const stringLength = stripAnsi(column).length;
			const columnMeta = this.columnMeta[index];
			if (columnMeta.longestLen < stringLength) {
				columnMeta.longestLen = stringLength;
			}

			return column;
		});

		this.data.push(columns);
	}

	renderHeader() {
		const padding = ' '.repeat(this.columnPadding);
		return this.columnMeta
			.map(c => pad(
				bold(c.text!),
				Math.min(c.longestLen, c.maxWidth),
				c.align,
			))
			.join(padding);
	}

	renderHeaderSeparator() {
		return Array.from(
			{ length: this.headerSeparator },
			() => '',
		);
	}

	renderRows() {
		const padding = ' '.repeat(this.columnPadding);
		return this.data.map(
			row => row
				.map((text, i) => {
					const { longestLen, align, maxWidth } = this.columnMeta[i];
					const length = Math.min(longestLen, maxWidth);
					if (stripAnsi(text).length > length) {
						text = truncate(text, length, { position: 'middle' });
					}
					return pad(text, length, align);
				})
				.join(padding),
		);
	}

	toString() {
		const hasHeader = this.columnMeta.filter(c => c.text).length > 0;
		return [
			...(
				hasHeader
					? [
						this.renderHeader(),
						...this.renderHeaderSeparator(),
					]
					: []
			),
			...this.renderRows(),
		].join('\n');
	}
}

export = SimpleTable;
