<template>
    <section>
        <b-field label="Select a date" grouped>
            <b-datepicker v-model="selected" :mobile-native="false">
                <template v-slot:trigger>
                    <b-button
                        icon-left="calendar-today"
                        type="is-primary" />
                </template>
            </b-datepicker>
            <b-input expanded readonly :value="selectedString" />
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BButton, BDatepicker, BField, BInput } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BButton,
        BDatepicker,
        BField,
        BInput
    },
    data() {
        return {
            selected: null as Date | null
        }
    },
    computed: {
        selectedString() {
            return this.selected ? this.selected.toDateString() : ''
        }
    }
})
</script>
