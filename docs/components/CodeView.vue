<template>
    <div class="codeview">
        <figure class="highlight" :class="figureClasses">
            <button class="button is-text is-small copy-code">Copy</button>
            <pre v-highlight><code :class="lang">{{ code }}</code></pre>
            <button
                v-if="!isExpanded && !expanded"
                class="codeview-showcode"
                @click="isExpanded = true">
                <b-icon icon="code-tags" size="is-small" custom-class="mdi-18px"/>
                <span>Show code</span>
            </button>
        </figure>
    </div>
</template>

<script>
    export default {
        props: {
            lang: {
                type: String,
                default: 'html'
            },
            bordered: Boolean,
            code: String,
            expanded: Boolean
        },
        data() {
            return {
                isExpanded: false
            }
        },
        computed: {
            figureClasses() {
                return {
                    'is-collapsed': !this.bordered && !this.expanded,
                    'is-expanded': this.isExpanded || this.expanded
                }
            }
        }
    }
</script>
