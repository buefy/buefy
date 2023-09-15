import { mount } from '@vue/test-utils'
import BBreadcrumbItem from '@components/breadcrumb/BreadcrumbItem'

describe('BBreadcrumbItem', () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(BBreadcrumbItem, {
            props: {
                tag: 'a'
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should have a li tag', () => {
        expect(wrapper.find('li').exists()).toBeTruthy()
    })
})
