import { shallowMount } from '@vue/test-utils'
import BCarouselList from '@components/carousel/CarouselList'

let wrapper
const data = [
    {
        title: 'Slide 1',
        image: 'https://picsum.photos/id/0/1230/500'
    },
    {
        title: 'Slide 2',
        image: 'https://picsum.photos/id/1/1230/500'
    },
    {
        title: 'Slide 3',
        image: 'https://picsum.photos/id/2/1230/500'
    },
    {
        title: 'Slide 4',
        image: 'https://picsum.photos/id/3/1230/500'
    },
    {
        title: 'Slide 5',
        image: 'https://picsum.photos/id/4/1230/500'
    },
    {
        title: 'Slide 6',
        image: 'https://picsum.photos/id/5/1230/500'
    },
    {
        title: 'Slide 7',
        image: 'https://picsum.photos/id/6/1230/500'
    },
    {
        title: 'Slide 8',
        image: 'https://picsum.photos/id/7/1230/500'
    }
]

describe('BCarouselList', () => {
    beforeEach(() => {
        wrapper = shallowMount(BCarouselList, {
            props: {
                data
            }
        })
    })

    it('is called', () => {
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BCarouselList')
    })

    it('render correctly', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('uses breakpoints', async () => {
        await wrapper.setProps({
            itemsToShow: 4,
            itemsToList: 1,
            breakpoints: {
                768: {
                    hasGrayscale: false,
                    itemsToShow: 6,
                    itemsToList: 2
                },
                960: {
                    hasGrayscale: true,
                    itemsToShow: 8
                }
            }
        })

        expect(wrapper.vm.settings.itemsToShow).toBe(8)

        global.innerWidth = 960
        global.dispatchEvent(new Event('resize'))
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.settings.itemsToShow).toBe(8)

        global.innerWidth = 959
        global.dispatchEvent(new Event('resize'))
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.settings.itemsToShow).toBe(6)

        global.innerWidth = 767
        global.dispatchEvent(new Event('resize'))
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.settings.itemsToShow).toBe(4)
        expect(wrapper.vm.settings.itemsToList).toBe(1)
    })

    it('doesn\'t show empty slots', async () => {
        await wrapper.setProps({
            itemsToShow: 4,
            modelValue: 8
        })

        expect(wrapper.vm.scrollIndex).toBe(4)
        expect(wrapper.vm.hasNext).toBe(false)
    })

    it('repeats', async () => {
        await wrapper.setProps({
            itemsToShow: 4,
            itemsToList: 1,
            repeat: true,
            modelvalue: 0
        })

        expect(wrapper.vm.scrollIndex).toBe(0)
        wrapper.vm.next()
        wrapper.vm.next()
        wrapper.vm.next()
        wrapper.vm.next()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.scrollIndex).toBe(4)

        wrapper.vm.next()
        expect(wrapper.vm.scrollIndex).toBe(0)

        wrapper.vm.prev()
        expect(wrapper.vm.scrollIndex).toBe(4)
    })

    it('removes events listener when removed', () => {
        const map = {}
        window.removeEventListener = jest.fn((event, cb) => {
            map[event] = cb
        })
        wrapper.find('.carousel-list').trigger('mousedown')
        wrapper.unmount()

        expect(map.resize).toBe(wrapper.vm.resized)
        expect(map.mousemove).toBe(wrapper.vm.dragMove)
        expect(map.mouseup).toBe(wrapper.vm.dragEnd)
    })

    it('drags correctly', async () => {
        wrapper.vm.$el.getBoundingClientRect = jest.fn(() => ({
            width: 400
        }))
        await wrapper.setData({ windowWidth: 400 })
        await wrapper.setProps({
            itemsToShow: 4
        })
        await wrapper.setData({ delta: 0 })
        expect(wrapper.vm.itemWidth).toBe(100)

        await wrapper.vm.$nextTick()
        expect(wrapper.vm.translation).toBe(-0)

        await wrapper.setData({ delta: -600 })
        expect(wrapper.vm.translation).toBe(-0)

        await wrapper.setData({ delta: 2000 })
        expect(wrapper.vm.translation).toBe(-400)

        await wrapper.setProps({
            modelValue: 4
        })
        expect(wrapper.vm.translation).toBe(-400)
        await wrapper.setData({ delta: -300 })
        expect(wrapper.vm.translation).toBe(-100)
    })
})
