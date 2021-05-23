<script>
import { Comment, Fragment, h as createElement, resolveComponent } from 'vue'

export default {
    name: 'BFieldBody',
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
        let children = this.$slots.default()
        if (children.length === 1 && children[0].type === Fragment) {
            children = children[0].children
        }
        return createElement(
            'div',
            { class: 'field-body' },
            {
                default: () => {
                    return children.map((element) => {
                        // skip returns(?) and comments
                        if (element.type === Comment) {
                            return element
                        }
                        let message
                        if (first) {
                            message = this.message
                            first = false
                        }
                        return createElement(
                            resolveComponent('b-field'),
                            {
                                type: this.type,
                                message
                            },
                            [element]
                        )
                    })
                }
            }
        )
    }
}
</script>
