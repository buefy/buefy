<template>
    <div class="b-tabs" :class="mainClasses">
        <nav class="tabs" :class="navClasses">
            <ul>
                <li
                    v-for="(childItem, index) in childItems"
                    :key="index"
                    v-show="childItem.visible"
                    :class="{
                        'is-active': activeChild === index,
                        'is-disabled': childItem.disabled
                    }"
                >

                    <b-slot-component
                        v-if="childItem.$slots.header"
                        :component="childItem"
                        name="header"
                        tag="a"
                        @click.native="childClick(index)"
                    />
                    <a v-else @click="childClick(index)">
                        <b-icon
                            v-if="childItem.icon"
                            :icon="childItem.icon"
                            :pack="childItem.iconPack"
                            :size="size"/>
                        <span>{{ childItem.label }}</span>
                    </a>
                </li>
            </ul>
        </nav>
        <section class="tab-content" :class="{'is-transitioning': isTransitioning}">
            <slot/>
        </section>
    </div>
</template>

<script>
import TabbedMixin from '../../utils/TabbedMixin.js'

export default {
    name: 'BTabs',
    mixins: [TabbedMixin],
    props: {
        expanded: Boolean,
        multiline: Boolean
    },
    data() {
        return {
            _isTabs: true // Used internally by TabItem
        }
    },
    computed: {
        mainClasses() {
            return {
                'is-fullwidth': this.expanded,
                'is-vertical': this.vertical,
                'is-multiline': this.multiline,
                [this.position]: this.position && this.vertical
            }
        },
        navClasses() {
            return [
                this.type,
                this.size,
                {
                    [this.position]: this.position && !this.vertical,
                    'is-fullwidth': this.expanded,
                    'is-toggle-rounded is-toggle': this.type === 'is-toggle-rounded'
                }
            ]
        },
        childItems() {
            return this.defaultSlots
                .filter((vnode) =>
                    vnode.componentInstance &&
                    vnode.componentInstance.$data &&
                    vnode.componentInstance.$data._isTabItem)
                .map((vnode) => vnode.componentInstance)
        }
    }
}
</script>
