<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExSlot" :code="ExSlotCode" title="Custom pagination buttons">
            <p>You can customize the buttons using <b><code>b-pagination-button</code></b> as scoped slot.</p>
            <p>For example, you can customize the inner text or use <code>router-link</code> as tag.</p>
        </Example>

        <ApiView :data="api"/>
    </div>
</template>

<script>
    import api from './api/pagination'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExSlot from './examples/ExSlot'
    import ExSlotCode from '!!raw-loader!./examples/ExSlot'

    export default {
        data() {
            return {
                api,
                ExSimple,
                ExSimpleCode,
                ExSlot,
                ExSlotCode
            }
        }
    }
</script>
