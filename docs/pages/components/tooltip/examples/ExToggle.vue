<template>
    <section class="b-tooltips">
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

<style lang="scss" scoped>
.b-tooltips {
    .b-tooltip:not(:last-child) {
        margin-right: .5em
    }
    .b-tooltip {
        margin-bottom: .5em
    }
}
</style>
