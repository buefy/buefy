<template>
    <section>
        <b-field label="Primary">
            <b-slider type="is-primary" :model-value="20"></b-slider>
        </b-field>

        <b-field label="Success">
            <b-slider type="is-success" :model-value="20"></b-slider>
        </b-field>

        <b-field label="Error">
            <b-slider type="is-danger" :model-value="20"></b-slider>
        </b-field>

        <b-field label="Info">
            <b-slider type="is-info" :model-value="20"></b-slider>
        </b-field>

        <b-field label="Warning">
            <b-slider type="is-warning" :model-value="20"></b-slider>
        </b-field>
    </section>
</template>
