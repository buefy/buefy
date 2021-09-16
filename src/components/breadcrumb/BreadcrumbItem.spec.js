import { mount } from '@vue/test-utils'
import BBreadcrumbItem from '@components/breadcrumb/BreadcrumbItem.vue'

describe('BBreadcrumbItem', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(BBreadcrumbItem)
    })

    it('is called', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
