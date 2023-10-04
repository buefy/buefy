import { shallowMount, mount } from '@vue/test-utils'
import BBreadcrumb from '@components/breadcrumb/Breadcrumb'

describe('BBreadcrumb', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(BBreadcrumb)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BBreadcrumb')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should set align to right', () => {
        wrapper = mount(BBreadcrumb, {
            props: {
                align: 'is-right'
            }
        })

        expect(wrapper.classes()).toContain('is-right')
    })

    it('should set separator to arrow', () => {
        wrapper = mount(BBreadcrumb, {
            props: {
                separator: 'has-arrow-separator'
            }
        })

        expect(wrapper.classes()).toContain('has-arrow-separator')
    })

    it('should set size to large', () => {
        wrapper = mount(BBreadcrumb, {
            props: {
                size: 'is-large'
            }
        })

        expect(wrapper.classes()).toContain('is-large')
    })

    it('computes breadcrumbClasses correctly', () => {
        wrapper = mount(BBreadcrumb, {
            props: {
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
