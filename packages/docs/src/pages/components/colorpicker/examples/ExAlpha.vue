<template>
    <section>
        <b-field>
            <div class="control">
                <b-switch v-model="alpha">Allow transparent color</b-switch>
            </div>
        </b-field>
        <b-field label="Select a color">
            <b-colorpicker v-model="selected" :alpha="alpha" :color-formatter="formatter" />
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BColorpicker, BField, BSwitch, Color } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BColorpicker,
        BField,
        BSwitch
    },
    data() {
        return {
            alpha: true,
            selected: Color.parse('#48c78eaa')
        }
    },
    methods: {
        formatter (color: Color) {
            return color.toString(this.alpha ? 'rgba' : 'rgb')
        }
    }
})
</script>
