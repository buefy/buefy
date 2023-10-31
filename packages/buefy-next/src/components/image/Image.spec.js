import { shallowMount } from '@vue/test-utils'
import BImage from '@components/image/Image'

const snapshotOptions = {
    global: {
        stubs: {
            // expands transition
            transition: false
        }
    }
}

describe('BImage', () => {
    const originalClientWidth = Object.getOwnPropertyDescriptor(Element.prototype, 'clientWidth')
    const clientWidth = 500
    beforeEach(() => {
        Object.defineProperty(Element.prototype, 'clientWidth', { configurable: true, value: clientWidth })
    })
    afterAll(() => {
        Object.defineProperty(Element.prototype, 'clientWidth', originalClientWidth)
    })

    it('is called', () => {
        const wrapper = shallowMount(BImage)
        expect(wrapper.vm).toBeTruthy()
        expect(wrapper.vm.$options.name).toBe('BImage')
    })

    it('render correctly', async () => {
        const wrapper = shallowMount(BImage, snapshotOptions)

        await wrapper.vm.$nextTick() // waits for DOM updates

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('render placeholder correctly', async () => {
        const baseName = 'my-image-source'
        const alt = 'Alt text'
        const placeholder = `${baseName}.png`
        const src = `${baseName}.webp`
        const wrapper = shallowMount(BImage, {
            ...snapshotOptions,
            props: {
                alt,
                placeholder,
                src
            }
        })

        await wrapper.vm.$nextTick() // waits for DOM updates

        expect(wrapper.html()).toMatchSnapshot()
    })

    it('compute the image src as expected', async () => {
        const baseName = 'my-image-source'
        const src = `${baseName}.webp`
        const wrapper = shallowMount(BImage, {
            props: {
                src
            }
        })
        const vm = wrapper.vm

        expect(vm.computedSrc).toBe(src)

        let webpFallback = '.jpg'
        await wrapper.setProps({
            webpFallback
        })
        expect(vm.computedSrc).toBe(`${baseName}${webpFallback}`)

        webpFallback = 'a-complete-image-source.png'
        await wrapper.setProps({
            webpFallback
        })
        expect(vm.computedSrc).toBe(webpFallback)
    })

    it('compute the placeholder src as expected', async () => {
        const baseName = 'my-image-source'
        const placeholder = `${baseName}.webp`
        const wrapper = shallowMount(BImage, {
            props: {
                placeholder
            }
        })
        const vm = wrapper.vm

        expect(vm.computedPlaceholder).toBe(placeholder)

        const webpFallback = '.jpg'
        await wrapper.setProps({
            webpFallback
        })
        expect(vm.computedPlaceholder).toBe(`${baseName}${webpFallback}`)
    })

    it('compute the srcset as expected', async () => {
        const baseName = 'my-image-source'
        const ext = '.webp'
        const src = `${baseName}${ext}`
        let srcset = `${src} 100w, ${src} 500w`
        const wrapper = shallowMount(BImage, {
            props: {
                src,
                srcset
            }
        })
        const vm = wrapper.vm

        expect(vm.computedSrcset).toBe(srcset)
        expect(vm.computedSizes).toBe(`${clientWidth}px`)

        const webpFallback = '.jpg'
        srcset = `${baseName}${webpFallback} 100w, ${baseName}${webpFallback} 500w`
        await wrapper.setProps({
            webpFallback
        })
        expect(vm.computedSrcset).toBe(srcset)

        srcset = `${baseName}-200${webpFallback} 200w,${baseName}-500${webpFallback} 500w`
        await wrapper.setProps({
            srcset: null,
            srcsetSizes: [200, 500]
        })
        expect(vm.computedSrcset).toBe(srcset)

        srcset = `${baseName}${webpFallback}?s=200 200w,${baseName}${webpFallback}?s=500 500w`
        await wrapper.setProps({
            srcsetFormatter: (src, size) => `${src}?s=${size}`
        })
        expect(vm.computedSrcset).toBe(srcset)
    })

    it('manage ratio as expected', async () => {
        const src = 'my-image-source.webp'
        let ratio = null
        const wrapper = shallowMount(BImage, {
            props: {
                src
            }
        })
        const vm = wrapper.vm

        expect(vm.imgClasses['has-ratio']).toBeFalsy()

        ratio = '16by9'
        await wrapper.setProps({
            ratio
        })
        expect(vm.imgClasses['has-ratio']).toBeTruthy()
        expect(vm.figureClasses[`is-${ratio}`]).toBeTruthy()

        ratio = '16by8'
        await wrapper.setProps({
            ratio
        })
        expect(vm.imgClasses['has-ratio']).toBeTruthy()
        expect(vm.figureStyles.paddingTop).toBe(`${8 / 16 * 100}%`)
    })

    it('adds custom class to image as expected', () => {
        const src = 'my-image-source.webp'
        const customClass = 'my-custom-class'
        const wrapper = shallowMount(BImage, {
            props: {
                src,
                customClass
            }
        })
        const vm = wrapper.vm

        expect(vm.imgClasses['my-custom-class']).toBeTruthy()
    })

    it('reset events before destroy', () => {
        window.removeEventListener = jest.fn()

        const wrapper = shallowMount(BImage)
        wrapper.unmount()

        expect(window.removeEventListener).toBeCalledWith('resize', expect.any(Function))
    })

    describe('has caption', () => {
        it('as last element', async () => {
            const wrapper = shallowMount(BImage, {
                ...snapshotOptions,
                slots: {
                    caption: ['<div>This is a caption</div>']
                }
            })

            await wrapper.vm.$nextTick() // waits for DOM updates

            expect(wrapper.html()).toMatchSnapshot()
        })

        it('as first element', async () => {
            const wrapper = shallowMount(BImage, {
                ...snapshotOptions,
                slots: {
                    caption: ['<div>This is a caption</div>']
                },
                props: {
                    captionFirst: true
                }
            })

            await wrapper.vm.$nextTick() // waits for DOM updates

            expect(wrapper.html()).toMatchSnapshot()
        })
    })
})
