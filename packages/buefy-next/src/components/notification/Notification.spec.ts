import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import BNotification from '@components/notification/Notification.vue'

let wrapper: VueWrapper<InstanceType<typeof BNotification>>

describe('BNotification', () => {
    beforeEach(() => {
        wrapper = shallowMount(BNotification)
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BNotification')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
