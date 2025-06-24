<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import TabbedChildMixin from '../../utils/TabbedChildMixin'
import type { TabbedParent } from '../../utils/TabbedTypes'
import type { VueClassAttribute } from '../../utils/config'

export default defineComponent({
    name: 'BStepItem',
    mixins: [TabbedChildMixin<TabbedParent>('step')],
    props: {
        step: [String, Number],
        type: [String, Object] as PropType<VueClassAttribute>,
        clickable: {
            type: Boolean,
            default: undefined
        }
    },
    data() {
        return {
            elementClass: 'step-item'
        }
    }
})
</script>
