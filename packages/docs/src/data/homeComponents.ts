export interface ComponentLink {
    name: string
    route: string
}

export interface ComponentCategory {
    label: string
    items: ComponentLink[]
}

const categories: ComponentCategory[] = [
    {
        label: 'UI / Overlays',
        items: [
            { name: 'Dialog', route: '/documentation/dialog' },
            { name: 'Dropdown', route: '/documentation/dropdown' },
            { name: 'Modal', route: '/documentation/modal' }
        ]
    },
    {
        label: 'Data Display',
        items: [
            { name: 'Carousel', route: '/documentation/carousel' },
            { name: 'Collapse', route: '/documentation/collapse' },
            { name: 'Icon', route: '/documentation/icon' },
            { name: 'Image', route: '/documentation/image' },
            { name: 'Loading', route: '/documentation/loading' },
            { name: 'Message', route: '/documentation/message' },
            { name: 'Notification', route: '/documentation/notification' },
            { name: 'Progress', route: '/documentation/progress' },
            { name: 'Skeleton', route: '/documentation/skeleton' },
            { name: 'Snackbar', route: '/documentation/snackbar' },
            { name: 'Table', route: '/documentation/table' },
            { name: 'Tag', route: '/documentation/tag' },
            { name: 'Toast', route: '/documentation/toast' },
            { name: 'Tooltip', route: '/documentation/tooltip' }
        ]
    },
    {
        label: 'Form Controls',
        items: [
            { name: 'Autocomplete', route: '/documentation/autocomplete' },
            { name: 'Checkbox', route: '/documentation/checkbox' },
            { name: 'Clockpicker', route: '/documentation/clockpicker' },
            { name: 'Colorpicker', route: '/documentation/colorpicker' },
            { name: 'Datepicker', route: '/documentation/datepicker' },
            { name: 'Datetimepicker', route: '/documentation/datetimepicker' },
            { name: 'Field', route: '/documentation/field' },
            { name: 'Input', route: '/documentation/input' },
            { name: 'Numberinput', route: '/documentation/numberinput' },
            { name: 'Radio', route: '/documentation/radio' },
            { name: 'Rate', route: '/documentation/rate' },
            { name: 'Select', route: '/documentation/select' },
            { name: 'Slider', route: '/documentation/slider' },
            { name: 'Switch', route: '/documentation/switch' },
            { name: 'Taginput', route: '/documentation/taginput' },
            { name: 'Timepicker', route: '/documentation/timepicker' },
            { name: 'Upload', route: '/documentation/upload' }
        ]
    },
    {
        label: 'Navigation',
        items: [
            { name: 'Breadcrumb', route: '/documentation/breadcrumb' },
            { name: 'Menu', route: '/documentation/menu' },
            { name: 'Navbar', route: '/documentation/navbar' },
            { name: 'Pagination', route: '/documentation/pagination' },
            { name: 'Sidebar', route: '/documentation/sidebar' },
            { name: 'Steps', route: '/documentation/steps' },
            { name: 'Tabs', route: '/documentation/tabs' }
        ]
    }
]

export default categories
