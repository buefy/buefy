import { createRouter, createWebHistory } from 'vue-router'
import { afterEachGlobal } from './guards.js'
import routes from '@/data/routes'

export function createDocsRouter(vueApp) {
    function route(path, component) {
        return {
            path,
            name: path,
            meta: routes[path],
            // `component` is now a function to import the component; e.g.,
            // () => import('@/pages/Home.vue')
            //
            // due to Vite's limitation on dynamic import:
            // https://vitejs.dev/guide/features.html#dynamic-import
            component,
        }
    }

    // Templates
    const Documentation = () => import('@/templates/Documentation.vue')
    const NotFound = () => import('@/pages/404.vue')

    const router = createRouter({
        history: createWebHistory(),
        linkActiveClass: 'is-active',
        routes: [
            route('/', () => import('@/pages/Home.vue')),
            {
                path: '/',
                component: Documentation,
                children: [
                    // Documentation
                    route('documentation', () => import('@/pages/Documentation.vue')),
                    route('documentation/start', () => import('@/pages/installation/Start.vue')),
                    route('documentation/customization', () => import('@/pages/installation/Customization.vue')),
                    route('documentation/constructor-options', () => import('@/pages/installation/ConstructorOptions.vue')),
                    route('documentation/layout', () => import('@/pages/Layout.vue')),
                    route('documentation/icon', () => import('@/pages/components/icon/Icon.vue')),
                    route('documentation/dropdown', () => import('@/pages/components/dropdown/Dropdown.vue')),
                    route('documentation/tooltip', () => import('@/pages/components/tooltip/Tooltip.vue')),
                    route('documentation/modal', () => import('@/pages/components/modal/Modal.vue')),
                    route('documentation/tabs', () => import('@/pages/components/tabs/Tabs.vue')),
                    route('documentation/collapse', () => import('@/pages/components/collapse/Collapse.vue')),
                    route('documentation/tag', () => import('@/pages/components/tag/Tag.vue')),
                    route('documentation/dialog', () => import('@/pages/components/dialog/Dialog.vue')),
                    route('documentation/toast', () => import('@/pages/components/toast/Toast.vue')),
                    route('documentation/snackbar', () => import('@/pages/components/snackbar/Snackbar.vue')),
                    route('documentation/navbar', () => import('@/pages/components/navbar/Navbar.vue')),
                    route('documentation/notification', () => import('@/pages/components/notification/Notification.vue')),
                    route('documentation/message', () => import('@/pages/components/message/Message.vue')),
                    route('documentation/loading', () => import('@/pages/components/loading/Loading.vue')),
                    route('documentation/field', () => import('@/pages/components/field/Field.vue')),
                    route('documentation/input', () => import('@/pages/components/input/Input.vue')),
                    route('documentation/select', () => import('@/pages/components/select/Select.vue')),
                    route('documentation/autocomplete', () => import('@/pages/components/autocomplete/Autocomplete.vue')),
                    route('documentation/checkbox', () => import('@/pages/components/checkbox/Checkbox.vue')),
                    route('documentation/radio', () => import('@/pages/components/radio/Radio.vue')),
                    route('documentation/switch', () => import('@/pages/components/switch/Switch.vue')),
                    route('documentation/datepicker', () => import('@/pages/components/datepicker/Datepicker.vue')),
                    route('documentation/timepicker', () => import('@/pages/components/timepicker/Timepicker.vue')),
                    route('documentation/clockpicker', () => import('@/pages/components/clockpicker/Clockpicker.vue')),
                    route('documentation/taginput', () => import('@/pages/components/taginput/Taginput.vue')),
                    route('documentation/upload', () => import('@/pages/components/upload/Upload.vue')),
                    route('documentation/table', () => import('@/pages/components/table/Table.vue')),
                    route('documentation/pagination', () => import('@/pages/components/pagination/Pagination.vue')),
                    route('documentation/breadcrumb', () => import('@/pages/components/breadcrumb/Breadcrumb.vue')),
                    route('documentation/button', () => import('@/pages/components/button/Button.vue')),
                    route('documentation/numberinput', () => import('@/pages/components/numberinput/Numberinput.vue')),
                    route('documentation/steps', () => import('@/pages/components/steps/Steps.vue')),
                    route('documentation/menu', () => import('@/pages/components/menu/Menu.vue')),
                    route('documentation/slider', () => import('@/pages/components/slider/Slider.vue')),
                    route('documentation/progress', () => import('@/pages/components/progress/Progress.vue')),
                    route('documentation/carousel', () => import('@/pages/components/carousel/Carousel.vue')),
                    route('documentation/rate', () => import('@/pages/components/rate/Rate.vue')),
                    route('documentation/datetimepicker', () => import('@/pages/components/datetimepicker/Datetimepicker.vue')),
                    route('documentation/sidebar', () => import('@/pages/components/sidebar/Sidebar.vue')),
                    route('documentation/skeleton', () => import('@/pages/components/skeleton/Skeleton.vue')),
                    route('documentation/image', () => import('@/pages/components/image/Image.vue')),
                    route('documentation/colorpicker', () => import('@/pages/components/colorpicker/Colorpicker.vue')),
                    // Extensions
                    route('extensions', () => import('@/pages/Extensions.vue')),
                    route('extensions/cleavejs', () => import('@/pages/extensions/cleavejs/Cleavejs.vue')),
                    route('extensions/sortablejs', () => import('@/pages/extensions/sortablejs/Sortablejs.vue')),
                    route('extensions/veevalidate', () => import('@/pages/extensions/veevalidate/VeeValidate.vue')),
                    route('extensions/bulmacssvars', () => import('@/pages/extensions/bulmacssvars/BulmaCssVars.vue')),
                    route('extensions/vuebreakpointmixin', () => import('@/pages/extensions/vuebreakpointmixin/VueBreakpointMixin.vue')),
                    // Expo
                    route('expo', () => import('@/pages/Expo.vue'))
                ]
            },
            // Global redirect
            // { path: '*', redirect: '404' }
            // 404 page
            {
                path: '/:pathMatch(.*)*',
                name: 'notfound',
                meta: routes.notfound,
                component: NotFound
            }
        ],
        scrollBehavior(to, from, savedPosition) {
            if (to.hash) {
                return {
                    el: to.hash
                }
            }
        }
    })

    router.afterEach(afterEachGlobal.bind(null, vueApp))

    return router
}
