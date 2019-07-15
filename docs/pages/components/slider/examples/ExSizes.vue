<template>
    <section>
        <b-field label="Small">
            <b-slider size="is-small" type="is-primary" :value="20">
            </b-slider>
        </b-field>

        <b-field label="Default">
            <b-slider type="is-primary" :value="20">
            </b-slider>
        </b-field>

        <b-field label="Medium">
            <b-slider size="is-medium" type="is-primary" :value="20">
            </b-slider>
        </b-field>

        <b-field label="Large">
            <b-slider size="is-large" type="is-primary" :value="20">
            </b-slider>
        </b-field>
    </section>
</template>
