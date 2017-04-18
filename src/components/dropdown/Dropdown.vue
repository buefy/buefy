<template>
    <span class="dropdown control">
        <slot></slot>
        <a
            role="button"
            ref="trigger"
            class="trigger"
            @click="isActive = !isActive">
            <slot name="trigger"></slot>
        </a>

        <transition-group
            appear
            appear-active-class="fadeIn"
            enter-active-class="fadeIn"
            leave-active-class="fadeOut">

            <div
                key="bg"
                class="background is-hidden-desktop"
                v-show="isActive">
            </div>

            <span
                key="list"
                class="box"
                :class="['is-dropdown', {
                    'is-opened-top': !isListInViewportVertically,
                    'is-opened-left': !isListInViewportHorizontally,
                    'is-narrow': narrowed
                }]"
                v-show="isActive"
                ref="list">
                <ul>
                    <template v-for="option in searchOptions">
                        <li class="option"
                            :class="{
                                'is-selected': option === selected,
                                'is-separator': option.separator,
                                'is-disabled': option.disabled,
                                'is-unselectable': option.unselectable
                            }"
                            @click="selectOption(option)">
                            <b-icon
                                v-if="option.icon"
                                :icon="option.icon"
                                :icon-pack="option.iconPack">
                            </b-icon>
                            <span v-html="option.label"></span>
                        </li>
                    </template>
                </ul>
            </span>

        </transition-group>
    </span>
</template>

<script>
    import SelectMixin from '../../utils/SelectMixin.js'
    import Icon from '../icon'

    export default {
        name: 'bDropdown',
        mixins: [SelectMixin],
        components: {
            [Icon.name]: Icon
        },
        props: {
            narrowed: Boolean
        }
    }
</script>
