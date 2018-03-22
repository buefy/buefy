export default {
    documentation: [
        {
            category: 'Installation',
            pages: [
                { name: 'Start', path: '/documentation/start' },
                { name: 'Customization', path: '/documentation/customization' },
                { name: 'Constructor options', path: '/documentation/constructor-options' }
            ]
        },
        {
            category: 'Layout',
            pages: [
                { name: 'Layout & elements', path: '/documentation/layout' }
            ]
        },
        {
            category: 'UI components',
            pages: [
                { name: 'Collapse', path: '/documentation/collapse' },
                { name: 'Dialog', path: '/documentation/dialog', isUpdated: true },
                { name: 'Dropdown', path: '/documentation/dropdown' },
                {
                    category: 'Form controls',
                    pages: [
                        { name: 'Autocomplete', path: '/documentation/autocomplete', isUpdated: true },
                        { name: 'Checkbox', path: '/documentation/checkbox' },
                        { name: 'Datepicker', path: '/documentation/datepicker', isUpdated: true },
                        { name: 'Field', path: '/documentation/field', isUpdated: true },
                        { name: 'Input', path: '/documentation/input' },
                        { name: 'Radio', path: '/documentation/radio' },
                        { name: 'Select', path: '/documentation/select' },
                        { name: 'Switch', path: '/documentation/switch' },
                        { name: 'Taginput', path: '/documentation/taginput', isUpdated: true },
                        { name: 'Timepicker', path: '/documentation/timepicker' },
                        { name: 'Upload', path: '/documentation/upload' }
                    ]
                },
                { name: 'Icon', path: '/documentation/icon' },
                { name: 'Loading', path: '/documentation/loading', isUpdated: true },
                { name: 'Message', path: '/documentation/message' },
                { name: 'Modal', path: '/documentation/modal' },
                { name: 'Notification', path: '/documentation/notification' },
                { name: 'Pagination', path: '/documentation/pagination' },
                { name: 'Snackbar', path: '/documentation/snackbar', isUpdated: true },
                { name: 'Table', path: '/documentation/table', isUpdated: true },
                { name: 'Tabs', path: '/documentation/tabs', isUpdated: true },
                { name: 'Tag', path: '/documentation/tag' },
                { name: 'Toast', path: '/documentation/toast' },
                { name: 'Tooltip', path: '/documentation/tooltip' }
            ]
        }
    ],
    extensions: [
        {
            category: 'Extensions',
            pages: [
                { name: 'Cleavejs (input format)', path: '/extensions/cleavejs' },
                { name: 'Sortable (table sort)', path: '/extensions/sortablejs' }
            ]
        }
    ]
}
