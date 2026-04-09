<template>
    <nav
        v-if="prevPage || nextPage"
        class="docs-pager"
    >
        <router-link
            v-if="prevPage"
            :to="prevPage.path"
            class="docs-pager-btn docs-pager-prev"
        >
            <b-icon icon="chevron-left" />
            <span class="docs-pager-label">
                <span class="docs-pager-direction">Previous</span>
                <span class="docs-pager-title">{{ prevPage.title }}</span>
            </span>
        </router-link>
        <span v-else />

        <router-link
            v-if="nextPage"
            :to="nextPage.path"
            class="docs-pager-btn docs-pager-next"
        >
            <span class="docs-pager-label">
                <span class="docs-pager-direction">Next</span>
                <span class="docs-pager-title">{{ nextPage.title }}</span>
            </span>
            <b-icon icon="chevron-right" />
        </router-link>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { BIcon } from 'buefy'

import type { PageTree } from '@/data/menu'
import routes from '@/data/routes'
import type { Route } from '@/data/routes'

function flattenMenuPages(menu: PageTree[]): Route[] {
    const result: Route[] = []

    function processPages(pages: PageTree['pages']) {
        for (const page of pages) {
            if (typeof page === 'string') {
                const route = routes[page]
                if (route) result.push(route)
            } else {
                processPages(page.pages)
            }
        }
    }

    for (const section of menu) {
        processPages(section.pages)
    }

    return result
}

export default defineComponent({
    name: 'DocsPager',
    components: { BIcon },
    props: {
        menu: {
            type: Array as () => PageTree[],
            default: () => []
        }
    },
    computed: {
        flatPages(): Route[] {
            return flattenMenuPages(this.menu as PageTree[])
        },
        currentIndex(): number {
            const currentPath = this.$route.path
            return this.flatPages.findIndex((p) => p.path === currentPath)
        },
        prevPage(): Route | null {
            return this.currentIndex > 0
                ? this.flatPages[this.currentIndex - 1]
                : null
        },
        nextPage(): Route | null {
            const idx = this.currentIndex
            return idx >= 0 && idx < this.flatPages.length - 1
                ? this.flatPages[idx + 1]
                : null
        }
    }
})
</script>
