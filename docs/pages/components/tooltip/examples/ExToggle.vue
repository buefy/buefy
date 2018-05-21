<template>
    <section>
        <b-button text="Toggle" btn="is-primary" @click="active = !active" />
        <hr>

        <b-tooltip label="I'm never closing"
            :active="active"
            always>
            <b-button text="Always" />
        </b-tooltip>

        <b-tooltip label="Tooltip right"
            position="is-right"
            :active="active">
            <b-button text="Right" btn="is-dark" />
        </b-tooltip>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                active: true
            }
        }
    }
</script>
