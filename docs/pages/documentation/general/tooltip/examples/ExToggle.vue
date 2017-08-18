<template>
    <section>
        <button class="button is-primary"
            @click="active = !active">
            Toggle
        </button>
        <hr>

        <b-tooltip label="I'm never closing"
            :active="active"
            always>
            <button class="button">
                Always
            </button>
        </b-tooltip>

        <b-tooltip label="Tooltip right"
            position="is-right"
            :active="active">
            <button class="button is-dark">
                Right
            </button>
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
