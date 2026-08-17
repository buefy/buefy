import { beforeEach, describe, expect, it } from 'vitest'

import { shallowMount, type VueWrapper } from '@vue/test-utils'
import BBadge from '@components/badge/Badge.vue'

let wrapper: VueWrapper<InstanceType<typeof BBadge>>

describe('BBadge', () => {
    beforeEach(() => {
        wrapper = shallowMount(BBadge, { props: { value: 3 } })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BBadge')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('renders slot content as the anchor', () => {
        wrapper = shallowMount(BBadge, { slots: { default: '<span class="anchor">A</span>' } })

        expect(wrapper.find('.anchor').exists()).toBe(true)
    })

    it('does not render the badge span when visible is false', async () => {
        await wrapper.setProps({ visible: false })

        expect(wrapper.find('.b-badge-badge').exists()).toBe(false)
    })

    it('does not render badge content when value is empty and dot is false', () => {
        wrapper = shallowMount(BBadge)

        expect(wrapper.find('.b-badge-badge').exists()).toBe(false)
    })

    it('renders a dot with no text when dot is true', () => {
        wrapper = shallowMount(BBadge, { props: { dot: true } })

        expect(wrapper.find('.b-badge-badge').classes()).toContain('is-dot')
        expect(wrapper.find('.b-badge-badge').text()).toBe('')
    })

    it('applies position class to the badge', async () => {
        await wrapper.setProps({ position: 'is-bottom-left' })

        expect(wrapper.find('.b-badge-badge').classes()).toContain('is-bottom-left')
    })

    it('applies type and rounded as classes on the badge', async () => {
        await wrapper.setProps({ type: 'is-danger', rounded: true })

        const classes = wrapper.find('.b-badge-badge').classes()
        expect(classes).toContain('is-danger')
        expect(classes).toContain('is-rounded')
    })

    it('truncates numeric value beyond max', async () => {
        await wrapper.setProps({ value: 150, max: 99 })

        expect(wrapper.find('.b-badge-badge').text()).toBe('99+')
    })

    it('does not truncate value at or below max', async () => {
        await wrapper.setProps({ value: 99, max: 99 })

        expect(wrapper.find('.b-badge-badge').text()).toBe('99')
    })
})
