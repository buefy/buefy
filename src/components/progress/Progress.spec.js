import { shallowMount } from '@vue/test-utils'
import BProgress from '@components/progress/Progress'

describe('BProgress', () => {
    it('is called', () => {
        const wrapper = shallowMount(BProgress)
        expect(wrapper.name()).toBe('BProgress')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BProgress)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('add value attribute when a value is passed', () => {
        const value = 50
        const wrapper = shallowMount(BProgress)
        wrapper.setProps({ value })

        expect(wrapper.find('.progress').attributes().value).toEqual(`${value}`)
    })

    describe('Passing a value prop', () => {
        it('add value attribute to the <progress> element', () => {
            const value = 50
            const wrapper = shallowMount(BProgress, {
                propsData: {value}
            })
            expect(wrapper.find('.progress').attributes().value).toEqual(`${value}`)
        })

        describe('Passing true to show-value prop', () => {
            it('adds a help <p> element in the root div.progress-wrapper when "show-value" prop is true', () => {
                const value = 50
                const wrapper = shallowMount(BProgress, {
                    propsData: {
                        value,
                        showValue: true
                    }
                })
                expect(wrapper.find('.progress-wrapper').find('p.progress-value').text()).toEqual(`${value}`)
            })

            it('display the value as percent when passing "percent" for the format prop', () => {
                const value = 50
                const max = 100
                const format = 'percent'
                const wrapper = shallowMount(BProgress, {
                    propsData: {
                        value,
                        max,
                        format,
                        showValue: true
                    }
                })

                expect(wrapper.find('.progress').text()).toEqual(`${value * max / 100}%`)
            })

            it('display the trailing zeroes when setting the keepTrailingZeroes prop', () => {
                const value = 50
                const keepTrailingZeroes = true
                const wrapper = shallowMount(BProgress, {
                    propsData: {
                        value,
                        keepTrailingZeroes,
                        showValue: true
                    }
                })

                expect(wrapper.find('.progress').text()).toEqual(`${value}.00`)
            })
        })
    })
})
