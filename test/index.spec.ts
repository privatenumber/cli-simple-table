import * as colorette from 'colorette';
import stripAnsi from 'strip-ansi';
import { test } from 'uvu';
import * as assert from 'uvu/assert'; // eslint-disable-line node/file-extension-in-import
import SimpleTable from '../src';

test('Single row table', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');
	table.row('data a', 'data b');

	assert.is(
		stripAnsi(table.toString()),
		'Column A          Column B\n\ndata a            data b  ',
	);
});

test('Multiple row table', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');

	table.row('data a', 'data b');
	table.row('data c', 'data d');
	table.row('data e', 'data f');

	assert.is(
		stripAnsi(table.toString()),
		'Column A          Column B\n\ndata a            data b  \ndata c            data d  \ndata e            data f  ',
	);
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

	assert.is(
		stripAnsi(table.toString()),
		'Column A          Column B\n\n  data a            data b',
	);
});

test('Align right 2', async () => {
	const table = new SimpleTable();
	table.header(
		'a',
		{
			text: 'b',
			align: 'right',
		},
	);

	for (const file of [
		{
			a: 1340,
			b: 10_089,
		},
		{
			a: 822,
			b: 7_000_000_000,
		},
		{
			a: 733,
			b: 632,
		},
	]) {
		table.row(
			file.a.toString(),
			file.b.toString(),
		);
	}

	assert.is(
		stripAnsi(table.toString()),
		'a                      b\n\n1340               10089\n822           7000000000\n733                  632',
	);
});

test('With colorette', async () => {
	const table = new SimpleTable();
	table.header('Column A', 'Column B');
	table.row(colorette.yellow('data a'), colorette.cyan('data b'));

	assert.is(
		stripAnsi(table.toString()),
		'Column A          Column B\n\ndata a            data b  ',
	);
});

test('Truncation', async () => {
	const table = new SimpleTable();
	table.header('Column A', {
		text: 'Column B',
		maxWidth: 10,
	});
	table.row(colorette.yellow('data a'.repeat(100)), colorette.cyan('data b').repeat(100));

	assert.is(
		stripAnsi(table.toString()),
		'Column A                                                                        Column B  \n\ndata adata adata adata adata adata …ta adata adata adata adata adata a          data …ta b',
	);
});

test('columnPadding', async () => {
	const table = new SimpleTable({
		columnPadding: 20,
	});
	table.header('A', 'B');
	table.row('a', 'b');

	assert.is(
		stripAnsi(table.toString()),
		'A                    B\n\na                    b',
	);
});

test('headerSeparator', async () => {
	const table = new SimpleTable({
		headerSeparator: 0,
	});
	table.header('A', 'B');
	table.row('a', 'b');

	assert.is(
		stripAnsi(table.toString()),
		'A          B\na          b',
	);
});

test.run();
