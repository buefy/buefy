import { h as createElement, onUpdated } from 'vue'
import {
    camelize,
    hyphenate,
    toHandlerKey
} from '@vue/shared' // eslint-disable-line vue/prefer-import-from-vue
import { isVueComponent } from './helpers'

export default {
    name: 'BSlotComponent',
    props: {
        component: {
            type: Object,
            required: true
        },
        name: {
            type: String,
            default: 'default'
        },
        scoped: {
            type: Boolean
        },
        props: {
            type: Object
        },
        tag: {
            type: String,
            default: 'div'
        },
        event: {
            type: String,
            default: 'vue:updated'
        }
    },
    data: () => ({
        updatedHook: undefined,
        handlerKey: undefined
    }),
    methods: {
        refresh() {
            this.$forceUpdate()
        }
    },
    created() {
        if (isVueComponent(this.component)) {
            if (this.event === 'vue:updated') {
                // lifecycle event cannot be captured as an ordinary event
                this.updatedHook = onUpdated(this.refresh, this.component.$)
            } else {
                // directly manipuates the VNode
                // because Vue 3 no longer provides $on
                const { vnode } = this.component.$
                let handlerKey = toHandlerKey(this.event)
                if (vnode.props == null) {
                    vnode.props = { [handlerKey]: this.refresh }
                } else {
                    const { props } = vnode
                    if (props[this.handlerKey] == null) {
                        // tries camelCase
                        handlerKey = toHandlerKey(camelize(this.event))
                        if (props[handlerKey] == null) {
                            // tries kebab-case
                            handlerKey = toHandlerKey(hyphenate(this.event))
                        }
                    }
                    if (props[handlerKey] == null) {
                        handlerKey = toHandlerKey(this.event)
                        props[handlerKey] = this.refresh
                    } else {
                        // multiple handlers may be specified in an array
                        if (Array.isArray(props[handlerKey])) {
                            props[handlerKey].push(this.refresh)
                        } else {
                            props[handlerKey] = [props[handlerKey], this.refresh]
                        }
                    }
                }
                this.handlerKey = handlerKey
            }
        }
    },
    beforeUnmount() {
        if (isVueComponent(this.component)) {
            if (this.updatedHook != null) {
                // unfortunately, there is no counterpart of `onUpdated`.
                // so directly manipulates the internal instance.
                // see https://github.com/vuejs/core/blob/2ffe3d5b3e953b63d4743b1e2bc242d50916b545/packages/runtime-core/src/apiLifecycle.ts#L17-L64
                const index = this.component.$.u.indexOf(this.updatedHook)
                if (index !== -1) {
                    this.component.$.u.splice(index, 1)
                }
            } else if (this.handlerKey != null) {
                // directly maniputates VNode
                // because Vue 3 no longer provides $off
                const { props } = this.component.$.vnode
                if (props != null) {
                    if (Array.isArray(props[this.handlerKey])) {
                        const index = props[this.handlerKey].indexOf(this.refresh)
                        if (index > -1) {
                            props[this.handlerKey].splice(index, 1)
                            if (props[this.handlerKey].length === 1) {
                                props[this.handlerKey] = props[this.handlerKey][0]
                            }
                        }
                    } else {
                        delete props[this.handlerKey]
                    }
                }
            }
        }
    },
    render() {
        return createElement(this.tag, {},
            this.component.$slots
                ? this.scoped
                    ? this.component.$slots[this.name](this.props)
                    : this.component.$slots[this.name]()
                : undefined)
    }
}
