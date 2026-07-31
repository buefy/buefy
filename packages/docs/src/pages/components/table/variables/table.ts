export default [
    {
        sass: '<code>$table-sticky-header-height</code>',
        css: '<code>--bulma-table-sticky-header-height</code>',
        description: 'The height of the sticky table header',
        default: '<code>300px</code>'
    },
    {
        sass: '<code>$table-checkbox-cell-width</code>',
        css: '<code>--bulma-table-checkbox-cell-width</code>',
        description: 'The width of the checkbox column. Sticky data columns account for this ' +
            'width when the checkbox column is also sticky (see the <code>sticky</code> ' +
            'column prop)',
        default: '<code>40px</code>'
    }
]