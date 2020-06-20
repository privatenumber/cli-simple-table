const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const SimpleTable = require('..');

test('Single row table', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');
	table.row('data a', 'data b');

	expect(stripAnsi(table.toString())).toBe('Column A          Column B\n\ndata a            data b  ');
});

test('Multiple row table', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');

	table.row('data a', 'data b');
	table.row('data c', 'data d');
	table.row('data e', 'data f');

	expect(stripAnsi(table.toString())).toBe('Column A          Column B\n\ndata a            data b  \ndata c            data d  \ndata e            data f  ');
});

test('Align right', async () => {
	const table = new SimpleTable();
	table.header(
		{
			text: 'Column A',
			align: 'right',
		},
		{
			text: 'Column B',
			align: 'right',
		},
	);
	table.row('data a', 'data b');

	expect(stripAnsi(table.toString())).toBe('Column A          Column B\n\n  data a            data b');
});

test('With chalk', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');
	table.row(chalk.yellow('data a'), chalk.cyan('data b'));

	expect(stripAnsi(table.toString())).toBe('Column A          Column B\n\ndata a            data b  ');
});

test('Truncation', async () => {
	const table = new SimpleTable();
	table.header('Column A', {
		text: 'Column B',
		maxWidth: 10,
	});
	table.row(chalk.yellow('data a'.repeat(100)), chalk.cyan('data b').repeat(100));

	expect(stripAnsi(table.toString())).toBe('Column A                                                                        Column B  \n\ndata adata adata adata adata adata …ta adata adata adata adata adata a          data …ta b');
});
