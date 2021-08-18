import { shallowMount, mount } from '@vue/test-utils'
import BAvatar from '@components/avatar/Avatar'
import BImage from '../image/Image'

describe('BAvatar', () => {
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
        const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'

        const wrapper = shallowMount(BAvatar, {
            propsData: {
                src
            }
        })

        expect(wrapper.contains(BImage)).toBe(true)
    })

    it('render text if the is no image', () => {
        const label = 'JD'

        const wrapper = shallowMount(BAvatar, {
            propsData: {
                label
            }
        })

        expect(wrapper.contains('p')).toBe(true)
    })

    it('render image as priority than label if both of them are provided', () => {
        const label = 'JD'
        const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'

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
        const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'
        const rounded = true
        const size = 'is-48x48'

        const wrapper = shallowMount(BAvatar, {
            propsData: {
                src,
                rounded,
                size
            }
        })

        const vm = wrapper.vm

        expect(vm.avatarClasses).toBe('is-rounded is-48x48')
    })

    it('setColorForAvatar correctly', () => {
        const label = 'JD'
        const type = 'has-background-dark'
        const bulmaKnownColors = [
            'has-background-black',
            'has-background-dark',
            'has-background-primary',
            'has-background-link',
            'has-background-info',
            'has-background-success',
            'has-background-warning',
            'has-background-danger'
        ]

        let wrapper = shallowMount(BAvatar, {
            propsData: {
                label,
                type
            }
        })

        let vm = wrapper.vm

        expect(vm.setColorForAvatar).toBe('has-background-dark')

        // Generate random color if there is no color provided
        wrapper = shallowMount(BAvatar, {
            propsData: {
                label
            }
        })

        vm = wrapper.vm

        expect(bulmaKnownColors).toContain(vm.setColorForAvatar)

        // return to default color if provided invalid bulma class
        const invalidVariant = 'has-background-red'

        wrapper = shallowMount(BAvatar, {
            propsData: {
                label,
                type: invalidVariant
            }

        })

        vm = wrapper.vm

        expect(vm.setColorForAvatar).toBe('has-background-primary')
    })

    it('setText correctly', () => {
        const label = 'JD'
        const longlabel = 'Jhonedoe'

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
