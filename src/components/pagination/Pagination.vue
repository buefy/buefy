<template>
    <div class="pagination" :class="[position, size, { 'is-simple': simple }]">
        <a class="pagination-previous" @click="prev" :class="{ 'is-disabled': !hasPrev }"><b-icon icon="chevron_left" both></b-icon></a>
        <a class="pagination-next" @click="next" :class="{ 'is-disabled': !hasNext }"><b-icon icon="chevron_right" both></b-icon></a>
        <ul class="pagination-list" v-if="!simple">

            <!--First-->
            <li v-if="hasFirst"><a class="pagination-link" @click="first">1</a></li>
            <li v-if="hasFirstEllipsis"><span class="pagination-ellipsis">&hellip;</span></li>

            <!--Pages-->
            <li v-for="page in pagesInRange"><a class="pagination-link" @click="page.click" :class="{ 'is-current': page.isCurrent }">{{ page.number }}</a></li>

            <!--Last-->
            <li v-if="hasLastEllipsis"><span class="pagination-ellipsis">&hellip;</span></li>
            <li v-if="hasLast"><a class="pagination-link" @click="last">{{ pageCount }}</a></li>
        </ul>
        <small class="info" v-if="simple">
            {{ firstItem }}-{{ current * perPage }} / {{ total }}
        </small>
    </div>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bPagination',
        components: {
            [Icon.name]: Icon
        },
        props: {
            total: [Number, String],
            perPage: {
                type: [Number, String],
                default: 20
            },
            current: {
                type: [Number, String],
                default: 1
            },
            size: String,
            simple: Boolean,
            position: String
        },
        computed: {
            pageCount() {
                return Math.ceil(this.total / this.perPage)
            },
            firstItem() {
                const firstItem = this.current * this.perPage - this.perPage + 1
                return firstItem >= 0 ? firstItem : 0
            },
            hasPrev() {
                return this.current > 1
            },
            hasFirst() {
                return this.current > 3
            },
            hasFirstEllipsis() {
                return this.current >= 5
            },
            hasLast() {
                return this.current < this.pageCount - 2
            },
            hasLastEllipsis() {
                return this.current < this.pageCount - 2 && this.current <= this.pageCount - 4
            },
            hasNext() {
                return this.current < this.pageCount
            },
            pagesInRange() {
                if (this.simple) return

                const left = Math.max(1, this.current - 1)
                const right = Math.min(this.current + 1, this.pageCount)

                const pages = []
                for (let i = left; i <= right; i++) {
                    pages.push({
                        number: i,
                        isCurrent: this.current === i,
                        click: () => this.$emit('change', i)
                    })
                }
                return pages
            }
        },
        watch: {
            pageCount(value) {
                if (this.current > value) {
                    this.last()
                }
            }
        },
        methods: {
            prev() {
                this.$emit('change', this.current - 1)
            },
            first() {
                this.$emit('change', 1)
            },
            last() {
                this.$emit('change', this.pageCount)
            },
            next() {
                this.$emit('change', this.current + 1)
            }
        }
    }
</script>
