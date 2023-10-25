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

<script>
import { Color } from '@ntohq/buefy-next'

export default {
    data() {
        return {
            alpha: true,
            selected: Color.parse('#48c78eaa')
        }
    },
    methods: {
        formatter (color) {
            return color.toString(this.alpha ? 'rgba' : 'rgb')
        }
    }
}
</script>
