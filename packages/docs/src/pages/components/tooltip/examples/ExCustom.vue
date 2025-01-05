<template>
    <section class="b-tooltips">
        <b-tooltip position="is-bottom" multilined>
            <b-button label="Html Content" type="is-primary" />
            <template v-slot:content>
                <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit. <i>Fusce id fermentum quam</i>.
            </template>
        </b-tooltip>

        <b-tooltip 
            type="is-light"
            :triggers="['click']"
            :auto-close="['outside', 'escape']">
            <template v-slot:content>
                <b-icon icon="heart" type="is-danger"></b-icon>
                <b-icon icon="thumb-up" type="is-info"></b-icon>
                <b-icon icon="thumb-down" type="is-warning"></b-icon>
                <b-icon icon="emoticon-cool"></b-icon>
            </template>
            <b-button label="Action" type="is-light" />
        </b-tooltip>
    </section>
</template>

<script setup lang="ts">
import { BButton, BIcon, BTooltip } from '@ntohq/buefy-next'
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
