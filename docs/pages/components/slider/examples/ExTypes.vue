<template>
    <section>
        <b-field label="Primary">
            <b-slider type="is-primary" :value="20"></b-slider>
        </b-field>

        <b-field label="Success">
            <b-slider type="is-success" :value="20"></b-slider>
        </b-field>

        <b-field label="Error">
            <b-slider type="is-danger" :value="20"></b-slider>
        </b-field>

        <b-field label="Info">
            <b-slider type="is-info" :value="20"></b-slider>
        </b-field>

        <b-field label="Warning">
            <b-slider type="is-warning" :value="20"></b-slider>
        </b-field>
    </section>
</template>
