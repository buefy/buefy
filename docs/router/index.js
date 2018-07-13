import Vue from 'vue'
import Router from 'vue-router'

import { afterEachGlobal } from './guards'
import routes from '@/data/routes'

Vue.use(Router)

function route(path, component) {
    return {
        path,
        name: path,
        meta: routes[path],
        component: () => import(`@/pages/${component}`)
    }
}

// Templates
const Documentation = () => import('@/templates/Documentation')

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    base: __dirname,
    routes: [
        route('/', 'Home'),
        {
            path: '/',
            component: Documentation,
            children: [
                // Documentation
                route('documentation', 'Documentation'),
                route('documentation/start', 'installation/Start'),
                route('documentation/customization', 'installation/Customization'),
                route('documentation/constructor-options', 'installation/ConstructorOptions'),
                route('documentation/layout', 'Layout'),
                route('documentation/icon', 'components/icon/Icon'),
                route('documentation/dropdown', 'components/dropdown/Dropdown'),
                route('documentation/tooltip', 'components/tooltip/Tooltip'),
                route('documentation/modal', 'components/modal/Modal'),
                route('documentation/tabs', 'components/tabs/Tabs'),
                route('documentation/collapse', 'components/collapse/Collapse'),
                route('documentation/panel', 'components/panel/Panel'),
                route('documentation/tag', 'components/tag/Tag'),
                route('documentation/dialog', 'components/dialog/Dialog'),
                route('documentation/toast', 'components/toast/Toast'),
                route('documentation/snackbar', 'components/snackbar/Snackbar'),
                route('documentation/notification', 'components/notification/Notification'),
                route('documentation/message', 'components/message/Message'),
                route('documentation/loading', 'components/loading/Loading'),
                route('documentation/field', 'components/field/Field'),
                route('documentation/input', 'components/input/Input'),
                route('documentation/select', 'components/select/Select'),
                route('documentation/autocomplete', 'components/autocomplete/Autocomplete'),
                route('documentation/checkbox', 'components/checkbox/Checkbox'),
                route('documentation/radio', 'components/radio/Radio'),
                route('documentation/switch', 'components/switch/Switch'),
                route('documentation/datepicker', 'components/datepicker/Datepicker'),
                route('documentation/timepicker', 'components/timepicker/Timepicker'),
                route('documentation/taginput', 'components/taginput/Taginput'),
                route('documentation/upload', 'components/upload/Upload'),
                route('documentation/table', 'components/table/Table'),
                route('documentation/pagination', 'components/pagination/Pagination'),
                // Extensions
                route('extensions', 'Extensions'),
                route('extensions/cleavejs', 'extensions/cleavejs/Cleavejs'),
                route('extensions/sortablejs', 'extensions/sortablejs/Sortablejs')
            ]
        },
        // Global redirect
        { path: '*', redirect: '' }
    ]
})

router.afterEach(afterEachGlobal)

export default router
