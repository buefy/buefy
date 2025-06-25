<template>
    <div class="b-tabs" :class="mainClasses">
        <nav
            class="tabs"
            :class="navClasses"
            @keydown="manageTablistKeydown"
        >
            <slot name="start" />
            <ul
                :aria-orientation="vertical ? 'vertical' : 'horizontal'"
                role="tablist"
            >
                <li
                    v-for="childItem in items"
                    :key="childItem.uniqueValue"
                    v-show="childItem.visible"
                    :class="[ childItem.headerClass, { 'is-active': childItem.isActive,
                                                       'is-disabled': childItem.disabled }]"
                    role="tab"
                    :aria-controls="`${childItem.uniqueValue}-content`"
                    :aria-selected="`${childItem.isActive}`"
                >
                    <b-slot-component
                        :ref="`tabLink${childItem.index}`"
                        v-if="childItem.$slots.header"
                        :component="childItem"
                        name="header"
                        tag="a"
                        :id="`${childItem.uniqueValue}-label`"
                        :tabindex="childItem.isActive ? 0 : -1"
                        @focus="currentFocus = childItem.index"
                        @click="childClick(childItem)"
                        @keydown="manageTabKeydown($event, childItem)"
                    />
                    <a
                        :ref="`tabLink${childItem.index}`"
                        v-else
                        :id="`${childItem.uniqueValue}-label`"
                        :tabindex="childItem.isActive ? 0 : -1"
                        @focus="currentFocus = childItem.index"
                        @click="childClick(childItem)"
                        @keydown="manageTabKeydown($event, childItem)"
                    >
                        <b-icon
                            v-if="childItem.icon"
                            :icon="childItem.icon"
                            :pack="childItem.iconPack"
                            :size="size"
                        />
                        <span>{{ childItem.label }}</span>
                    </a>
                </li>
            </ul>
            <slot name="end" />
        </nav>
        <section class="tab-content" :class="{'is-transitioning': isTransitioning}">
            <slot />
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ComponentPublicInstance } from 'vue'

import BIcon from '../icon/Icon.vue'
import config from '../../utils/config'
import TabbedMixin from '../../utils/TabbedMixin'
import BSlotComponent from '../../utils/SlotComponent'
import type { TabbedChild } from '../../utils/TabbedTypes'

export default defineComponent({
    name: 'BTabs',
    components: {
        BIcon,
        BSlotComponent
    },
    mixins: [TabbedMixin<TabbedChild>('tab')],
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
    data() {
        return {
            currentFocus: null as number | null
        }
    },
    computed: {
        mainClasses() {
            return {
                'is-fullwidth': this.expanded,
                'is-vertical': this.vertical,
                'is-multiline': this.multiline,
                [this.position!]: this.position && this.vertical
            }
        },
        navClasses() {
            return [
                this.type,
                this.size,
                {
                    [this.position!]: this.position && !this.vertical,
                    'is-fullwidth': this.expanded,
                    'is-toggle': this.type === 'is-toggle-rounded'
                }
            ]
        }
    },
    methods: {
        giveFocusToTab(tab: HTMLElement | ComponentPublicInstance | ComponentPublicInstance[]) {
            if (Array.isArray(tab)) {
                // Vue ≥ v3.0 < v3.2.25, refs in v-for are stored as a single object,
                // but ≥ v3.2.25, refs in v-for are stored in an array (same as Vue 2)
                tab = tab[0]
                if (tab == null) {
                    return
                }
            }
            if (
                (tab as ComponentPublicInstance).$el &&
                (tab as ComponentPublicInstance).$el.focus
            ) {
                (tab as ComponentPublicInstance).$el.focus()
            } else if ((tab as HTMLElement).focus) {
                (tab as HTMLElement).focus()
            }
        },
        manageTablistKeydown(event: KeyboardEvent) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event
            switch (key) {
                case this.vertical ? 'ArrowUp' : 'ArrowLeft':
                case this.vertical ? 'Up' : 'Left': {
                    let prevIdx = this.getPrevItemIdx(this.currentFocus!, true)
                    if (prevIdx === null) {
                        // We try to give focus back to the last visible element
                        prevIdx = this.getPrevItemIdx(Infinity, true)
                    }
                    const prevItem = this.items.find((i) => i.index === prevIdx)
                    if (
                        prevItem &&
                        this.$refs[`tabLink${prevIdx}`] &&
                        !prevItem.disabled
                    ) {
                        this.giveFocusToTab(this.$refs[`tabLink${prevIdx}`] as HTMLElement | ComponentPublicInstance | ComponentPublicInstance[])
                    }
                    event.preventDefault()
                    break
                }
                case this.vertical ? 'ArrowDown' : 'ArrowRight':
                case this.vertical ? 'Down' : 'Right': {
                    let nextIdx = this.getNextItemIdx(this.currentFocus!, true)
                    if (nextIdx === null) {
                        // We try to give focus back to the first visible element
                        nextIdx = this.getNextItemIdx(-1, true)
                    }
                    const nextItem = this.items.find((i) => i.index === nextIdx)
                    if (
                        nextItem &&
                        this.$refs[`tabLink${nextIdx}`] &&
                        !nextItem.disabled
                    ) {
                        this.giveFocusToTab(this.$refs[`tabLink${nextIdx}`] as HTMLElement | ComponentPublicInstance | ComponentPublicInstance[])
                    }
                    event.preventDefault()
                    break
                }
            }
        },

        manageTabKeydown(event: KeyboardEvent, childItem: TabbedChild) {
            // https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/key/Key_Values#Navigation_keys
            const { key } = event
            switch (key) {
                case ' ':
                case 'Space':
                case 'Spacebar':
                case 'Enter': {
                    this.childClick(childItem)
                    event.preventDefault()
                    break
                }
            }
        }
    }
})
</script>
