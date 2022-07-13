<template>
    <section>
        <b-field label="Show ticks">
            <b-slider :min="1" :max="10" ticks></b-slider>
        </b-field>

        <b-field label="Custom tick and label">
            <b-slider size="is-medium" :min="0" :max="10">
                <template v-for="val in [3, 5, 8]" :key="val">
                    <b-slider-tick :value="val">{{ val }}</b-slider-tick>
                </template>
            </b-slider>
        </b-field>

        <b-field label="Fan">
            <b-slider :min="0" :max="3" aria-label="Fan" :tooltip="false">
                <b-slider-tick :value="0">Off</b-slider-tick>
                <b-slider-tick :value="1">Low</b-slider-tick>
                <b-slider-tick :value="2">High</b-slider-tick>
                <b-slider-tick :value="3">Auto</b-slider-tick>
            </b-slider>
        </b-field>
    </section>
</template>
