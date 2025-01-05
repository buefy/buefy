<template>
    <section>
        <b-checkbox v-model="isGreen">Green color</b-checkbox>

        <div class="block">
            <b-icon :type="{ 'is-success': isGreen }" icon="account"></b-icon>
            <b-icon :type="{ 'is-success': isGreen }" icon="home"></b-icon>
            <b-icon :type="{ 'is-success': isGreen }" icon="view-dashboard"></b-icon>
        </div>
    </section>
</template>

<script>
    import { defineComponent } from 'vue'
    import { BCheckbox, BIcon } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BCheckbox,
            BIcon,
        },
        data() {
            return {
                isGreen: true
            }
        }
    })
</script>
