<template>
    <div class="codeview">
        <figure class="highlight" :class="figureClasses">
            <div class="button-container">
                <b-button
                    class="copy-code"
                    text="Copy"
                    size="is-small"
                    btn="is-text"
                />
                <b-button
                    v-if="!expanded"
                    text="Hide"
                    size="is-small"
                    btn="is-text"
                    @click="isExpanded = false"
                />
            </div>
            <pre v-highlight><code :class="lang">{{ code }}</code></pre>
            <b-button
                v-if="!isExpanded && !expanded"
                class="codeview-showcode"
                text="Show code"
                icon="code-tags"
                icon-size="is-small"
                no-default-class
                @click="isExpanded = true"
            />
            <b-button
                v-if="!expanded"
                class="codeview-hidecode"
                text="Hide code"
                icon="eye-off-outline"
                icon-size="is-small"
                @click="isExpanded = false"
            />
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
