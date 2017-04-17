<template>
    <p
        class="control has-icon has-icon-right"
        :class="{ 'is-expanded': expanded }">
        <slot></slot>
        <span
            class="select"
            :class="{ 'is-fullwidth': expanded }">
            <input
                v-model="inputValue"
                class="input"
                :class="[statusType, size]"
                ref="input"
                type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="!searchable"
                autocomplete="off"
                @click="isActive = !isActive"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
                @keyup.enter.prevent="inputEnter"
                @keyup.esc.prevent="isActive = false"
                @keydown.down.prevent="inputArrows('down')"
                @keydown.up.prevent="inputArrows('up')">

            <transition
                appear
                appear-active-class="fadeIn"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut">

                <span
                    class="box"
                    :class="{ 'is-opened-top': !isListInViewport }"
                    v-show="isActive"
                    ref="list">
                    <ul>
                        <template v-for="(option, i) in searchOptions">
                            <li class="subheader" v-if="isSubheader(option, searchOptions[i - 1], i)">
                                {{ option.group }}
                            </li>
                            <li class="option"
                                :class="{
                                    'is-selected': option === selected,
                                    'is-hovered': option === hovered,
                                    'has-subheader': option.group
                                }"
                                :ref="_uid + option.value"
                                @click="selectOption(option)"
                                @mouseenter="hoverOption(option)">
                                {{ option.label }}
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

    export default {
        name: 'bSelect',
        mixins: [SelectMixin]
    }
</script>
