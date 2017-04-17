<template>
    <p class="control">
        <slot></slot>
        <span class="dropdown">
            <a
                role="button"
                ref="button"
                class="trigger"
                @click="isActive = true">
                <slot name="button"></slot>
            </a>

            <transition
                appear
                appear-active-class="fadeIn"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut">

                <span
                    class="box"
                    :class="['is-dropdown', {
                        'is-opened-top': !isListInViewport,
                        'is-narrow': narrowed
                    }]"
                    v-show="isActive"
                    ref="list">
                    <ul>
                        <template v-for="option in searchOptions">
                            <li class="option"
                                :class="{
                                    'is-selected': option === selected,
                                    'is-separator': option.separator
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

            </transition>
        </span>
    </p>
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
            buttonClass: String,
            buttonText: String,
            narrowed: Boolean,
            triggerRight: Boolean
        }
    }
</script>
