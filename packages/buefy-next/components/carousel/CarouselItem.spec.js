import { mount } from '@vue/test-utils'
import BCarousel from '@components/carousel/Carousel'
import BCarouselItem from '@components/carousel/CarouselItem'

let wrapper
let wrapperParent
let wrapperCarousel

const WrapperComp = {
    template: `
        <BCarousel ref="carousel" :animated="animated">
            <BCarouselItem value="item1"/>
            <BCarouselItem ref="testItem" value="item2"/>
            <BCarouselItem value="item3"/>
        </BCarousel>`,
    props: {
        // to indirectly change BCarousel's animated prop
        animated: 'slide'
    },
    components: {
        BCarousel, BCarouselItem
    }
}

describe('BCarouselItem', () => {
    beforeEach(() => {
        wrapperParent = mount(WrapperComp)
        wrapperCarousel = wrapperParent.findComponent({ ref: 'carousel' })
        wrapper = wrapperParent.findComponent({ ref: 'testItem' })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BCarouselItem')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('computes its position correctly', () => {
        expect(wrapper.vm.index).toBe(1)
    })

    it('transition correctly', async () => {
        wrapperCarousel.vm.changeActive(2)
        expect(wrapper.vm.transition).toBe('slide-prev')

        wrapperCarousel.vm.changeActive(0)
        expect(wrapper.vm.transition).toBe('slide-next')

        await wrapperParent.setProps({ animated: 'fade' })
        wrapperCarousel.vm.changeActive(0)
        expect(wrapper.vm.transition).toBe('fade')
    })
})
