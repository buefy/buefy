import { shallowMount, mount } from '@vue/test-utils'
import BAvatar from '@components/avatar/Avatar'
import BImage from '../image/Image'

describe('BAvatar', () => {
    const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'
    const label = 'JD'
    const longlabel = 'Jhonedoe'
    const rounded = true
    const size = 'is-48x48'
    const type = 'has-background-primary'

    it('is called', () => {
        const wrapper = shallowMount(BAvatar)

        expect(wrapper.name()).toBe('BAvatar')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = mount(BAvatar)

        expect(wrapper.element).toMatchSnapshot()
    })

    it('render image', () => {
        const wrapper = shallowMount(BAvatar, {
            propsData: {
                src
            }
        })

        expect(wrapper.contains(BImage)).toBe(true)
    })

    it('render text if the is no image', () => {
        const wrapper = shallowMount(BAvatar, {
            propsData: {
                label
            }
        })

        expect(wrapper.contains('p')).toBe(true)
    })

    it('render image as priority than label if both of them are provided', () => {
        const wrapper = shallowMount(BAvatar, {
            propsData: {
                src,
                label
            }
        })

        expect(wrapper.contains(BImage)).toBe(true)
        expect(wrapper.contains('p')).toBe(false)
    })

    it('compute avatarClasses as expected', () => {
        const wrapper = shallowMount(BAvatar, {
            propsData: {
                src,
                rounded,
                size,
                type
            }
        })

        const vm = wrapper.vm

        expect(vm.avatarClasses).toEqual({'is-rounded': true, 'is-48x48': true, 'has-background-primary': false})
    })

    it('setText correctly', () => {
        // if provided one or two letters of the label
        let wrapper = shallowMount(BAvatar, {
            propsData: {
                label
            }
        })

        let vm = wrapper.vm

        expect(vm.setText).toBe('JD')

        // if provided long label
        wrapper = shallowMount(BAvatar, {
            propsData: {
                label: longlabel
            }
        })

        vm = wrapper.vm

        expect(vm.setText).toBe('JH')
    })
})
