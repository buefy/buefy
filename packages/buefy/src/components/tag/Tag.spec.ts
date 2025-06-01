import { beforeEach, describe, expect, it } from 'vitest'

import { shallowMount, type VueWrapper } from '@vue/test-utils'
import BTag from '@components/tag/Tag.vue'

let wrapper: VueWrapper<InstanceType<typeof BTag>>

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

        wrapper.vm.close(new Event('test'))

        await wrapper.setProps({ disabled: true })
        wrapper.vm.close(new Event('test'))

        expect(wrapper.emitted().close).toHaveLength(1)
    })
})
