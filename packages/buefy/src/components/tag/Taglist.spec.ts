import { beforeEach, describe, expect, it } from 'vitest'

import { shallowMount, type VueWrapper } from '@vue/test-utils'
import BTaglist from '@components/tag/Taglist.vue'

let wrapper: VueWrapper<InstanceType<typeof BTaglist>>

describe('BTaglist', () => {
    beforeEach(() => {
        wrapper = shallowMount(BTaglist)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BTaglist')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
