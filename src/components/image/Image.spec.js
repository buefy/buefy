import { shallowMount } from '@vue/test-utils'
import BImage from '@components/image/Image'

describe('BImage', () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')
    const clientWidth = 500
    beforeEach(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', { configurable: true, value: clientWidth })
    })
    afterAll(() => {
        Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidth)
    })

    it('is called', () => {
        const wrapper = shallowMount(BImage)
        expect(wrapper.name()).toBe('BImage')
        expect(wrapper.isVueInstance()).toBeTruthy()
    })

    it('render correctly', () => {
        const wrapper = shallowMount(BImage)

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('render placeholder correctly', () => {
        const baseName = 'my-image-source'
        const alt = 'Alt text'
        const placeholder = `${baseName}.png`
        const src = `${baseName}.webp`
        const wrapper = shallowMount(BImage, {
            propsData: {
                alt,
                placeholder,
                src
            }
        })

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('compute the image src as expected', () => {
        const baseName = 'my-image-source'
        const src = `${baseName}.webp`
        const wrapper = shallowMount(BImage, {
            propsData: {
                src
            }
        })
        const vm = wrapper.vm

        expect(vm.computedSrc).toBe(src)

        let webpFallback = '.jpg'
        wrapper.setProps({
            webpFallback
        })
        expect(vm.computedSrc).toBe(`${baseName}${webpFallback}`)

        webpFallback = 'a-complete-image-source.png'
        wrapper.setProps({
            webpFallback
        })
        expect(vm.computedSrc).toBe(webpFallback)
    })

    it('compute the placeholder src as expected', () => {
        const baseName = 'my-image-source'
        const placeholder = `${baseName}.webp`
        const wrapper = shallowMount(BImage, {
            propsData: {
                placeholder
            }
        })
        const vm = wrapper.vm

        expect(vm.computedPlaceholder).toBe(placeholder)

        let webpFallback = '.jpg'
        wrapper.setProps({
            webpFallback
        })
        expect(vm.computedPlaceholder).toBe(`${baseName}${webpFallback}`)
    })

    it('compute the srcset as expected', () => {
        const baseName = 'my-image-source'
        const ext = '.webp'
        const src = `${baseName}${ext}`
        let srcset = `${src} 100w, ${src} 500w`
        const wrapper = shallowMount(BImage, {
            propsData: {
                src,
                srcset
            }
        })
        const vm = wrapper.vm

        expect(vm.computedSrcset).toBe(srcset)
        expect(vm.computedSizes).toBe(`${clientWidth}px`)

        let webpFallback = '.jpg'
        srcset = `${baseName}${webpFallback} 100w, ${baseName}${webpFallback} 500w`
        wrapper.setProps({
            webpFallback
        })
        expect(vm.computedSrcset).toBe(srcset)

        srcset = `${baseName}-200${webpFallback} 200w,${baseName}-500${webpFallback} 500w`
        wrapper.setProps({
            srcset: null,
            srcsetSizes: [200, 500]
        })
        expect(vm.computedSrcset).toBe(srcset)

        srcset = `${baseName}${webpFallback}?s=200 200w,${baseName}${webpFallback}?s=500 500w`
        wrapper.setProps({
            srcsetFormatter: (src, size) => `${src}?s=${size}`
        })
        expect(vm.computedSrcset).toBe(srcset)
    })

    it('manage ratio as expected', () => {
        const src = `my-image-source.webp`
        let ratio = null
        const wrapper = shallowMount(BImage, {
            propsData: {
                src
            }
        })
        const vm = wrapper.vm

        expect(vm.imgClasses['has-ratio']).toBeFalsy()

        ratio = '16by9'
        wrapper.setProps({
            ratio
        })
        expect(vm.imgClasses['has-ratio']).toBeTruthy()
        expect(vm.figureClasses[`is-${ratio}`]).toBeTruthy()

        ratio = '16by8'
        wrapper.setProps({
            ratio
        })
        expect(vm.imgClasses['has-ratio']).toBeTruthy()
        expect(vm.figureStyles['paddingTop']).toBe(`${8 / 16 * 100}%`)
    })

    it('reset events before destroy', () => {
        window.removeEventListener = jest.fn()

        const wrapper = shallowMount(BImage)
        wrapper.destroy()

        expect(window.removeEventListener).toBeCalledWith('resize', expect.any(Function))
    })

    describe('has caption', () => {
        it('as last element', () => {
            const wrapper = shallowMount(BImage, {
                slots: {
                    caption: ['<div>This is a caption</div>']
                }
            })

            expect(wrapper.html()).toMatchSnapshot()
        })

        it('as first element', () => {
            const wrapper = shallowMount(BImage, {
                slots: {
                    caption: ['<div>This is a caption</div>']
                },
                propsData: {
                    captionFirst: true
                }
            })

            expect(wrapper.html()).toMatchSnapshot()
        })
    })
})
