<template>
    <div class="hero docs-improve-this">
        <div class="hero-body">
            <p class="has-text-grey">
                This page is <strong class="has-text-grey-dark">open source</strong>.
                Noticed a typo or something's unclear?
            </p>
            <p>
                <a
                    :href="`https://github.com/buefy/buefy/blob/dev/docs/${githubPath}`"
                    target="_blank"
                    style="text-decoration: underline">
                    Improve this page on GitHub
                </a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            githubPath: String
        }
    }
</script>
