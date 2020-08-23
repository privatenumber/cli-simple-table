import {expectType} from 'tsd';
import SimpleTable = require('.');

const table = new SimpleTable();

expectType<void>(table.header('A', 'B'));
expectType<void>(table.row('A', 'B'));
expectType<string>(table.renderHeader());
expectType<string[]>(table.renderHeaderSeparator());
expectType<string[]>(table.renderRows());
expectType<string>(table.toString());
