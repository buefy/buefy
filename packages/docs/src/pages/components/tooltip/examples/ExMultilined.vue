<template>
    <section class="b-tooltips">

        <b-tooltip
            label="Tooltip multilined, probably because it's too long for a casual tooltip"
            multilined>
            <b-button label="Multiline (default)" type="is-dark" />
        </b-tooltip>

        <b-tooltip
            label="It's not brief, but it's also not long"
            size="is-small"
            multilined>
            <b-button label="Multiline (small)" type="is-dark" />
        </b-tooltip>

        <b-tooltip
            label="Tooltip large multilined, because it's too long to be on a medium size. Did I tell you it's really long? Yes, it is — I assure you!"
            position="is-bottom"
            size="is-large"
            multilined>
            <b-button label="Multiline (large)" type="is-dark" />
        </b-tooltip>
    </section>
</template>

<script setup lang="ts">
import { BButton, BTooltip } from '@ntohq/buefy-next'
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
