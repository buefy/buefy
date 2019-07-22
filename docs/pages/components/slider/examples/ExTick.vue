<template>
    <section>
        <b-field label="Show ticks">
            <b-slider :min="1" :max="10" ticks></b-slider>
        </b-field>

        <b-field label="Custom tick and label">
            <b-slider size="is-medium" :min="0" :max="10">
                <template v-for="pos in [3, 5, 8]">
                    <b-slider-tick :value="pos" :key="pos">{{ pos }}</b-slider-tick>
                </template>
            </b-slider>
        </b-field>

    </section>
</template>
