import { shallowMount, mount } from '@vue/test-utils'
import BBreadcrumb from '@components/breadcrumb/Breadcrumb'

describe('BBreadcrumb', () => {
    let wrapper = shallowMount(BBreadcrumb)
    const items = [
        {
            label: 'Home',
            path: '/'
        },
        {
            label: 'Docs',
            path: '/documentation'
        },
        {
            label: 'Breadcrumb',
            path: '/documentation/breadcrumb'
        }
    ]

    it('is called', () => {
        expect(wrapper.name()).toBe('BBreadcrumb')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should set align to right', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items: items,
                align: 'is-right'
            }
        })

        expect(wrapper.classes()).toContain('is-right')
    })

    it('should set separator to arrow', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items: items,
                separator: 'has-arrow-separator'
            }
        })

        expect(wrapper.classes()).toContain('has-arrow-separator')
    })

    it('should set size to large', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items: items,
                size: 'is-large'
            }
        })

        expect(wrapper.classes()).toContain('is-large')
    })

    it('computes breadcrumbClasses correctly', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items: items,
                align: 'is-left',
                separator: 'has-dot-separator',
                size: 'is-medium'
            }
        })

        expect(wrapper.classes()).toContain('is-left')
        expect(wrapper.classes()).toContain('has-dot-separator')
        expect(wrapper.classes()).toContain('is-medium')
    })
})
