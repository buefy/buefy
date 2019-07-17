<template>
    <section>
        <b-field label="Small">
            <b-slider size="is-small" :value="20">
            </b-slider>
        </b-field>

        <b-field label="Default">
            <b-slider :value="20">
            </b-slider>
        </b-field>

        <b-field label="Medium">
            <b-slider size="is-medium" :value="20">
            </b-slider>
        </b-field>

        <b-field label="Large">
            <b-slider size="is-large" :value="20">
            </b-slider>
        </b-field>
    </section>
</template>
