var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/.pnpm/tsup@5.1.0_typescript@4.5.3/node_modules/tsup/assets/cjs_shims.js
var importMetaUrlShim = typeof document === "undefined" ? new (require("url")).URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;

// src/index.ts
var import_strip_ansi = __toModule(require("strip-ansi"));
var import_colorette = __toModule(require("colorette"));
var import_cli_truncate = __toModule(require("cli-truncate"));
var pad = (text, length, align) => {
  let fillBy = length - (0, import_strip_ansi.default)(text).length;
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
      headerObject.longestLen = (0, import_strip_ansi.default)((_c = headerObject.text) != null ? _c : "").length;
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
      const stringLength = (0, import_strip_ansi.default)(column).length;
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
    return this.columnMeta.map((c) => pad((0, import_colorette.bold)(c.text), Math.min(c.longestLen, c.maxWidth), c.align)).join(padding);
  }
  renderHeaderSeparator() {
    return Array.from({ length: this.headerSeparator }, () => "");
  }
  renderRows() {
    const padding = " ".repeat(this.columnPadding);
    return this.data.map((row) => row.map((text, i) => {
      const { longestLen, align, maxWidth } = this.columnMeta[i];
      const length = Math.min(longestLen, maxWidth);
      if ((0, import_strip_ansi.default)(text).length > length) {
        text = (0, import_cli_truncate.default)(text, length, { position: "middle" });
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
