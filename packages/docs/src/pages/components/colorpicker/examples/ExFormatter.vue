<template>
    <section>
        <b-field label="Format">
            <b-select v-model="format" placeholder="Select a format">
                <option value="hex">Hexadecimal RGB</option>
                <option value="hexa">Hexadecimal RGB+A</option>
                <option value="rgb">Functional RGB</option>
                <option value="rgba">Functional RGB+A</option>
                <option value="hsl">Functional HSL</option>
                <option value="hsla">Functional HSL+A</option>
            </b-select>
        </b-field>
        <b-field label="Select a color">
            <b-colorpicker
                v-model="selected"
                :color-formatter="formatter"
                :alpha="hasAlpha"
                expanded
            />
        </b-field>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BColorpicker, BField, BSelect, Color } from '@ntohq/buefy-next'

export default defineComponent({
    data() {
        return {
            format: 'rgb',
            selected: Color.parse('#3e8ed0')
        }
    },
    computed: {
        hasAlpha() {
            return /a\s*$/i.test(this.format)
        }
    },
    methods: {
        formatter (color: Color) {
            return color.toString(this.format)
        }
    }
})
</script>
