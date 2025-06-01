import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BMenu from '@components/menu/Menu.vue'

let wrapper: VueWrapper<InstanceType<typeof BMenu>>

describe('BMenu', () => {
    beforeEach(() => {
        wrapper = shallowMount(BMenu)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BMenu')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
