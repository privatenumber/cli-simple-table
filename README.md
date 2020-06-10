# cli-simple-table

<p align="center"><img src="/.github/screenshot-1.png"></p>

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

## :rocket: Install
```sh
npm i cli-simple-table
```

