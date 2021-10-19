import { shallowMount } from '@vue/test-utils'
import BBacktotop from '@components/backtotop/Backtotop.vue'

describe('BBacktotop', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(BBacktotop, {
            propsData: {
                position: 'is-bottom-right',
                label: 'Back To Top',
                type: 'is-primary',
                inverted: true
            }
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BBacktotop')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should be position fixed', () => {
        expect(wrapper.contains('.is-bottom-right')).toBe(true)
    })

    it('should contains a button', () => {
        expect(wrapper.contains('b-button')).toBe(true)
    })

    it('should be inverted and colored with primary', () => {
        const button = wrapper.find('b-button')

        expect(button.attributes('inverted')).toBe('true')
        expect(button.attributes('type')).toBe('is-primary')
    })

    it('should include text', () => {
        const button = wrapper.find('b-button')

        expect(button.attributes('label')).toBe('Back To Top')
    })
})
