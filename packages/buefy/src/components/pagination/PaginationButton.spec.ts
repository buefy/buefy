import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BPaginationButton from '@components/pagination/PaginationButton.vue'

let wrapper: VueWrapper<InstanceType<typeof BPaginationButton>>
const page = 5
const defaultProps = {
    page: {
        number: page,
        isCurrent: false,
        click: () => {},
        input: () => {},
        disabled: false,
        class: '',
        'aria-label': ''
    }
}

describe('BPagination', () => {
    beforeEach(() => {
        wrapper = shallowMount(BPaginationButton, {
            props: defaultProps
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BPaginationButton')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('returns href as expected', async () => {
        expect(wrapper.vm.href).toBe('#')

        await wrapper.setProps({ tag: 'button' })
        expect(wrapper.vm.href).toBeUndefined()
    })
})
