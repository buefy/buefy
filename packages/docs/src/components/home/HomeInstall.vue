<template>
    <section class="quick-install-section">
        <div class="container has-text-centered">
            <h2 class="section-title">
                Get started in seconds
            </h2>
            <p class="section-sub">
                Install via your preferred package manager
            </p>
            <div class="install-tabs">
                <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="tab-pill"
                    :class="{ 'is-active': activeTab === tab.id }"
                    @click="activeTab = tab.id"
                >
                    {{ tab.label }}
                </button>
            </div>
            <div class="code-block">
                <pre><code>{{ currentCmd }}</code></pre>
                <button class="copy-btn" @click="copyCmd">
                    <span v-if="copied">✓ Copied</span>
                    <span v-else>Copy</span>
                </button>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import tabs from '@/data/homeInstall'

export default defineComponent({
    name: 'HomeInstall',
    data() {
        return {
            tabs,
            activeTab: 'npm',
            copied: false
        }
    },
    computed: {
        currentCmd(): string {
            return this.tabs.find((t) => t.id === this.activeTab)?.cmd ?? ''
        }
    },
    methods: {
        copyCmd() {
            navigator.clipboard.writeText(this.currentCmd).then(() => {
                this.copied = true
                setTimeout(() => { this.copied = false }, 2000)
            })
        }
    }
})
</script>
