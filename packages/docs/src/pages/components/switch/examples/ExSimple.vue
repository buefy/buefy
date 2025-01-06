<template>
    <section>
        <b-field>
            <b-switch>Default</b-switch>
        </b-field>
        <b-field>
            <b-switch v-model="isSwitched">
                {{ isSwitched }}
            </b-switch>
        </b-field>
        <b-field>
            <b-switch v-model="isSwitchedCustom"
                true-value="Yes"
                false-value="No">
                {{ isSwitchedCustom }}
            </b-switch>
        </b-field>
        <b-field>
            <b-switch disabled>Disabled</b-switch>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BField, BSwitch } from '@ntohq/buefy-next'

    export default defineComponent({
        components: {
            BField,
            BSwitch
        },
        data() {
            return {
                isSwitched: false,
                isSwitchedCustom: 'Yes'
            }
        }
    })
</script>
