<template>
    <div class="carbon-container" ref="carbonads" />
</template>

<script>
// https://github.com/vuejs/vuefire/blob/master/packages/documentation/docs/.vuepress/components/CarbonAds.vue
export default {
    watch: {
        $route(to, from) {
            if (to.path !== from.path && typeof _carbonads === 'object') {
                // eslint-disable-next-line no-undef
                _carbonads.refresh()
            }
        }
    },
    mounted() {
        if (window.__PRERENDER_INJECTED === undefined) {
            if (this.$refs.carbonads.children.length) return
            const script = document.createElement('script')
            script.setAttribute('type', 'text/javascript')
            script.setAttribute(
                'src',
                `//cdn.carbonads.com/carbon.js?serve=CE7DE23W&placement=buefyorg`
            )
            script.setAttribute('id', `_carbonads_js`)
            this.$refs.carbonads.appendChild(script)
        }
    }
}
</script>
