import { shallowMount, mount } from '@vue/test-utils'
import BBreadcrumb from '@components/breadcrumb/Breadcrumb'

describe('BBreadcrumb', () => {
    let wrapper = shallowMount(BBreadcrumb)
    let tag = 'router-link'
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

    it('should be router-link tag, then it should be a tag', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                tag,
                items
            }
        })

        expect(wrapper.contains(tag)).toBeTruthy()

        // a tag
        tag = 'a'

        wrapper = mount(BBreadcrumb, {
            propsData: {
                tag,
                items
            }
        })

        expect(wrapper.contains(tag)).toBeTruthy()
    })

    it('should set align to right', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items,
                align: 'is-right'
            }
        })

        expect(wrapper.classes()).toContain('is-right')
    })

    it('should set separator to arrow', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items,
                separator: 'has-arrow-separator'
            }
        })

        expect(wrapper.classes()).toContain('has-arrow-separator')
    })

    it('should set size to large', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items,
                size: 'is-large'
            }
        })

        expect(wrapper.classes()).toContain('is-large')
    })

    it('computes breadcrumbClasses correctly', () => {
        wrapper = mount(BBreadcrumb, {
            propsData: {
                items,
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
