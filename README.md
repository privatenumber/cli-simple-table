# cli-simple-table
CLI simple table


```js
const table = new SimpleTable();

table.headers('Name', 'Emoji');

table.row(chalk.red('Squid'), '🦑');
table.row(chalk.green('Frog'), '🐸');
table.row(chalk.yellow('Tiger'), '🐯');
table.row(chalk.blue('Whale'), '🐳');
table.row(chalk.magenta('Unicorn'), '🦄');
table.row(chalk.cyan('Dolphin'), '🐬');
table.row(chalk.white('Panda'), '🐼');

console.log(table);

```

<img src="/.github/screenshot-1.png">

