<template>
    <div class="codeview">
        <div v-if="title" class="codeview-title">
            {{ title }}
        </div>
        <figure class="highlight" :class="figureClasses">
            <div class="button-container">
                <b-button
                    type="is-text"
                    size="is-small"
                    class="copy-code"
                    label="Copy"
                />
                <b-button
                    v-if="!expanded"
                    type="is-text"
                    size="is-small"
                    label="Hide"
                    @click="isExpanded = false"
                />
            </div>
            <pre v-highlight><code :class="lang">{{ code }}</code></pre>
            <button
                v-if="!isExpanded && !expanded"
                class="codeview-showcode"
                @click="isExpanded = true"
            >
                <b-icon
                    icon="code-tags"
                    size="is-small"
                    custom-class="mdi-18px"
                />
                <span>Show code</span>
            </button>
            <button
                v-if="!expanded"
                class="codeview-hidecode"
                @click="isExpanded = false"
            >
                <b-icon
                    icon="eye-off-outline"
                    size="is-small"
                    custom-class="mdi-18px"
                />
                <span>Hide code</span>
            </button>
        </figure>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BButton, BIcon } from 'buefy'

export default defineComponent({
    components: {
        BButton,
        BIcon
    },
    props: {
        lang: {
            type: String,
            default: 'html'
        },
        bordered: Boolean,
        code: String,
        expanded: Boolean,
        title: String
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
})
</script>
