<script>
// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-vue/components/CarbonAds.vue
export default {
    name: 'CarbonAds',
    props: {
        id: String
    },
    watch: {
        '$route'(to, from) {
            if (to.path !== from.path &&
                // Only reload if the ad has been loaded
                // otherwise it's possible that the script is appended but
                // the ads are not loaded yet. This would result in duplicated ads.
                this.$el.querySelector('#carbonads')
            ) {
                this.$el.innerHTML = ''
                this.load()
            }
        }
    },
    methods: {
        load() {
            const s = document.createElement('script')
            s.id = '_carbonads_js'
            s.src = `//cdn.carbonads.com/carbon.js?serve=CE7DE23W&placement=buefyorg`
            this.$el.appendChild(s)
        }
    },
    mounted() {
        this.load()
    },
    render(h) {
        return h('div', { staticClass: 'carbon-container', attrs: { id: this.id } })
    }
}
</script>
