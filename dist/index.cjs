"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }// src/index.ts
var _stripansi = require('strip-ansi'); var _stripansi2 = _interopRequireDefault(_stripansi);
var _colorette = require('colorette');
var _clitruncate = require('cli-truncate'); var _clitruncate2 = _interopRequireDefault(_clitruncate);
var pad = (text, length, align) => {
  let fillBy = length - _stripansi2.default.call(void 0, text).length;
  if (fillBy < 0) {
    fillBy = 0;
  }
  const fill = " ".repeat(fillBy);
  return align === "left" ? text + fill : fill + text;
};
var SimpleTable = class {
  constructor({
    columnPadding = 10,
    headerSeparator = 1
  } = {}) {
    this.columnPadding = columnPadding;
    this.headerSeparator = headerSeparator;
    this.columnMeta = [];
    this.data = [];
  }
  header(...columns) {
    this.columnMeta.push(...columns.map((column) => {
      var _a, _b;
      const headerObject = typeof column === "string" ? {
        text: column,
        align: "left",
        maxWidth: 70
      } : {
        text: column.text,
        align: (_a = column.align) != null ? _a : "left",
        maxWidth: (_b = column.maxWidth) != null ? _b : 70
      };
      headerObject.longestLen = _stripansi2.default.call(void 0, headerObject.text).length;
      return headerObject;
    }));
  }
  row(...columns) {
    columns = columns.map((column, index) => {
      column = column.toString();
      const stringLength = _stripansi2.default.call(void 0, column).length;
      if (this.columnMeta[index].longestLen < stringLength) {
        this.columnMeta[index].longestLen = stringLength;
      }
      return column;
    });
    this.data.push(columns);
  }
  renderHeader() {
    const columnFill = " ".repeat(this.columnPadding);
    return this.columnMeta.map((c) => pad(_colorette.bold.call(void 0, c.text), Math.min(c.longestLen, c.maxWidth), c.align)).join(columnFill);
  }
  renderHeaderSeparator() {
    return Array.from({length: this.headerSeparator}, () => "");
  }
  renderRows() {
    const columnFill = " ".repeat(this.columnPadding);
    return this.data.map((row) => row.map((_text, i) => {
      const {longestLen, align, maxWidth} = this.columnMeta[i];
      const length = Math.min(longestLen, maxWidth);
      let text = _text;
      if (_stripansi2.default.call(void 0, text).length > length) {
        text = _clitruncate2.default.call(void 0, text, length, {position: "middle"});
      }
      return pad(text, length, align);
    }).join(columnFill));
  }
  toString() {
    return [
      this.renderHeader(),
      ...this.renderHeaderSeparator(),
      ...this.renderRows()
    ].join("\n");
  }
};
var src_default = SimpleTable;


exports.default = src_default;
