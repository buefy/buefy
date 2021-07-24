import { shallowMount } from '@vue/test-utils'
import BAvatar from '@components/avatar/Avatar'

describe('BAvatar', () => {
    it('is called', () => {
        let wrapper = shallowMount(BAvatar)

        expect(wrapper.name()).toBe('BAvatar')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        let wrapper = shallowMount(BAvatar)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('render image', () => {
        const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'

        let wrapper = shallowMount(BAvatar, {
            propsData: {
                src
            }
        })

        expect(wrapper.contains('img')).toBe(true)
    })

    it('render text if the is no image', () => {
        const username = 'JD'
        let wrapper = shallowMount(BAvatar, {
            propsData: {
                username
            }
        })

        expect(wrapper.contains('p')).toBe(true)
    })

    it('render image as priority than username if both of them are provided', () => {
        const username = 'JD'
        const src = 'http://getdrawings.com/free-icon/male-avatar-icon-52.png'

        let wrapper = shallowMount(BAvatar, {
            propsData: {
                src,
                username
            }
        })

        expect(wrapper.contains('img')).toBe(true)
        expect(wrapper.contains('p')).toBe(false)
    })

    it('compute imageClasses as expected', () => {
        // let wrapper = shallowMount(BAvatar)
    })

    it('generateBgColorForAvatar correctly', () => {
        // let wrapper = shallowMount(BAvatar)
    })

    it('setText correctly', () => {
        // let wrapper = shallowMount(BAvatar)
    })

    it('calculateTextSize correctly', () => {
        // let wrapper = shallowMount(BAvatar)
    })
})

// to render image as priority than username /
// if no src then render username /
// if no username then render image /
// if no username and avatar then render random image (if possible)
// filter size by regex pattern
// refactor <imgClasses> to work smooth and good
// if provided the color of the avatar then set it! if not then generate random color each time
