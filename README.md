<p align="center">
  <img src="/.github/screenshot-1.png" width="70%">
</p>

## :rocket: Install
```sh
npm i cli-simple-table
```


## Simple API

### Basic usage
```js
const SimpleTable = require('cli-simple-table');
const chalk = require('chalk');

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

### Max column width
```js
const table = new SimpleTable();

table.headers(
  {
    text: 'Long text',
    maxWidth: 25,
  },
  {
    text: 'Long long text',
    maxWidth: 25,
  }
);

table.row('Truncates really really long text', chalk.magenta('Colored long long text too'));

console.log(table.toString());
```