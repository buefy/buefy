import { mount } from '@vue/test-utils'
import BCarousel from '@components/carousel/Carousel'
import BCarouselItem from '@components/carousel/CarouselItem'

let wrapper
let wrapperParent
let wrapperCarousel

const WrapperComp = {
    data() {
        return {
            show1: true
        }
    },
    template: `
        <BCarousel ref="carousel">
            <BCarouselItem value="item1"/>
            <BCarouselItem ref="testItem" value="item2"/>
            <BCarouselItem value="item3"/>
        </BCarousel>`,
    components: {
        BCarousel, BCarouselItem
    }
}

describe('BCarouselItem', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp, { sync: false })
        wrapperCarousel = wrapperParent.find({ ref: 'carousel' })
        wrapper = wrapperParent.find({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.name()).toBe('BCarouselItem')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })

    it('transition correctly', () => {
        wrapperCarousel.vm.changeActive(2)
        expect(wrapper.vm.transition).toBe('slide-prev')

        wrapperCarousel.vm.changeActive(0)
        expect(wrapper.vm.transition).toBe('slide-next')

        wrapperCarousel.setProps({ animated: 'fade' })
        wrapperCarousel.vm.changeActive(0)
        expect(wrapper.vm.transition).toBe('fade')
    })
})
