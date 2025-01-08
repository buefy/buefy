<template>
    <section>

        <div class="buttons">
            <b-button type="is-primary">Primary</b-button>
            <b-button type="is-primary is-light">Primary Light</b-button>

            <b-button type="is-success">Success</b-button>
            <b-button type="is-success is-light">Success Light</b-button>

            <b-button type="is-danger">Danger</b-button>
            <b-button type="is-danger is-light">Danger Light</b-button>

            <b-button type="is-warning">Warning</b-button>
            <b-button type="is-warning is-light">Warning Light</b-button>

            <b-button type="is-info">Info</b-button>
            <b-button type="is-info is-light">Info Light</b-button>

            <b-button type="is-link">Link</b-button>
            <b-button type="is-link is-light">Link Light</b-button><br />

            <b-button type="is-light">Light</b-button>
            <b-button type="is-dark">Dark</b-button>
            <b-button type="is-text">Text</b-button>
            <b-button type="is-ghost">Ghost</b-button>
        </div>

        <div class="buttons">
            <b-button>Normal</b-button>
            <b-button disabled>Disabled</b-button>
            <b-button loading>Loading</b-button>
            <b-button rounded>Rounded</b-button>
            <b-button focused>Focused</b-button>
            <b-button hovered>Hovered</b-button>
            <b-button selected>Selected</b-button>
            <b-button active>Active</b-button>
        </div>

        <div class="buttons">
            <b-button type="is-primary" outlined>Outlined</b-button>
            <b-button type="is-success" outlined>Outlined</b-button>
            <b-button type="is-danger" outlined>Outlined</b-button>
            <b-button type="is-warning" outlined>Outlined</b-button>
        </div>

        <div class="buttons">
            <b-button type="is-primary" expanded>Expanded</b-button>
        </div>

        <div class="notification is-primary">
            <div class="buttons">
                <b-button type="is-primary" inverted>Inverted</b-button>
                <b-button type="is-primary" inverted outlined>Invert Outlined</b-button>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import { BButton } from '@ntohq/buefy-next'
</script>
