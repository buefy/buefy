<script lang="ts">
import {
    Comment,
    Fragment,
    Text,
    defineComponent,
    h as createElement,
    resolveComponent
} from 'vue'
import type { ComponentPublicInstance, VNode } from 'vue'

export default defineComponent({
    name: 'BFieldBody',
    inject: {
        parent: {
            from: 'BField',
            default: null
        }
    },
    props: {
        message: {
            type: [String, Array]
        },
        type: {
            type: [String, Object]
        }
    },
    render() {
        let first = true
        // wraps the default slot (children) with `b-field`.
        // children may be given in a fragment and should be extracted.
        let children = typeof this.$slots.default === 'function'
            ? this.$slots.default()
            : this.$slots.default
        if (children != null && children.length === 1 && children[0].type === Fragment) {
            // is assuming VNode[] safe?
            children = children[0].children as VNode[]
        }
        return createElement(
            'div',
            { class: 'field-body' },
            {
                default: () => {
                    return children != null && children.map((element) => {
                        // skip returns(?) and comments
                        if (element.type === Comment || element.type === Text) {
                            return element
                        }
                        let message
                        if (first) {
                            message = this.message
                            first = false
                        }
                        // Options API does not seem to provide a way to type injected values
                        const parentField = this.parent as (ComponentPublicInstance | null)
                        return createElement(
                            // parentField.$.type is supposed to be BField
                            // it falls back to `resolveComponent('b-field')`
                            // but won't work unless `BField` is globally registered
                            // should not be a problem as long as `BFieldBody` is properly used
                            parentField ? parentField.$.type : resolveComponent('b-field'),
                            {
                                type: this.type,
                                message
                            },
                            () => element
                        )
                    })
                }
            }
        )
    }
})
</script>
