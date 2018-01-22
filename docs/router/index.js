import Vue from 'vue'
import Router from 'vue-router'

import { beforeEachGlobal } from './guards'
import meta from './meta'

Vue.use(Router)

function route(path, component) {
    return {
        path,
        name: path,
        meta: meta[path],
        component: () => import(`@/pages/${component}`)
    }
}

// Templates
const Documentation = () => import('@/templates/Documentation')
const Extensions = () => import('@/templates/Extensions')

const router = new Router({
    mode: 'hash',
    linkActiveClass: 'is-active',
    base: __dirname,
    routes: [
        route('/', 'Home'),
        {
            path: '/documentation',
            redirect: '/documentation/start',
            component: Documentation,
            children: [
                // Installation
                route('start', 'installation/Start'),
                route('customization', 'installation/Customization'),
                route('constructor-options', 'installation/ConstructorOptions'),
                // Layout
                route('layout', 'Layout'),
                // Components
                route('icon', 'components/icon/Icon'),
                route('dropdown', 'components/dropdown/Dropdown'),
                route('tooltip', 'components/tooltip/Tooltip'),
                route('modal', 'components/modal/Modal'),
                route('tabs', 'components/tabs/Tabs'),
                route('collapse', 'components/collapse/Collapse'),
                route('panel', 'components/panel/Panel'),
                route('tag', 'components/tag/Tag'),
                route('dialog', 'components/dialog/Dialog'),
                route('toast', 'components/toast/Toast'),
                route('snackbar', 'components/snackbar/Snackbar'),
                route('notification', 'components/notification/Notification'),
                route('message', 'components/message/Message'),
                route('loading', 'components/loading/Loading'),
                route('field', 'components/field/Field'),
                route('input', 'components/input/Input'),
                route('select', 'components/select/Select'),
                route('autocomplete', 'components/autocomplete/Autocomplete'),
                route('checkbox', 'components/checkbox/Checkbox'),
                route('radio', 'components/radio/Radio'),
                route('switch', 'components/switch/Switch'),
                route('datepicker', 'components/datepicker/Datepicker'),
                route('timepicker', 'components/timepicker/Timepicker'),
                route('taginput', 'components/taginput/Taginput'),
                route('upload', 'components/upload/Upload'),
                route('table', 'components/table/Table'),
                route('pagination', 'components/pagination/Pagination')
            ]
        },
        {
            path: '/extensions',
            redirect: '/extensions/cleavejs',
            component: Extensions,
            children: [
                route('cleavejs', 'extensions/cleavejs/Cleavejs'),
                route('sortablejs', 'extensions/sortablejs/Sortablejs')
            ]
        },
        // Global redirect
        { path: '*', redirect: '' }
    ]
})

router.beforeEach(beforeEachGlobal)

export default router
