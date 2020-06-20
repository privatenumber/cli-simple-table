const stripAnsi = require('strip-ansi');
const chalk = require('chalk');
const truncate = require('cli-truncate');

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
	constructor({columnPadding = 10} = {}) {
		this.columnPadding = columnPadding;
		this.columnMeta = [];
		this.data = [];
	}

	header(...columns) {
		this.columnMeta.push(...columns.map(c => {
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
		columns.forEach((c, i) => {
			const stringLength = stripAnsi(c).length;
			if (this.columnMeta[i].longestLen < stringLength) {
				this.columnMeta[i].longestLen = stringLength;
			}
		});
		this.data.push(columns);
	}

	toString() {
		const columnFill = ' '.repeat(this.columnPadding);
		return [

			// Headers
			this.columnMeta.map(c => pad({
				text: chalk.bold(c.text),
				length: Math.min(c.longestLen, c.maxWidth),
				align: c.align,
			})).join(columnFill),

			'',

			// Rows
			...this.data.map(
				row => row
					.map((_text, i) => {
						const {longestLen, align, maxWidth} = this.columnMeta[i];
						const length = Math.min(longestLen, maxWidth);

						let text = _text;
						if (stripAnsi(text).length > length) {
							text = truncate(text, length, {position: 'middle'});
						}

						return pad({text, length, align});
					})
					.join(columnFill),
			),
		].join('\n');
	}
}

module.exports = SimpleTable;
