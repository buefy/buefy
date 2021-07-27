import { shallowMount, mount } from '@vue/test-utils'
import BAvatar from '@components/avatar/Avatar'

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

        expect(wrapper.contains('img')).toBe(true)
    })

    it('render text if the is no image', () => {
        const username = 'JD'

        const wrapper = shallowMount(BAvatar, {
            propsData: {
                username
            }
        })

        expect(wrapper.contains('p')).toBe(true)
    })

    it('render image as priority than username if both of them are provided', () => {
        const username = 'JD'
        const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'

        const wrapper = shallowMount(BAvatar, {
            propsData: {
                src,
                username
            }
        })

        expect(wrapper.contains('img')).toBe(true)
        expect(wrapper.contains('p')).toBe(false)
    })

    it('compute imgClasses as expected', () => {
        const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'
        const rounded = true
        const size = '48x48'

        const wrapper = shallowMount(BAvatar, {
            propsData: {
                src,
                rounded,
                size
            }
        })

        const vm = wrapper.vm

        expect(vm.imgClasses).toBe('image rounded is-48x48')
    })

    it('generateBgColorForAvatar correctly', () => {
        const username = 'JD'
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
                username,
                type
            }
        })

        let vm = wrapper.vm

        expect(vm.generateBgColorForAvatar).toBe('has-background-dark')

        // Generate random color if there is no color provided
        wrapper = shallowMount(BAvatar, {
            propsData: {
                username
            }
        })

        vm = wrapper.vm

        expect(bulmaKnownColors).toContain(vm.generateBgColorForAvatar)

        // return to default color if provided invalid bulma class
        const invalidVariant = 'has-background-red'

        wrapper = shallowMount(BAvatar, {
            propsData: {
                username,
                type: invalidVariant
            }

        })

        vm = wrapper.vm

        expect(vm.generateBgColorForAvatar).toBe('has-background-primary')
    })

    it('setText correctly', () => {
        const username = 'JD'
        const longusername = 'Jhonedoe'

        // if provided one or two letters of the username
        let wrapper = shallowMount(BAvatar, {
            propsData: {
                username
            }
        })

        let vm = wrapper.vm

        expect(vm.setText).toBe('JD')

        // if provided long username
        wrapper = shallowMount(BAvatar, {
            propsData: {
                username: longusername
            }
        })

        vm = wrapper.vm

        expect(vm.setText).toBe('JH')
    })
})
