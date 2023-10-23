<template>
    <div class="sidebar-search">
        <div
            role="button"
            class="sidebar-search-button"
            :aria-keyshortcuts="isMacOS ? 'Meta+K' : 'Control+K'"
            :tabindex="0"
            @click="open"
        >
            <span class="sidebar-menu-text">
                <b-icon
                    icon="magnify"
                    aria-hidden="true"
                    style="vertical-align: middle;"
                />
                Search
            </span>
            <b-tag type="is-primary is-light is-hidden-touch" aria-hidden="true">
                {{ isMacOS ? '⌘' : 'Ctrl' }} K
            </b-tag>
        </div>

        <b-modal
            v-model="isActive"
            @after-enter="focus"
            :width="560"
        >
            <article class="panel is-primary">
                <div class="panel-block">
                    <p class="control has-icons-left">
                        <b-input
                            ref="searchbar"
                            type="search"
                            placeholder="Search docs"
                            aria-label="Search in the documentation"
                            aria-controls="sidebarSearchResults"
                            :aria-invalid="isTermEmpty || sortedResults.length > 0 ? null : 'true'"
                            :aria-errormessage="isTermEmpty || sortedResults.length > 0
                                ? null
                                :'sidebarSearchNoresult'
                            "
                            @update:model-value="search"
                            maxlength="32"
                            :has-counter="false"
                        />
                        <span class="icon is-left">
                            <i class="fas fa-search" aria-hidden="true" />
                        </span>
                    </p>
                </div>

                <div
                    v-if="!isTermEmpty"
                    id="sidebarSearchResults"
                    class="panel-block sidebar-search-results"
                    role="region"
                    aria-labelledby="Search results"
                    aria-live="polite"
                >
                    <template
                        v-if="sortedResults.length > 0"
                    >
                        <template
                            v-for="section in sortedResults"
                            :key="section.category"
                        >
                            <div
                                role="group"
                                :aria-label="`Results in ${section.category}`"
                            >
                                <h4 class="has-text-primary">
                                    {{ section.category }}
                                </h4>

                                <div
                                    v-for="result in section.results"
                                    :ref="`result_${result.index}`"
                                    :key="result.path"
                                    class="notification"
                                    :class="{
                                        'is-active': result.index === selectedIndex
                                    }"
                                    @mouseenter="select(result.index)"
                                    @click="navigateTo"
                                    role="option"
                                    :aria-selected="result.index === selectedIndex"
                                    :aria-setsize="results.length"
                                    :aria-posinset="result.index + 1"
                                    tabindex="-1"
                                >
                                    <p v-html="highlightTerm(result.title)" class="is-size-6" />
                                    <p class="is-size-7">
                                        {{ stripTags(result.subtitle) }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </template>

                    <p
                        v-else
                        id="sidebarSearchNoresult"
                        class="is-size-4 has-text-dark sidebar-search-noresult"
                    >
                        No results for “<strong class="has-text-primary">{{ term }}</strong>„
                    </p>
                </div>

                <ul class="panel-block sidebar-search-shortcuts is-hidden-touch">
                    <li aria-keyshortcuts="Enter">
                        <b-tag type="is-primary is-light">
                            Enter
                        </b-tag>
                        &nbsp;to select
                    </li>
                    <li aria-keyshortcuts="ArrowUp ArrowDown">
                        <b-tag type="is-primary is-light">
                            ↓
                        </b-tag>
                        &nbsp;
                        <b-tag type="is-primary is-light">
                            ↑
                        </b-tag>
                        &nbsp;to navigate
                    </li>
                    <li aria-keyshortcuts="Escape">
                        <b-tag type="is-primary is-light">
                            Esc
                        </b-tag>
                        &nbsp;
                        to close
                    </li>
                </ul>
            </article>
        </b-modal>
    </div>
</template>

<script>
import routes from '@/data/routes'
import menu from '@/data/menu'

export default {
    data() {
        const categories = new Set()
        const categoryByPage = {}
        const traverseMenu = (page) => {
            categories.add(page.category)
            page.pages.forEach((subpage) => {
                if (typeof subpage === 'string') {
                    categoryByPage[subpage] = page.category
                } else {
                    traverseMenu(subpage)
                }
            })
        }
        traverseMenu({ category: 'Documentation', pages: menu.documentation })

        return {
            isActive: false,
            isMacOS: /\(\s*Macintosh\s*;/.test(navigator.userAgent),
            categories: [...categories],
            categoryByPage,
            results: [],
            selectedIndex: 0,
            term: ''
        }
    },
    computed: {
        docRoutes() {
            return Object.values(routes)
                .filter((route) => route.menu === 'documentation')
        },
        isTermEmpty() {
            return /^\s*$/.test(this.term)
        },
        sortedResults() {
            const resultsByCategory = {}
            let index = 0

            this.results.forEach((result) => {
                const category = this.categoryByPage[result.path.replace(/^\//, '')] || 'Others'
                const score = this.term.trim().toLowerCase() !== result.title.trim().toLowerCase()
                    ? new RegExp('^' + this.term.trim(), 'i').test(result.title) === false
                        ? RegExp('\\s+' + this.term.trim(), 'i').test(result.title) === false
                            ? RegExp(this.term.trim(), 'i').test(result.title) === false
                                ? 0
                                : 2
                            : 3
                        : 4
                    : 5

                if (typeof resultsByCategory[category] === 'undefined') {
                    resultsByCategory[category] = {
                        category,
                        results: [],
                        score
                    }
                } else {
                    if (score > resultsByCategory[category].score) {
                        resultsByCategory[category].score = score
                    }
                }
                resultsByCategory[category].results.push({
                    ...result,
                    score
                })
            })

            const sorted = Object.values(resultsByCategory)
                .sort((a, b) => String(b.score).localeCompare(a.score))
            sorted.forEach((category) => {
                category.results = category.results
                    .sort((a, b) => String(b.score).localeCompare(a.score))
                    .map((result) => ({ ...result, index: index++ }))
            })

            return sorted
        }
    },
    methods: {
        open() {
            this.isActive = true
        },
        close() {
            this.isActive = false
            this.term = ''
            this.results = []
        },
        focus() {
            this.$refs.searchbar.focus()
        },
        select(index) {
            this.selectedIndex = Math.max(0, Math.min(index, this.results.length - 1))
        },
        search(term) {
            this.selectedIndex = 0
            this.term = term
            this.results = this.docRoutes.filter((route) => {
                const regexp = new RegExp(term.replace(/\s+/g, '.*\\s+'), 'i')
                return regexp.test(route.title) || regexp.test(route.subtitle)
            })
        },
        scrollToSelection() {
            if (this.$refs[`result_${this.selectedIndex}`]) {
                this.$refs[`result_${this.selectedIndex}`][0].scrollIntoView({
                    behavior: 'auto',
                    block: 'center',
                    inline: 'nearest'
                })
            }
        },
        navigateTo() {
            this.sortedResults.some((category) =>
                category.results.some((result) => {
                    if (result.index === this.selectedIndex) {
                        this.$router.push(result.path)
                        this.close()
                        return true
                    }
                    return false
                })
            )
        },
        shortcutHandler(event) {
            switch (event.key) {
                case 'Escape':
                    return this.close()
                case 'k':
                case 'K':
                    // NOTE: MetaKey is the command key on 🍏' devices
                    if (event.ctrlKey || event.metaKey) {
                        event.preventDefault()
                        event.stopPropagation()
                        this.open()
                    }
                    break
                case 'ArrowUp':
                    if (this.isActive) {
                        this.selectedIndex = Math.max(
                            0,
                            this.selectedIndex - 1
                        )
                        this.scrollToSelection()
                    }
                    break
                case 'ArrowDown':
                    if (this.isActive) {
                        this.selectedIndex = Math.min(
                            this.results.length - 1,
                            this.selectedIndex + 1
                        )
                        this.scrollToSelection()
                    }
                    break
                case 'PageUp':
                    if (this.isActive) {
                        this.selectedIndex = 0
                        this.scrollToSelection()
                    }
                    break
                case 'PageDown':
                    if (this.isActive) {
                        this.selectedIndex = Math.max(0, this.results.length - 1)
                        this.scrollToSelection()
                    }
                    break
                case 'Enter':
                    if (this.isActive && this.results.length > 0) {
                        this.navigateTo()
                    }
                    break
            }
        },
        highlightTerm(str) {
            const words = this.term.split(/\s+/)
            return str.replace(
                new RegExp(`(${words.join('|')})`, 'ig'),
                '<em class="has-text-primary">$1</em>'
            )
        },
        stripTags(str) {
            return str.replace(/<[^>]*>/g, '')
        }
    },
    mounted() {
        window.addEventListener('keydown', this.shortcutHandler)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.shortcutHandler)
    }
}
</script>

<style lang="scss">
.sidebar-search-button {
    cursor: pointer;
    display: flex;
    margin-bottom: 1em;

    .sidebar-menu-text {
        flex-grow: 1;
    }
}
.sidebar-search  {
    .modal {
        justify-content: flex-start;
        .modal-content {
            margin-top: 60px;
        }
    }
    .panel {
        background: #fff;
    }
    &-results {
        flex-direction: column;
        align-items: stretch;
        max-height: 488px;
        scroll-behavior: smooth;
        scrollbar-width: thin;
        overflow: hidden auto;

        .notification {
            cursor: pointer;
            margin-bottom: .5rem;

            &.is-active {
                background: #7957d5;
                color: #fff;

                em {
                    color: inherit!important;
                    text-decoration: underline;
                }
            }

            p {
                white-space: pre;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            em {
                font-style: normal;
            }
        }
    }
    &-noresult {
        margin: 8px auto 12px;
        padding: 0 8px;

        strong {
            display: inline-block;
            max-width: 340px;
            white-space: pre;
            overflow: hidden;
            text-overflow: ellipsis;
            vertical-align: bottom;
        }
    }
    &-shortcuts {
        list-style: none;

        li {
            margin-right: 1em;
        }
    }
}
</style>
