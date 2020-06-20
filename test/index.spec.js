const chalk = require('chalk');
const SimpleTable = require('..');

test('Single row table', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');
	table.row('data a', 'data b');

	expect(table.toString()).toBe('\u001B[1mColumn A\u001B[22m          \u001B[1mColumn B\u001B[22m\n\ndata a            data b  ');
});

test('Multiple row table', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');

	table.row('data a', 'data b');
	table.row('data c', 'data d');
	table.row('data e', 'data f');

	expect(table.toString()).toBe('\u001B[1mColumn A\u001B[22m          \u001B[1mColumn B\u001B[22m\n\ndata a            data b  \ndata c            data d  \ndata e            data f  ');
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

	expect(table.toString()).toBe('\u001B[1mColumn A\u001B[22m          \u001B[1mColumn B\u001B[22m\n\n  data a            data b');
});

test('With chalk', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');
	table.row(chalk.yellow('data a'), chalk.cyan('data b'));

	expect(table.toString()).toBe('\u001B[1mColumn A\u001B[22m          \u001B[1mColumn B\u001B[22m\n\n\u001B[33mdata a\u001B[39m            \u001B[36mdata b\u001B[39m  ');
});

test('Truncation', async () => {
	const table = new SimpleTable();
	table.header('Column A', {
		text: 'Column B',
		maxWidth: 10,
	});
	table.row(chalk.yellow('data a'.repeat(100)), chalk.cyan('data b').repeat(100));

	expect(table.toString()).toBe('\u001B[1mColumn A\u001B[22m                                                                        \u001B[1mColumn B\u001B[22m  \n\n\u001B[33mdata adata adata adata adata adata \u001B[39m…\u001B[33mta adata adata adata adata adata a\u001B[39m          \u001B[36mdata \u001B[39m…\u001B[36mta b\u001B[39m');
});
