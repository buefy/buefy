<template>
    <section>
        <b-field label="Select a color">
            <b-colorpicker :value="selected" inline/>
        </b-field>
    </section>
</template>

<script>
import Color from '../../../../../src/utils/color'

export default {
    data() {
        return {
            selected: Color.parse('red')
        }
    }
}
</script>
