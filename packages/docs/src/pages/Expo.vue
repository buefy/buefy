<template>
    <article class="content expo">
        <header class="expo-header">
            <h1 class="expo-title">Built with Buefy</h1>
            <p class="expo-subtitle">Projects and apps from the community</p>
            <div class="expo-head-actions">
                <button class="expo-action-btn" @click="tweet">
                    <b-icon
                        pack="fa"
                        custom-class="fa-brands"
                        icon="x-twitter"
                    />
                    <span>#MadeWithBuefy</span>
                </button>
                <a
                    class="expo-action-btn"
                    href="https://www.vuetelescope.com/explore?ui.slug=buefy&_sort=lastDetectedAt:desc"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <b-icon icon="nuxt" />
                    <span>Explore VueTelemetry</span>
                </a>
            </div>
        </header>

        <div class="expo-grid">
            <article
                v-for="item in expo"
                :key="item.title"
                class="expo-card"
            >
                <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="expo-card-link-overlay"
                    :aria-label="item.title"
                />
                <div class="card-thumb-wrap">
                    <img
                        class="card-thumb"
                        :src="getImg(item.img)"
                        :alt="item.title"
                    />
                    <div class="card-hover-overlay" aria-hidden="true">
                        Visit →
                    </div>
                </div>
                <div class="card-body">
                    <div class="card-title">{{ item.title }}</div>
                    <p v-if="item.description" class="card-desc">
                        {{ item.description }}
                    </p>
                    <div v-if="item.tags && item.tags.length" class="card-tags">
                        <span
                            v-for="tag in item.tags"
                            :key="tag"
                            class="card-tag"
                        >{{ tag }}</span>
                    </div>
                    <div class="card-date">{{ new Date(item.date).toLocaleDateString() }}</div>
                </div>
            </article>
        </div>

        <section class="expo-cta">
            <div class="expo-cta-content">
                <h3>Built something with Buefy?</h3>
                <p>Share your project with the community.</p>
            </div>
            <a
                href="https://github.com/buefy/buefy/discussions"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
            >
                Submit your project →
            </a>
        </section>
    </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BIcon } from "buefy";

import expoData from "@/data/expo";

export default defineComponent({
    components: { BIcon },
    data() {
        return {
            expo: expoData,
        };
    },
    methods: {
        tweet() {
            const width = 575;
            const height = 400;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;
            const url = `https://x.com/share?url=${encodeURIComponent(
                document.location.protocol + "//" + document.location.host
            )}&text=My website made with Buefy!&hashtags=madewithbuefy`;
            const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`;

            window.open(url, "_blank", opts);
        },
        getImg(img: string) {
            return new URL(`/src/assets/expo/${img}`, import.meta.url).href;
        },
    },
});
</script>
