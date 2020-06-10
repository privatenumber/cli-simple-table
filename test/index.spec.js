const chalk = require('chalk');
const SimpleTable = require('..');

test('Single row table', async () => {
	const table = new SimpleTable();
	table.headers('Header A', 'Header B');
	table.row('data a', 'data b');

	expect(table.toString()).toBe('\u001b[1mHeader A\u001b[22m          \u001b[1mHeader B\u001b[22m\n\ndata a            data b  ');
});

test('Multiple row table', async () => {
	const table = new SimpleTable();
	table.headers('Header A', 'Header B');

	table.row('data a', 'data b');
	table.row('data c', 'data d');
	table.row('data e', 'data f');

	expect(table.toString()).toBe('\u001b[1mHeader A\u001b[22m          \u001b[1mHeader B\u001b[22m\n\ndata a            data b  \ndata c            data d  \ndata e            data f  ');
});

test('Align right', async () => {
	const table = new SimpleTable();
	table.headers(
		{
			text: 'Header A',
			align: 'right',
		},
		{
			text: 'Header B',
			align: 'right',
		},
	);
	table.row('data a', 'data b');

	expect(table.toString()).toBe('\u001b[1mHeader A\u001b[22m          \u001b[1mHeader B\u001b[22m\n\n  data a            data b');
});

test('With chalk', async () => {
	const table = new SimpleTable();
	table.headers('Header A', 'Header B');
	table.row(chalk.yellow('data a'), chalk.cyan('data b'));

	expect(table.toString()).toBe('\u001b[1mHeader A\u001b[22m          \u001b[1mHeader B\u001b[22m\n\n\u001b[33mdata a\u001b[39m            \u001b[36mdata b\u001b[39m  ');
});

test('Truncation', async () => {
	const table = new SimpleTable();
	table.headers('Header A', {
		text: 'Header B',
		maxWidth: 10,
	});
	table.row(chalk.yellow('data a'.repeat(100)), chalk.cyan('data b').repeat(100));

	expect(table.toString()).toBe('\u001b[1mHeader A\u001b[22m                                                                        \u001b[1mHeader B\u001b[22m  \n\n\u001b[33mdata adata adata adata adata adata \u001b[39m…\u001b[33mta adata adata adata adata adata a\u001b[39m          \u001b[36mdata \u001b[39m…\u001b[36mta b\u001b[39m');
});
