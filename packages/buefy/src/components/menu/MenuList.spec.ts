import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import BMenuList from '@components/menu/MenuList.vue'

const Menu = defineComponent({
    components: { BMenuList },
    template: `
    <div>
        <b-menu-list label="Test">
        </b-menu-list>
    </div>
    `
})

let wrapper: VueWrapper<InstanceType<typeof Menu>>

describe('BMenuList', () => {
    beforeEach(() => {
        wrapper = mount(Menu)
    })

    it('is called', () => {
        expect(wrapper.findAll('.menu-label')[0].text()).toBe('Test')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('slot label', () => {
        expect(wrapper.findAll('.menu-label')[0].text()).toBe('Test')
    })
})
