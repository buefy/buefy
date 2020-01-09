import { shallowMount } from '@vue/test-utils'
import BCarouselList from '@components/carousel/CarouselList'
import BIcon from '@components/icon/Icon'

let wrapper

describe('BCarouselList', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCarouselList, {
            Component: BIcon
        })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BCarouselList')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })
})
