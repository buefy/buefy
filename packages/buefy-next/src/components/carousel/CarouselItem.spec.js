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
            <BCarouselItem ref="testItem2" value="item3"/>
        </BCarousel>`,
    props: {
        // to indirectly change BCarousel's animated prop
        animated: {
            type: String,
            default: 'slide'
        }
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

    it('update active state', () => {
        expect(wrapper.vm.isActive).toBe(false)

        wrapperCarousel.vm.changeActive(1)
        expect(wrapper.vm.isActive).toBe(true)

        wrapperCarousel.vm.changeActive(2)
        expect(wrapper.vm.isActive).toBe(false)
    })

    describe('with explicit order', () => {
        let wrapper
        let wrapperCarousel
        let wrapperTestItem

        beforeEach(() => {
            wrapper = mount({
                template: `
                    <BCarousel ref="carousel">
                        <BCarouselItem ref="testItem" :order="2" />
                        <BCarouselItem :order="1" />
                        <BCarouselItem :order="3" />
                    </BCarousel>`,
                components: { BCarousel, BCarouselItem }
            })
            wrapperCarousel = wrapper.findComponent({ ref: 'carousel' })
            wrapperTestItem = wrapper.findComponent({ ref: 'testItem' })
        })

        it('update active state', () => {
            expect(wrapperTestItem.vm.isActive).toBe(false)

            wrapperCarousel.vm.changeActive(1)
            expect(wrapperTestItem.vm.isActive).toBe(true)

            wrapperCarousel.vm.changeActive(2)
            expect(wrapperTestItem.vm.isActive).toBe(false)
        })
    })
})
