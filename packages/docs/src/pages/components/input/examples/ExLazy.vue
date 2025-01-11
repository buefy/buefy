<template>
    <section>
        <b-field>
            <b-switch v-model="beLazy">Enable lazy</b-switch>
        </b-field>
        <b-field>
            <b-input type="text"
                :lazy="beLazy"
                v-model="value"
                placeholder="Input">
            </b-input>
        </b-field>
        <p class="content">
            Value is: {{value}}
        </p>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BField, BInput, BSwitch } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BField,
        BInput,
        BSwitch
    },
    data() {
        return {
            beLazy: false,
            value: null
        }
    }
})
</script>
