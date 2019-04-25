<template>
    <article class="content expo">
        <div class="expo-head">
            <div class="expo-head-text">Show us your own project or job!</div>
            <div class="expo-head-button">
                <button
                    class="button is-twitter"
                    @click="tweet">
                    <b-icon icon="twitter"/>
                    <span>#MadeWithBuefy</span>
                </button>
            </div>
        </div>
        <div class="columns is-multiline">
            <div
                v-for="(item, i) in expo"
                :key="item.title"
                class="column has-text-centered"
                style="padding-right: 2.5em;"
                :class="i % 3 ? 'is-half' : 'is-full'">

                <a
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer">
                    <img class="image-has-shadow" :src="getImg(item.img)" :alt="item.title">
                </a>

                <p>
                    <a
                        class="title is-5"
                        :href="item.url"
                        target="_blank"
                        rel="noopener noreferrer">
                        {{ item.title }}
                    </a> <br>
                    <span class="subtitle is-6">
                        {{ new Date(item.date).toLocaleDateString() }}
                    </span>
                </p>
            </div>
        </div>
    </article>
</template>

<script>
    import expoData from '@/data/expo'

    export default {
        data() {
            return {
                expo: expoData
            }
        },
        methods: {
            tweet() {
                const width = 575
                const height = 400
                const left = (window.screen.width - width) / 2
                const top = (window.screen.height - height) / 2
                const url = `https://twitter.com/share?url=${encodeURIComponent(document.location.protocol + '//' + document.location.host)}&text=My website made with Buefy!&hashtags=madewithbuefy`
                const opts = `status=1,width=${width},height=${height},top=${top},left=${left}`

                window.open(url, '', opts)
            },
            getImg(img) {
                return require(`@/assets/expo/${img}`)
            }
        }
    }
</script>
