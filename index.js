import stripAnsi from 'strip-ansi';
import { bold } from 'colorette';
import truncate from 'cli-truncate';

const pad = ({
	text,
	length,
	align,
}) => {
	let fillBy = length - stripAnsi(text).length;
	if (fillBy < 0) {
		fillBy = 0;
	}

	const fill = ' '.repeat(fillBy);
	return (align === 'left') ? (text + fill) : (fill + text);
};

class SimpleTable {
	constructor({
		columnPadding = 10,
		headerSeparator = 1,
	} = {}) {
		this.columnPadding = columnPadding;
		this.headerSeparator = headerSeparator;
		this.columnMeta = [];
		this.data = [];
	}

	header(...columns) {
		this.columnMeta.push(...columns.map((c) => {
			const text = typeof c === 'string' ? c : c.text;

			return {
				text,
				align: c.align || 'left',
				longestLen: stripAnsi(text).length,
				maxWidth: c.maxWidth || 70,
			};
		}));
	}

	row(...columns) {
		columns = columns.map((column, index) => {
			column = column.toString();

			const stringLength = stripAnsi(column).length;
			if (this.columnMeta[index].longestLen < stringLength) {
				this.columnMeta[index].longestLen = stringLength;
			}

			return column;
		});

		this.data.push(columns);
	}

	renderHeader() {
		const columnFill = ' '.repeat(this.columnPadding);
		return this.columnMeta.map(c => pad({
			text: bold(c.text),
			length: Math.min(c.longestLen, c.maxWidth),
			align: c.align,
		})).join(columnFill);
	}

	renderHeaderSeparator() {
		return Array.from({
			length: this.headerSeparator,
		}).fill('');
	}

	renderRows() {
		const columnFill = ' '.repeat(this.columnPadding);
		return this.data.map(
			row => row
				.map((_text, i) => {
					const { longestLen, align, maxWidth } = this.columnMeta[i];
					const length = Math.min(longestLen, maxWidth);

					let text = _text;
					if (stripAnsi(text).length > length) {
						text = truncate(text, length, { position: 'middle' });
					}

					return pad({ text, length, align });
				})
				.join(columnFill),
		);
	}

	toString() {
		return [
			this.renderHeader(),
			...this.renderHeaderSeparator(),
			...this.renderRows(),
		].join('\n');
	}
}

export default SimpleTable;
