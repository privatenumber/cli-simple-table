var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/index.ts
import stripAnsi from "strip-ansi";
import { bold } from "colorette";
import truncate from "cli-truncate";
var require_src = __commonJS({
  "src/index.ts"(exports, module) {
    var pad = (text, length, align) => {
      let fillBy = length - stripAnsi(text).length;
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
          headerObject.longestLen = stripAnsi(headerObject.text).length;
          return headerObject;
        }));
      }
      row(...columns) {
        columns = columns.map((column, index) => {
          var _a;
          column = column.toString();
          const stringLength = stripAnsi(column).length;
          const columnMeta = this.columnMeta[index];
          if (((_a = columnMeta.longestLen) != null ? _a : 0) < stringLength) {
            columnMeta.longestLen = stringLength;
          }
          return column;
        });
        this.data.push(columns);
      }
      renderHeader() {
        const columnFill = " ".repeat(this.columnPadding);
        return this.columnMeta.map((c) => {
          var _a, _b;
          return pad(bold(c.text), Math.min((_a = c.longestLen) != null ? _a : 0, (_b = c.maxWidth) != null ? _b : 0), c.align);
        }).join(columnFill);
      }
      renderHeaderSeparator() {
        return Array.from({ length: this.headerSeparator }, () => "");
      }
      renderRows() {
        const columnFill = " ".repeat(this.columnPadding);
        return this.data.map((row) => row.map((_text, i) => {
          const { longestLen, align, maxWidth } = this.columnMeta[i];
          const length = Math.min(longestLen != null ? longestLen : 0, maxWidth != null ? maxWidth : 0);
          let text = _text;
          if (stripAnsi(text).length > length) {
            text = truncate(text, length, { position: "middle" });
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
    module.exports = SimpleTable;
  }
});
export default require_src();
