<template>
    <figure
        class="b-image-wrapper"
        :class="figureClasses"
        :style="figureStyles"
    >
        <figcaption v-if="isCaptionFirst">
            <slot name="caption" />
        </figcaption>
        <transition name="fade">
            <img
                v-if="isDisplayed"
                :srcset="computedSrcset"
                :src="computedSrc"
                :alt="alt"
                :class="imgClasses"
                :width="computedWidth"
                :sizes="computedSizes"
                :loading="computedNativeLazy"
                @load="onLoad"
                @error="onError"
            >
        </transition>
        <transition name="fade">
            <slot
                v-if="isPlaceholderDisplayed"
                name="placeholder"
            >
                <img
                    :src="computedPlaceholder"
                    :alt="alt"
                    :class="imgClasses"
                    class="placeholder"
                >
            </slot>
        </transition>
        <figcaption v-if="isCaptionLast">
            <slot name="caption" />
        </figcaption>
    </figure>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import config from '../../utils/config'
import { isWebpSupported } from '../../utils/helpers'

// TODO: move to config
// - BULMA_KNOWN_RATIO
// - BulmaKnownRatio
// - isBulmaKnownRatio
const BULMA_KNOWN_RATIO = [
    'square',
    '1by1',
    '5by4',
    '4by3',
    '3by2',
    '5by3',
    '16by9',
    'b2y1',
    '3by1',
    '4by5',
    '3by4',
    '2by3',
    '3by5',
    '9by16',
    '1by2',
    '1by3'
] as const

type BulmaKnownRatio = typeof BULMA_KNOWN_RATIO[number]

function isBulmaKnownRatio(value: unknown): value is BulmaKnownRatio {
    return BULMA_KNOWN_RATIO.indexOf(value as BulmaKnownRatio) !== -1
}

/** Type of the `srcsetFormatter` prop. */
export type SrcsetFormatter = (
    src: string,
    size: number,
    vm: { formatSrcset: (src: string, size: number) => string }
) => string

export default defineComponent({
    name: 'BImage',
    props: {
        src: String,
        alt: String,
        srcFallback: String,
        webpFallback: {
            type: String,
            default: () => {
                return config.defaultImageWebpFallback
            }
        },
        lazy: {
            type: Boolean,
            default: () => {
                return config.defaultImageLazy
            }
        },
        responsive: {
            type: Boolean,
            default: () => {
                return config.defaultImageResponsive
            }
        },
        ratio: {
            type: String,
            default: () => {
                return config.defaultImageRatio
            }
        },
        placeholder: String,
        srcset: String,
        srcsetSizes: Array as PropType<number[]>,
        srcsetFormatter: {
            type: Function as PropType<SrcsetFormatter>,
            default: ((src, size, vm) => {
                if (typeof config.defaultImageSrcsetFormatter === 'function') {
                    return config.defaultImageSrcsetFormatter(src, size)
                } else {
                    return vm.formatSrcset(src, size)
                }
            }) as SrcsetFormatter
        },
        rounded: {
            type: Boolean,
            default: false
        },
        captionFirst: {
            type: Boolean,
            default: false
        },
        customClass: String
    },
    emits: {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        load: (event: Event, src?: string) => true,
        error: (event: Event, src?: string) => true
        /* eslint-enable @typescript-eslint/no-unused-vars */
    },
    data() {
        return {
            clientWidth: 0,
            webpSupportVerified: false,
            webpSupported: false,
            useNativeLazy: false,
            observer: null as (IntersectionObserver | null),
            inViewPort: false,
            loaded: false,
            failed: false
        }
    },
    computed: {
        ratioPattern() {
            return /([0-9]+)by([0-9]+)/
        },
        hasRatio() {
            return this.ratio != null && this.ratioPattern.test(this.ratio)
        },
        figureClasses() {
            const classes: Record<string, boolean> = { image: this.responsive }
            if (this.hasRatio && isBulmaKnownRatio(this.ratio)) {
                classes[`is-${this.ratio}`] = true
            }
            return classes
        },
        figureStyles() {
            if (this.hasRatio && !isBulmaKnownRatio(this.ratio)) {
                const ratioValues = this.ratioPattern.exec(this.ratio)!
                return {
                    paddingTop: `${(+ratioValues[2] / +ratioValues[1]) * 100}%`
                }
            }
            return undefined
        },
        imgClasses(): Record<string, boolean> {
            return {
                'is-rounded': this.rounded,
                'has-ratio': this.hasRatio,
                ...(
                    this.customClass ? { [this.customClass]: !!this.customClass } : {}
                )
            }
        },
        srcExt() {
            return this.getExt(this.src)
        },
        isWepb() {
            return this.srcExt === 'webp'
        },
        computedSrc() {
            let src = this.src
            if (this.failed && this.srcFallback) {
                src = this.srcFallback
            }
            if (!this.webpSupported && this.isWepb && this.webpFallback) {
                if (this.webpFallback.startsWith('.')) {
                    return src!.replace(/\.webp/gi, `${this.webpFallback}`)
                }
                return this.webpFallback
            }
            return src
        },
        computedWidth() {
            if (this.responsive && this.clientWidth > 0) {
                return this.clientWidth
            }
            return undefined
        },
        computedNativeLazy() {
            if (this.lazy && this.useNativeLazy) {
                return 'lazy'
            }
            return undefined
        },
        isDisplayed() {
            return (
                (this.webpSupportVerified || !this.isWepb) &&
                (!this.lazy || this.useNativeLazy || this.inViewPort)
            )
        },
        placeholderExt() {
            if (this.placeholder) {
                return this.getExt(this.placeholder)
            }
            return undefined
        },
        isPlaceholderWepb() {
            if (this.placeholder) {
                return this.placeholderExt === 'webp'
            }
            return false
        },
        computedPlaceholder() {
            if (!this.webpSupported && this.isPlaceholderWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
                return this.placeholder!.replace(/\.webp/gi, `${this.webpFallback}`)
            }
            return this.placeholder
        },
        isPlaceholderDisplayed() {
            return (
                !this.loaded &&
                (
                    this.$slots.placeholder || (
                        this.placeholder &&
                        (this.webpSupportVerified || !this.isPlaceholderWepb)
                    )
                )
            )
        },
        computedSrcset() {
            if (this.srcset) {
                if (!this.webpSupported && this.isWepb && this.webpFallback && this.webpFallback.startsWith('.')) {
                    return this.srcset.replace(/\.webp/gi, `${this.webpFallback}`)
                }
                return this.srcset
            }
            if (
                this.srcsetSizes && Array.isArray(this.srcsetSizes) && this.srcsetSizes.length > 0
            ) {
                return this.srcsetSizes.map((size) => {
                    return `${this.srcsetFormatter(this.computedSrc!, size, this)} ${size}w`
                }).join(',')
            }
            return undefined
        },
        computedSizes() {
            if (this.computedSrcset && this.computedWidth) {
                return `${this.computedWidth}px`
            }
            return undefined
        },
        isCaptionFirst() {
            return this.$slots.caption && this.captionFirst
        },
        isCaptionLast() {
            return this.$slots.caption && !this.captionFirst
        }
    },
    methods: {
        getExt(filename?: string, clean = true) {
            if (filename) {
                const noParam = clean ? filename.split('?')[0] : filename
                return noParam.split('.').pop()
            }
            return ''
        },
        setWidth() {
            this.clientWidth = this.$el.clientWidth
        },
        formatSrcset(src: string, size: number) {
            const ext = this.getExt(src, false)
            const name = src.split('.').slice(0, -1).join('.')
            return `${name}-${size}.${ext}`
        },
        onLoad(event: Event) {
            this.loaded = true
            this.emitSrc(event, (src) => this.$emit('load', event, src))
        },
        onError(event: Event) {
            this.emitSrc(event, (src) => this.$emit('error', event, src))
            if (!this.failed) {
                this.failed = true
            }
        },
        emitSrc(event: Event, emit: (src?: string) => void) {
            const target = event.target! as HTMLImageElement
            emit(target.currentSrc || target.src || this.computedSrc)
        }
    },
    created() {
        if (this.isWepb) {
            isWebpSupported().then((supported) => {
                this.webpSupportVerified = true
                this.webpSupported = supported
            })
        }
        if (this.lazy) {
            // We use native lazy loading if supported
            // We try to use Intersection Observer if native lazy loading is not supported
            // We use the lazy attribute anyway if we cannot detect support (SSR for example).
            const nativeLazySupported = typeof window !== 'undefined' && 'HTMLImageElement' in window && 'loading' in HTMLImageElement.prototype
            const intersectionObserverSupported = typeof window !== 'undefined' && 'IntersectionObserver' in window
            if (!nativeLazySupported && intersectionObserverSupported) {
                this.observer = new IntersectionObserver((events) => {
                    const { target, isIntersecting } = events[0]
                    if (isIntersecting && !this.inViewPort) {
                        this.inViewPort = true
                        this.observer!.unobserve(target)
                    }
                })
            } else {
                this.useNativeLazy = true
            }
        }
    },
    mounted() {
        if (this.lazy && this.observer) {
            this.observer.observe(this.$el)
        }
        this.setWidth()
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.setWidth)
        }
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect()
        }
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.setWidth)
        }
    }
})
</script>
