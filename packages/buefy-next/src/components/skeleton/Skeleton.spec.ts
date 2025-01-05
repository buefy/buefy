import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BSkeleton from '@components/skeleton/Skeleton.vue'

let wrapper: VueWrapper<InstanceType<typeof BSkeleton>>

describe('BSkeleton', () => {
    beforeEach(() => {
        wrapper = mount(BSkeleton)
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
