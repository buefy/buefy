<template>
    <section>
        <div class="block">
            <b-radio v-model="radio"
                name="name"
                native-value="Flint">
                Flint
            </b-radio>
            <b-radio v-model="radio"
                name="name"
                native-value="Silver">
                Silver
            </b-radio>
            <b-radio v-model="radio"
                name="name"
                native-value="Jack">
                Jack
            </b-radio>
            <b-radio v-model="radio"
                name="name"
                native-value="Vane"
                disabled>
                Vane
            </b-radio>
        </div>
        <p class="content">
            <b>Selection:</b>
            {{ radio }}
        </p>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BRadio } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BRadio
        },
        data() {
            return {
                radio: 'Jack'
            }
        }
    })
</script>
