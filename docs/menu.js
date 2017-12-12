export default {
    documentation: [
        {
            category: 'Installation',
            pages: [
                { name: 'Start' },
                { name: 'Customization' },
                { name: 'Constructor options' }
            ]
        },
        {
            category: 'Layout',
            pages: [
                { name: 'Layout & elements', path: 'layout' }
            ]
        },
        {
            category: 'UI components',
            pages: [
                { name: 'Collapse' },
                { name: 'Dialog' },
                { name: 'Dropdown' },
                {
                    category: 'Form controls',
                    pages: [
                        { name: 'Autocomplete' },
                        { name: 'Checkbox' },
                        { name: 'Datepicker', isUpdated: true },
                        { name: 'Field', isUpdated: true },
                        { name: 'Input' },
                        { name: 'Radio' },
                        { name: 'Select' },
                        { name: 'Switch' },
                        { name: 'Taginput', isNew: true },
                        { name: 'Timepicker', isNew: true },
                        { name: 'Upload' }
                    ]
                },
                { name: 'Icon' },
                { name: 'Loading' },
                { name: 'Message' },
                { name: 'Modal' },
                { name: 'Notification' },
                { name: 'Pagination' },
                { name: 'Snackbar', isUpdated: true },
                { name: 'Table' },
                { name: 'Tabs' },
                { name: 'Tag' },
                { name: 'Toast', isUpdated: true },
                { name: 'Tooltip' }
            ]
        }
    ],
    extensions:[
        {
            category: 'Extensions',
            pages: [
                { name: 'Cleavejs (Input Format)', path: 'cleavejs', isNew: true }
            ]
        }
    ]
}
