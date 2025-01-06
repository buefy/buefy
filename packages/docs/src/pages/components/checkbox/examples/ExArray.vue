<template>
    <section>
        <div class="block">
            <b-checkbox v-model="checkboxGroup"
                native-value="Silver">
                Silver
            </b-checkbox>
            <b-checkbox v-model="checkboxGroup"
                native-value="Flint">
                Flint
            </b-checkbox>
            <b-checkbox v-model="checkboxGroup"
                native-value="Vane">
                Vane
            </b-checkbox>
            <b-checkbox v-model="checkboxGroup"
                native-value="Billy" disabled>
                Billy
            </b-checkbox>
        </div>
        <p class="content">
            <b>Selection:</b>
            {{ checkboxGroup }}
        </p>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BCheckbox } from '@ntohq/buefy-next'

    export default defineComponent({
        components: { BCheckbox },
        data() {
            return {
                checkboxGroup: ['Flint']
            }
        }
    })
</script>
