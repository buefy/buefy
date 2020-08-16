<template>
    <div class="b-tabs" :class="mainClasses">
        <nav class="tabs" :class="navClasses">
            <ul>
                <li
                    v-for="childItem in items"
                    :key="childItem.value"
                    v-show="childItem.visible"
                    :class="[ childItem.headerClass, { 'is-active': childItem.isActive,
                                                       'is-disabled': childItem.disabled }]">
                    <b-slot-component
                        v-if="childItem.$slots.header"
                        :component="childItem"
                        name="header"
                        tag="a"
                        @click.native="childClick(childItem)"
                    />
                    <a v-else @click="childClick(childItem)">
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
import config from '../../utils/config'
import TabbedMixin from '../../utils/TabbedMixin.js'

export default {
    name: 'BTabs',
    mixins: [TabbedMixin('tab')],
    props: {
        expanded: {
            type: Boolean,
            default: () => {
                return config.defaultTabsExpanded
            }
        },
        type: {
            type: [String, Object],
            default: () => {
                return config.defaultTabsType
            }
        },
        animated: {
            type: Boolean,
            default: () => {
                return config.defaultTabsAnimated
            }
        },
        multiline: Boolean
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
        }
    }
}
</script>
