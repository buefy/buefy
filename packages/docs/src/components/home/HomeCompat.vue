<template>
    <section class="compat-section">
        <div class="container">
            <div class="compat-callout">
                <b-icon icon="alert-circle-outline" class="callout-icon" />
                <div>
                    <strong>Vue 3 only.</strong>
                    Buefy v1.x requires Vue 3.0+. Vue 2 support ended with v0.x
                    and will not receive further updates.
                    <a
                        href="https://v2.buefy.org"
                        target="_blank"
                        rel="noopener"
                    >View Vue 2 docs →</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BIcon } from 'buefy'

export default defineComponent({
    name: 'HomeCompat',
    components: { BIcon }
})
</script>
