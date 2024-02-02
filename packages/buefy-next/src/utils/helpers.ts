import { Comment, Fragment, Static, Text } from 'vue'
import type { App, ComponentPublicInstance, VNode } from 'vue'

// augments Vue App to deal with plugins
declare module '@vue/runtime-core' {
    interface App {
        // introduced by vue-i18n
        __VUE_I18N_SYMBOL__?: symbol
    }
}

// Type utility that extracts props type from a component constructor.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractComponentProps<T> = T extends { new (...args: any[]): infer U }
    // I thought `U extends ComponentPublicInstance<infer P>` would work,
    // but it didn't
    ? U extends { $props: infer P }
        // makes fields of `$props` mutable and optional
        ? { -readonly [Key in keyof P]?: P[Key] }
        : Record<string, never>
    : Record<string, never>

// Type utility that extracts data type from a component constructor.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ExtractComponentData<T> = T extends { new (...args: any[]): infer U }
    // I thought `U extends ComponentPublicInstance<infer D>` would work,
    // but it didn't
    ? U extends { $data: infer D }
        // makes fields of `$data` optional
        ? { [Key in keyof D]?: D[Key] }
        : Record<string, never>
    : Record<string, never>

/**
 * +/- function to native math sign
 *
 * @internal
 */
function signPoly(value: number): number {
    if (value < 0) return -1
    return value > 0 ? 1 : 0
}
export const sign = Math.sign || signPoly

/**
 * Checks if the flag is set
 * @param val
 * @param flag
 * @returns {boolean}
 *
 * @internal
 */
export function hasFlag(val: number, flag: number): boolean {
    return (val & flag) === flag
}

/**
 * Native modulo bug with negative numbers
 * @param n
 * @param mod
 * @returns {number}
 *
 * @internal
 */
export function mod(n: number, mod: number): number {
    return ((n % mod) + mod) % mod
}

/**
 * Asserts a value is beetween min and max
 * @param val
 * @param min
 * @param max
 * @returns {number}
 *
 * @internal
 */
export function bound(val: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, val))
}

/**
 * Get value of an object property/path even if it's nested
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getValueByPath(obj: any, path: string): any {
    return path.split('.').reduce((o, i) => o ? o[i] : null, obj)
}

/**
 * Extension of indexOf method by equality function if specified
 *
 * @internal
 */
export function indexOf<T>(
    array: T[] | null | undefined,
    obj: T,
    fn?: (a: T, b: T) => boolean
): number {
    if (!array) return -1

    if (!fn || typeof fn !== 'function') return array.indexOf(obj)

    for (let i = 0; i < array.length; i++) {
        if (fn(array[i], obj)) {
            return i
        }
    }

    return -1
}

// Deep partial type.
//
// There are some edge cases where this type is not sufficient in general,
// but it works for this library.
// https://stackoverflow.com/questions/61132262/typescript-deep-partial
type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }

/**
 * Merge function to replace Object.assign with deep merging possibility
 *
 * @internal
 */
const isObject = (item: unknown) => typeof item === 'object' && !Array.isArray(item)
const mergeFn = <T>(
    target: { [K in keyof T]: T[K] },
    source: DeepPartial<T>,
    deep = false
): { [K in keyof T]: T[K] } => {
    if (deep || !Object.assign) {
        const isDeep = (prop: keyof T) =>
            isObject(source[prop]) &&
            target !== null &&
            Object.prototype.hasOwnProperty.call(target, prop) &&
            isObject(target[prop])
        const replaced = (Object.getOwnPropertyNames(source) as (keyof T)[])
            .map((prop) => ({
                [prop]: isDeep(prop)
                    ? mergeFn<T[keyof T]>(target[prop], source[prop] || {}, deep)
                    : source[prop]
            }))
            .reduce(
                (a, b) => ({ ...a, ...b }),
                // eslint-disable-next-line no-use-before-define
                {}
            )

        return {
            ...target,
            ...replaced
        }
    } else {
        return Object.assign(target, source)
    }
}
export const merge = mergeFn

/**
 * Mobile detection
 * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
 *
 * @internal
 */
export const isMobile = {
    Android: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Android/i)
        )
    },
    BlackBerry: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/BlackBerry/i)
        )
    },
    iOS: function () {
        return (
            typeof window !== 'undefined' &&
            (window.navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
                (window.navigator.platform === 'MacIntel' &&
                    window.navigator.maxTouchPoints > 1))
        )
    },
    Opera: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/Opera Mini/i)
        )
    },
    Windows: function () {
        return (
            typeof window !== 'undefined' &&
            window.navigator.userAgent.match(/IEMobile/i)
        )
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        )
    }
} as const

export function removeElement(el: Element) {
    if (typeof el.remove !== 'undefined') {
        el.remove()
    } else if (typeof el.parentNode !== 'undefined' && el.parentNode !== null) {
        el.parentNode.removeChild(el)
    }
}

export function createAbsoluteElement(el: Element): HTMLElement {
    const root = document.createElement('div')
    root.style.position = 'absolute'
    root.style.left = '0px'
    root.style.top = '0px'
    root.style.width = '100%'
    const wrapper = document.createElement('div')
    root.appendChild(wrapper)
    wrapper.appendChild(el)
    document.body.appendChild(root)
    return root
}

export function isVueComponent(c: unknown): c is ComponentPublicInstance {
    return c != null &&
        (c as ComponentPublicInstance).$ != null &&
        (c as ComponentPublicInstance).$.vnode != null
}

/**
 * Escape regex characters
 * http://stackoverflow.com/a/6969486
 *
 * @internal
 */
export function escapeRegExpChars(value: string | null | undefined): string | null | undefined {
    if (!value) return value

    // eslint-disable-next-line
    return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
}
/**
 * Remove accents/diacritics in a string in JavaScript
 * https://stackoverflow.com/a/37511463
 *
 * @internal
 */
export function removeDiacriticsFromString(value: string): string {
    if (!value) return value

    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export interface MultiColumnSortPriority<T> {
    field?: string
    order: 'asc' | 'desc'
    customSort?: (a: Record<string, T>, b: Record<string, T>, isAscending: boolean) => number
}

export function multiColumnSort<T>(
    inputArray: Record<string, T>[],
    sortingPriority: MultiColumnSortPriority<T>[]
): Record<string, T>[] {
    // NOTE: this function is intended to be used by BTable
    // clone it to prevent the any watchers from triggering every sorting iteration
    const array: Record<string, T>[] = JSON.parse(JSON.stringify(inputArray))
    const fieldSorter = (fields: MultiColumnSortPriority<T>[]) => (
        a: Record<string, T>,
        b: Record<string, T>
    ) => fields.map((o) => {
        const { field, order, customSort } = o
        if (typeof customSort === 'function') {
            return customSort(a, b, order !== 'desc')
        } else {
            const aValue = getValueByPath(a, field!)
            const bValue = getValueByPath(b, field!)
            const ord = aValue > bValue ? 1 : aValue < bValue ? -1 : 0
            return order === 'desc' ? -ord : ord
        }
    }).reduce((p, n) => p || n, 0)

    return array.sort(fieldSorter(sortingPriority))
}

export function createNewEvent(eventName: string): Event {
    let event
    if (typeof Event === 'function') {
        event = new Event(eventName)
    } else {
        event = document.createEvent('Event')
        event.initEvent(eventName, true, true)
    }
    return event
}

export function toCssWidth(width: number | string | undefined): string | null {
    return width === undefined ? null : (isNaN(+width) ? `${width}` : width + 'px')
}

/**
 * Return month names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. March), short (ex. Mar) or narrow (M)
 * @return {Array<String>} An array of month names
 *
 * @internal
 */
export function getMonthNames(locale?: string | string[], format: Intl.DateTimeFormatOptions['month'] = 'long'): string[] {
    const dates = []
    for (let i = 0; i < 12; i++) {
        dates.push(new Date(2000, i, 15))
    }
    const dtf = new Intl.DateTimeFormat(locale, {
        month: format
    })
    return dates.map((d) => dtf.format(d))
}

/**
 * Return weekday names according to a specified locale
 * @param  {String} locale A bcp47 localerouter. undefined will use the user browser locale
 * @param  {String} format long (ex. Thursday), short (ex. Thu) or narrow (T)
 * @return {Array<String>} An array of weekday names
 *
 * @internal
 */
export function getWeekdayNames(locale?: string | string[], format: Intl.DateTimeFormatOptions['weekday'] = 'narrow'): string[] {
    const dates = []
    for (let i = 0; i < 7; i++) {
        const dt = new Date(2000, 0, i + 1)
        dates[dt.getDay()] = dt
    }
    const dtf = new Intl.DateTimeFormat(locale, { weekday: format })
    return dates.map((d) => dtf.format(d))
}

/**
 * Accept a regex with group names and return an object
 * ex. matchWithGroups(/((?!=<year>)\d+)\/((?!=<month>)\d+)\/((?!=<day>)\d+)/, '2000/12/25')
 * will return { year: 2000, month: 12, day: 25 }
 * @param  {String} includes injections of (?!={groupname}) for each group
 * @param  {String} the string to run regex
 * @return {Object} an object with a property for each group having the group's match as the value
 * @throws {RangeError} if `pattern` does not contain any group.
 *
 * @internal
 */
export function matchWithGroups(pattern: string, str: string): Record<string, string | null> {
    const matches = str.match(pattern)
    const groupNames = pattern.toString().match(/<(.+?)>/g)
    if (groupNames == null) {
        throw new RangeError('pattern must contain at least one group')
    }
    return groupNames
        // remove the braces
        .map((group) => {
            const groupMatches = group.match(/<(.+)>/)
            // @ts-expect-error - groupMatches should never be null
            return groupMatches[1]
        })
        // create an object with a property for each group having the group's match as the value
        .reduce((acc, curr, index) => {
            if (matches && matches.length > index) {
                acc[curr] = matches[index + 1]
            } else {
                acc[curr] = null
            }
            return acc
        }, {} as Record<string, string | null>)
}

/**
 * Based on
 * https://github.com/fregante/supports-webp
 *
 * @internal
 */
export function isWebpSupported(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const image = new Image()
        image.onerror = () => resolve(false)
        image.onload = () => resolve(image.width === 1)
        image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
    }).catch(() => false)
}

// only `$root` of a component instance is our concern.
// we may face type errors if we use `ComponentPublicInstance` directly.
export function isCustomElement(vm: Pick<ComponentPublicInstance, '$root'>) {
    return vm.$root != null && 'shadowRoot' in vm.$root.$options
}

export const isDefined = <T>(d: T | undefined): d is T => d !== undefined

/**
 * Checks if a value is null or undefined.
 * Based on
 * https://github.com/lodash/lodash/blob/master/isNil.js
 *
 * @internal
 */
export const isNil = (value: unknown) => value === null || value === undefined

export function isFragment(vnode: VNode): boolean {
    return vnode.type === Fragment
}

// TODO: replacement of vnode.tag test
export function isTag(vnode: VNode): boolean {
    return vnode.type !== Comment &&
        vnode.type !== Text &&
        vnode.type !== Static
}

// references
// - https://github.com/vuejs/core/blob/1c525f75a3d17a6356d5f66765623c0ae7c0ebcc/packages/runtime-core/src/apiCreateApp.ts#L361
// - https://github.com/vuejs/core/blob/1c525f75a3d17a6356d5f66765623c0ae7c0ebcc/packages/runtime-core/src/component.ts#L1036-L1054
//
// we cannot access getExposeProxy since it is not exported from `vue`, though,
// its purpose seems to be one-time initialization of component.exposeProxy,
// which should have been done by this function call
export function getComponentFromVNode(
    vnode: VNode
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): ComponentPublicInstance | Record<string, any> | null | undefined {
    if (!vnode) {
        return undefined
    }
    const { component } = vnode
    if (!component) {
        return undefined
    }
    return (component.exposed && component.exposeProxy) || component.proxy
}

// Copies the context from a given app to another app.
//
// This function is necessary to programmatically mount a component; e.g.,
// Modal.
// Since Vue 3's app can mount only one component, we have to create a new app
// to mount another new component.
// If we create a new app with `createApp` API, no context (e.g., installed
// components, directives) is available on the new app.
// This function can copy the context from the host app to the new app.
//
// Depends on what Vue internally does: https://github.com/vuejs/core/blob/b775b71c788499ec7ee58bc2cf4cd04ed388e072/packages/runtime-core/src/apiCreateApp.ts#L170-L190
//
// This function also should take care of compatiblity with other plugins.
// We need a generic solution, though, it fixes compatiblity issues of
// individual plugins for now.
export function copyAppContext(src: App, dest: App) {
    // replacing _context won't work because methods of app bypasses app._context
    const { _context: srcContext } = src
    const { _context: destContext } = dest
    destContext.config = srcContext.config
    destContext.mixins = srcContext.mixins
    destContext.components = srcContext.components
    destContext.directives = srcContext.directives
    destContext.provides = srcContext.provides
    // @ts-expect-error - optionsCache is internal field
    destContext.optionsCache = srcContext.optionsCache
    // @ts-expect-error - propsCache is internal field
    destContext.propsCache = srcContext.propsCache
    // @ts-expect-error - emitsCache is internal field
    destContext.emitsCache = srcContext.emitsCache
    // vue-i18n support: https://github.com/ntohq/buefy-next/issues/153
    if ('__VUE_I18N_SYMBOL__' in src) {
        dest.__VUE_I18N_SYMBOL__ = src.__VUE_I18N_SYMBOL__
    }
}

/** Options for `translateTouchAsDragEvent`. */
export interface TranslateTouchAsDragEventOptions {
    type: 'dragstart' | 'dragend' | 'drop' | 'dragover' | 'dragleave'
    target?: Element
}

/**
 * Translates a touch event as a drag event.
 *
 * `event` must be a touch event.
 *
 * `options` must be an object with the following properties:
 * - `type`: new event type (required). must be one of the following:
 *     - `"dragstart"`
 *     - `"dragend"`
 *     - `"drop"`
 *     - `"dragover"`
 *     - `"dragleave"`
 * - `target`: new target element (optional). `clientX` and `clientY` will be
 *   translated if `target` is different from `event.target`.
 *
 * This function only works with single-touch events for now.
 */
export const translateTouchAsDragEvent = (
    event: TouchEvent,
    options: TranslateTouchAsDragEventOptions
) => {
    const { type, target } = options
    let translateX = 0
    let translateY = 0
    if (target != null && target !== event.target) {
        const baseRect = (event.target! as HTMLElement).getBoundingClientRect()
        const targetRect = target.getBoundingClientRect()
        translateX = targetRect.left - baseRect.left
        translateY = targetRect.top - baseRect.top
    }
    const touch = event.touches[0] || event.changedTouches[0]
    return new DragEvent(type, {
        dataTransfer: new DataTransfer(),
        bubbles: true,
        screenX: touch.screenX,
        screenY: touch.screenY,
        clientX: touch.clientX + translateX,
        clientY: touch.clientY + translateY,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey
    })
}
