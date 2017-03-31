<template>
    <div class="table-pagination">
        <ul>
            <!--Previuos-->
            <li class="item is-small" @click="prev" :class="{ 'is-disabled': !hasPrev }">
                <b-icon icon="chevron_left" both></b-icon>
            </li>

            <!--First-->
            <li class="item" @click="first" v-if="hasFirst">1</li>
            <li class="item is-disabled is-small" v-if="hasFirstEllipsis">...</li>

            <!--Pages-->
            <li class="item" v-for="page in pagesInRange" @click="page.click" :class="{ 'is-active': page.isActive }">{{ page.number }}</li>

            <!--Last-->
            <li class="item is-disabled is-small" v-if="hasLastEllipsis">...</li>
            <li class="item" @click="last" v-if="hasLast">{{ pageCount }}</li>

            <!--Next-->
            <li class="item is-small" @click="next" :class="{ 'is-disabled': !hasNext }">
                <b-icon icon="chevron_right" both></b-icon>
            </li>
        </ul>
        <small class="info" v-if="!fullPagination">
            {{ firstItem }}-{{ currentPage * perPage }} / {{ total }}
        </small>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bTablePagination',
        components: {
            [Icon.name]: Icon
        },
        props: {
            total: [Number, String],
            perPage: [Number, String],
            currentPage: [Number, String],
            fullPagination: Boolean
        },
        computed: {
            pageCount() {
                return Math.ceil(this.total / this.perPage)
            },
            firstItem() {
                const firstItem = this.currentPage * this.perPage - this.perPage + 1
                return firstItem >= 0 ? firstItem : 0
            },
            hasPrev() {
                return this.currentPage > 1
            },
            hasFirst() {
                return this.currentPage > 3 && this.fullPagination
            },
            hasFirstEllipsis() {
                return this.currentPage >= 5 && this.fullPagination
            },
            hasLast() {
                return this.currentPage < this.pageCount - 2 && this.fullPagination
            },
            hasLastEllipsis() {
                return this.currentPage < this.pageCount - 2 && this.currentPage <= this.pageCount - 4 && this.fullPagination
            },
            hasNext() {
                return this.currentPage < this.pageCount
            },
            pagesInRange() {
                if (!this.fullPagination) return

                const left = Math.max(1, this.currentPage - 2)
                const right = Math.min(this.currentPage + 2, this.pageCount)

                const pages = []
                for (let i = left; i <= right; i++) {
                    pages.push({
                        number: i,
                        isActive: this.currentPage === i,
                        click: () => this.$emit('change', i)
                    })
                }
                return pages
            }
        },
        watch: {
            pageCount(value) {
                if (this.currentPage > value) {
                    this.last()
                }
            }
        },
        methods: {
            prev() {
                this.$emit('change', this.currentPage - 1)
            },
            first() {
                this.$emit('change', 1)
            },
            last() {
                this.$emit('change', this.pageCount)
            },
            next() {
                this.$emit('change', this.currentPage + 1)
            }
        }
    }
</script>
