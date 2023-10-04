export interface TableColumn {
    label?: string;
    'custom-key'?: string | number;
    field?: string | number;
    meta?: any;
    width?: number | string;
    numeric?: boolean;
    centered?: boolean;
    sortable?: boolean;
    visible?: boolean;
    'custom-sort'?: (a: object, b: object, isAsc: boolean) => void;
    searchable?: boolean;
    subheading?: string | number;
    sticky?: boolean;
    'header-selectable'?: boolean;
    'header-class'?: string;
    'cell-class'?: string;
}
