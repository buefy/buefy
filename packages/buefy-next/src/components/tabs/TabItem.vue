<script lang="ts">
import { defineComponent } from 'vue'
import TabbedChildMixin from '../../utils/TabbedChildMixin'
import type { TabbedParent } from '../../utils/TabbedTypes'

export default defineComponent({
    name: 'BTabItem',
    mixins: [TabbedChildMixin<TabbedParent>('tab')],
    props: {
        disabled: Boolean
    },
    data() {
        return {
            elementClass: 'tab-item',
            elementRole: 'tabpanel'
        }
    }
})
</script>
