import { shallowMount, mount } from '@vue/test-utils'
import BTaginput from '@components/taginput/Taginput'
import BTag from '@components/tag/Tag'

describe('BTaginput', () => {
    it('is called', () => {
        const wrapper = shallowMount(BTaginput)
        expect(wrapper.name()).toBe('BTaginput')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BTaginput)
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('no display counter when hasCounter property set for false', () => {
        const wrapper = shallowMount(BTaginput, {
            propsData: { maxlength: 100 }
        })
        expect(wrapper.find('small.counter').exists()).toBeTruthy()

        wrapper.setProps({ hasCounter: false })
        expect(wrapper.find('small.counter').exists()).toBeFalsy()
    })

    it('should send close-type prop to BTag component properly', () => {
        const value = ['Test Value']
        const closeType = 'is-danger'
        const wrapper = shallowMount(BTaginput, {
            propsData: { value, closeType }
        })
        const Tag = wrapper.find(BTag)
        expect(Tag.attributes('closetype')).toBe(closeType)
    })

    it('should listen Autocomplete events', async () => {
        let firedHeader = false
        let firedFooter = false
        const wrapper = mount(BTaginput, {
            propsData: {
                autocomplete: true,
                iconRight: 'close-circle',
                iconRightClickable: true,
                selectableHeader: true,
                selectableFooter: true,
                data: ['Frank', 'Eddy', 'Howard']
            },
            slots: {
                header: '<h1>SLOT HEADER</h1>',
                footer: '<h1>SLOT FOOTER</h1>'
            },
            listeners: {
                'icon-right-click': () => {
                    wrapper.vm.tags = []
                },
                'select-header': () => {
                    firedHeader = true
                },
                'select-footer': () => {
                    firedFooter = true
                }
            }
        })

        const $input = wrapper.find('.taginput.control input')
        const $iconRight = wrapper.find('.icon.is-right')
        const $dropdownItemHeader = wrapper.find('.dropdown-item.dropdown-header')
        const $dropdownItemFooter = wrapper.find('.dropdown-item.dropdown-footer')

        $input.trigger('focus')
        $input.setValue('Frank')
        await wrapper.vm.$nextTick()

        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Down'})
        $input.trigger('keydown', {'key': 'Enter'})
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.tags).toHaveLength(1)

        $iconRight.trigger('click')
        await wrapper.vm.$nextTick()

        $dropdownItemHeader.trigger('click')
        $dropdownItemFooter.trigger('click')

        expect(wrapper.vm.tags).toHaveLength(0)
        expect(firedHeader).toBeTruthy()
        expect(firedFooter).toBeTruthy()
    })
})
