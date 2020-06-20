<p align="center">
  <img src="/.github/screenshot-1.png" width="70%">
  <br>
  <a href="https://npm.im/cli-simple-table"><img src="https://badgen.net/npm/v/cli-simple-table"></a>
  <a href="https://npm.im/cli-simple-table"><img src="https://badgen.net/npm/dm/cli-simple-table"></a>
  <a href="https://packagephobia.now.sh/result?p=cli-simple-table"><img src="https://packagephobia.now.sh/badge?p=cli-simple-table"></a>
  <br>
  <br>
  <i>Simple CLI table for simple people</i>
</p>

### Install
```sh
npm i cli-simple-table
```

### Basic usage
```js
const SimpleTable = require('cli-simple-table');
const chalk = require('chalk');

const table = new SimpleTable();

table.header('Name', 'Emoji');

table.row(chalk.red('Squid'), '🦑');
table.row(chalk.green('Frog'), '🐸');
table.row(chalk.yellow('Tiger'), '🐯');
table.row(chalk.blue('Whale'), '🐳');
table.row(chalk.magenta('Unicorn'), '🦄');
table.row(chalk.cyan('Dolphin'), '🐬');
table.row(chalk.white('Panda'), '🐼');

console.log(table.toString());
```


### Alignment
```js
const table = new SimpleTable();

table.header(
  'Name',
  {
    text: 'Age',
    align: 'right'
  }
);

table.row('Steve', 26);

console.log(table.toString());
```


### Max column width
```js
const table = new SimpleTable();

table.header(
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


