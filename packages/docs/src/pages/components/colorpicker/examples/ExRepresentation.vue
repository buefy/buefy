<template>
    <section>
        <b-field label="Select a color">
            <b-colorpicker :model-value="selected" representation="square" inline/>
        </b-field>
    </section>
</template>

<script>
import Color from '../../../../../../buefy-next/utils/color'

export default {
    data() {
        return {
            selected: Color.parse('red')
        }
    }
}
</script>
