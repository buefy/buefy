<template>
    <section class="home-community-section">
        <div class="container">
            <div v-if="sponsors && sponsors.length" class="community-sponsors">
                <p class="community-label">
                    Sponsors
                </p>
                <div class="community-grid">
                    <div
                        v-for="item in sponsors"
                        :key="item.title"
                        class="community-item"
                    >
                        <a
                            :href="item.url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                class="image-has-shadow"
                                :src="getSponsorImg(item.img)"
                                :alt="item.title"
                            >
                        </a>
                        <a
                            class="community-item-title"
                            :href="item.url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >{{ item.title }}</a>
                    </div>
                </div>
            </div>

            <div class="community-expo">
                <p class="community-intro">
                    Websites and apps
                    <a class="community-link" @click="tweet">#MadeWithBuefy</a>
                    from the
                    <router-link to="/expo" class="community-link">
                        Expo page
                    </router-link>
                </p>
                <div class="community-grid">
                    <div
                        v-for="item in expo"
                        :key="item.title"
                        class="community-item"
                    >
                        <a
                            :href="item.url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                class="image-has-shadow"
                                :src="getExpoImg(item.img)"
                                :alt="item.title"
                            >
                        </a>
                        <a
                            class="community-item-title"
                            :href="item.url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >{{ item.title }}</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import expoData from '@/data/expo'
import sponsorsData from '@/data/sponsors'

export default defineComponent({
    name: 'HomeCommunity',
    data() {
        return {
            expo: expoData.filter((item) => item.featured),
            sponsors: sponsorsData
        }
    },
    methods: {
        tweet() {
            const width = 575
            const height = 400
            const left = (window.screen.width - width) / 2
            const top = (window.screen.height - height) / 2
            const url = `https://twitter.com/share?url=${encodeURIComponent(
                document.location.protocol + '//' + document.location.host
            )}&text=My website made with Buefy!&hashtags=madewithbuefy`
            const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`
            window.open(url, '', opts)
        },
        getExpoImg(img: string) {
            return new URL(`/src/assets/expo/${img}`, import.meta.url).href
        },
        getSponsorImg(img: string) {
            return new URL(`/src/assets/sponsors/${img}`, import.meta.url).href
        }
    }
})
</script>
