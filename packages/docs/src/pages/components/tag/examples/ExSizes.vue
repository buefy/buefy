<template>
    <section>
        <b-taglist>
            <b-tag type="is-dark">Default</b-tag>
            <b-tag type="is-primary" size="is-medium">Medium</b-tag>
            <b-tag type="is-info" size="is-large">Large</b-tag>
        </b-taglist>

        <b-taglist>
            <b-tag type="is-primary">Primary</b-tag>
            <b-tag type="is-primary is-light">Light primary</b-tag>

            <b-tag type="is-success">Success</b-tag>
            <b-tag type="is-success is-light">Light success</b-tag>

            <b-tag type="is-danger">Danger</b-tag>
            <b-tag type="is-danger is-light">Light danger</b-tag>

            <b-tag type="is-warning">Warning</b-tag>
            <b-tag type="is-warning is-light">Light warning</b-tag>

            <b-tag type="is-info">Info</b-tag>
            <b-tag type="is-info is-light">Light info</b-tag>

            <b-tag type="is-link">Link</b-tag>
            <b-tag type="is-link is-light">Light link</b-tag>

            <br />
            <b-tag type="is-light">Light</b-tag>

            <b-tag type="is-dark">Dark</b-tag>
        </b-taglist>
    </section>
</template>

<script setup lang="ts">
import { BTag, BTaglist } from '@ntohq/buefy-next'
</script>
