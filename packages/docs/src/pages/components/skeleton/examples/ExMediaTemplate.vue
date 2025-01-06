<template>
    <section>
        <article class="media" v-for="i in media" :key="i">
            <figure class="media-left">
                <p class="image is-64x64">
                    <b-skeleton circle width="64px" height="64px"></b-skeleton>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <p>
                        <b-skeleton active></b-skeleton>
                        <b-skeleton height="80px"></b-skeleton>
                    </p>
                </div>
                <nav class="level is-mobile">
                    <div class="level-left">
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                        <a class="level-item">
                            <span class="icon is-small">
                                <b-skeleton></b-skeleton>
                            </span>
                        </a>
                    </div>
                </nav>
            </div>
        </article>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BSkeleton } from '@ntohq/buefy-next'

export default defineComponent({
    components: { BSkeleton },
    data() {
        return {
            media: 3
        }
    }
})
</script>
