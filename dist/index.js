var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
    var createHeaderObject = (object) => __spreadValues({
      align: "left",
      maxWidth: 70,
      longestLen: 0
    }, object);
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
          var _a, _b, _c;
          const headerObject = typeof column === "string" ? createHeaderObject({ text: column }) : createHeaderObject({
            text: column.text,
            align: (_a = column.align) != null ? _a : "left",
            maxWidth: (_b = column.maxWidth) != null ? _b : 70
          });
          headerObject.longestLen = stripAnsi((_c = headerObject.text) != null ? _c : "").length;
          return headerObject;
        }));
      }
      row(...columns) {
        if (columns.length > this.columnMeta.length) {
          const addColumns = columns.length - this.columnMeta.length;
          this.columnMeta.push(...Array.from({ length: addColumns }, () => createHeaderObject()));
        }
        columns = columns.map((column, index) => {
          column = column.toString();
          const stringLength = stripAnsi(column).length;
          const columnMeta = this.columnMeta[index];
          if (columnMeta.longestLen < stringLength) {
            columnMeta.longestLen = stringLength;
          }
          return column;
        });
        this.data.push(columns);
      }
      renderHeader() {
        const padding = " ".repeat(this.columnPadding);
        return this.columnMeta.map((c) => pad(bold(c.text), Math.min(c.longestLen, c.maxWidth), c.align)).join(padding);
      }
      renderHeaderSeparator() {
        return Array.from({ length: this.headerSeparator }, () => "");
      }
      renderRows() {
        const padding = " ".repeat(this.columnPadding);
        return this.data.map((row) => row.map((text, i) => {
          const { longestLen, align, maxWidth } = this.columnMeta[i];
          const length = Math.min(longestLen, maxWidth);
          if (stripAnsi(text).length > length) {
            text = truncate(text, length, { position: "middle" });
          }
          return pad(text, length, align);
        }).join(padding));
      }
      toString() {
        const hasHeader = this.columnMeta.some((c) => "text" in c);
        return [
          ...hasHeader ? [
            this.renderHeader(),
            ...this.renderHeaderSeparator()
          ] : [],
          ...this.renderRows()
        ].join("\n");
      }
    };
    module.exports = SimpleTable;
  }
});
export default require_src();
