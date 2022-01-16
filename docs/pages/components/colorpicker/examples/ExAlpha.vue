<template>
    <section>
        <b-field>
            <div class="control">
                <b-switch v-model="alpha">Allow transparent color</b-switch>
            </div>
        </b-field>
        <b-field label="Select a color">
            <b-colorpicker v-model="selected" :alpha="alpha" />
        </b-field>
    </section>
</template>

<script>
import Color from '../../../../../src/utils/color'

export default {
    data() {
        return {
            alpha: true,
            selected: Color.parse('#FF0000')
        }
    },
    methods: {
        clearColor () {
            this.selected = null
        }
    }
}
</script>
