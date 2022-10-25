import { mount } from '@vue/test-utils'
import BBreadcrumbItem from '@components/breadcrumb/BreadcrumbItem.vue'

describe('BBreadcrumbItem', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(BBreadcrumbItem, {
            propsData: {
                tag: 'a'
            }
        })
    })

    it('is called', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have a li tag', () => {
        expect(wrapper.contains('li')).toBeTruthy()
    })
})
