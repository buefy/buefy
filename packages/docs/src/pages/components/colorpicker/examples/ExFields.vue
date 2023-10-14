<template>
    <section>
        <b-field label="Select a color">
            <b-colorpicker :model-value="selected" inline horizontal-color-picker>
                <template #footer="{ color }">
                    <div class="colorpicker-fields">
                        <b-field grouped>
                            <b-field horizontal label="R">
                                <b-input
                                    type="number"
                                    v-model.number="color.red"
                                    size="is-small"
                                    aria-label="Red"
                                    min="0"
                                    max="255"
                                />
                            </b-field>
                            <b-field horizontal label="G">
                                <b-input
                                    type="number"
                                    v-model.number="color.green"
                                    size="is-small"
                                    aria-label="Green"
                                    min="0"
                                    max="255"
                                />
                            </b-field>
                            <b-field horizontal label="B">
                                <b-input
                                    type="number"
                                    v-model.number="color.blue"
                                    size="is-small"
                                    aria-label="Blue"
                                    min="0"
                                    max="255"
                                />
                            </b-field>
                        </b-field>
                        <b-field grouped>
                            <b-field horizontal label="H">
                                <b-input
                                    type="number"
                                    v-model.number="color.hue"
                                    size="is-small"
                                    aria-label="Hue"
                                    min="0"
                                    max="359"
                                    step="1"
                                />
                            </b-field>
                            <b-field horizontal label="S">
                                <b-input
                                    type="number"
                                    :value="Math.round(color.saturation * 100)"
                                    @input="color.saturation = $event / 100"
                                    size="is-small"
                                    aria-label="Saturation"
                                    min="0"
                                    max="100"
                                    step="1"
                                />
                            </b-field>
                            <b-field horizontal label="L">
                                <b-input
                                    type="number"
                                    :value="Math.round(color.lightness * 100)"
                                    @input="color.lightness = $event / 100"
                                    size="is-small"
                                    aria-label="Lightness"
                                    min="0"
                                    max="100"
                                    step="1"
                                />
                            </b-field>
                        </b-field>
                    </div>
                    <div class="buttons is-right">
                        <b-button
                            label="Clear"
                            type="is-danger"
                            size="is-small"
                            icon-left="close"
                            outlined
                            @click="clearColor"
                        />
                    </div>
                </template>
            </b-colorpicker>
        </b-field>
    </section>
</template>

<script>
import Color from '../../../../../../src/utils/color'

export default {
    data() {
        return {
            selected: Color.parse('cyan')
        }
    },
    methods: {
        clearColor () {
            this.selected = Color.parse('cyan')
        }
    }
}
</script>
