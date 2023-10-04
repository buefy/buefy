import { shallowMount } from '@vue/test-utils'
import BSelect from '@components/select/Select'

let wrapper

describe('BSelect', () => {
    beforeEach(() => {
        wrapper = shallowMount(BSelect)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BSelect')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('has a select element', () => {
        expect(wrapper.find('select').exists()).toBeTruthy()
    })

    it('emit input event with value when value change', async () => {
        await wrapper.setProps({ modelValue: true })
        expect(wrapper.vm.computedValue).toBeTruthy()
        wrapper.vm.computedValue = false
        const valueEmitted = wrapper.emitted()['update:modelValue'][0]
        expect(valueEmitted).toContainEqual(false)
    })
})
