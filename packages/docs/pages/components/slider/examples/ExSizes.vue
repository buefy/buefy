<template>
    <section>
        <b-field label="Small">
            <b-slider size="is-small" :model-value="20">
            </b-slider>
        </b-field>

        <b-field label="Default">
            <b-slider :model-value="20">
            </b-slider>
        </b-field>

        <b-field label="Medium">
            <b-slider size="is-medium" :model-value="20">
            </b-slider>
        </b-field>

        <b-field label="Large">
            <b-slider size="is-large" :model-value="20">
            </b-slider>
        </b-field>
    </section>
</template>
