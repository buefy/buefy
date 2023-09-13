import { shallowMount } from '@vue/test-utils'
import BTag from '@components/tag/Tag'

let wrapper

describe('BTag', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTag)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTag')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('emit close event when closing if not disabled', async () => {
        await wrapper.setProps({ disabled: false })

        wrapper.vm.close()

        await wrapper.setProps({ disabled: true })
        wrapper.vm.close()

        expect(wrapper.emitted().close).toHaveLength(1)
    })
})
