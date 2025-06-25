import { defineComponent } from 'vue'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import NoticeMixin from '@utils/NoticeMixin'

describe('NoticeMixin', () => {
    HTMLElement.prototype.insertAdjacentElement = vi.fn()

    const component = defineComponent({
        mixins: [NoticeMixin],
        template: '<div class="b-component"></div>'
    })
    let wrapper: VueWrapper<InstanceType<typeof component>>

    beforeEach(() => {
        wrapper = shallowMount(component, {
            attachTo: document.body
        })
    })

    it('is active', () => {
        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('returns correct transition depending on position', async () => {
        const topTransition = {
            enter: 'fadeInDown',
            leave: 'fadeOut'
        }
        const bottomTransition = {
            enter: 'fadeInUp',
            leave: 'fadeOut'
        }
        const expected = [
            ['is-top', topTransition],
            ['is-top-right', topTransition],
            ['is-top-left', topTransition],
            ['is-bottom', bottomTransition],
            ['is-bottom-right', bottomTransition],
            ['is-bottom-left', bottomTransition]
        ] as const
        for (const [key, value] of expected) {
            await wrapper.setProps({ position: key })
            expect(wrapper.vm.transition).toEqual(value)
        }

        expect(wrapper.vm.isActive).toBeTruthy()
    })

    it('reset isActive on close', () => {
        wrapper.vm.close()
        expect(wrapper.vm.isActive).toBeFalsy()
    })
})
