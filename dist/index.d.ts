declare type Options = {
    columnPadding?: number;
    headerSeparator?: number;
};
declare type HeaderObject = {
    text: string;
    align?: 'left' | 'right';
    maxWidth?: number;
};
declare type InternalHeaderObject = HeaderObject & {
    longestLen?: number;
};
declare type Header = HeaderObject | string;
declare class SimpleTable {
    columnPadding: number;
    headerSeparator: number;
    columnMeta: InternalHeaderObject[];
    data: string[][];
    constructor({ columnPadding, headerSeparator, }?: Options);
    header(...columns: Header[]): void;
    row(...columns: string[]): void;
    renderHeader(): string;
    renderHeaderSeparator(): string[];
    renderRows(): string[];
    toString(): string;
}

export { SimpleTable as default };
