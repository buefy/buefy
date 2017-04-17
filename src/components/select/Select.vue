<template>
    <p
        class="control has-icon has-icon-right"
        :class="{ 'is-expanded': expanded }">
        <slot></slot>
        <span
            class="select"
            :class="[size, { 'is-fullwidth': expanded }]">
            <input
                v-model="inputValue"
                class="input"
                :class="[statusType, size]"
                ref="input"
                type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="!searchable"
                :name="name"
                :required="required"
                autocomplete="off"
                @click="isActive = !isActive"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event)"
                @keyup.enter.prevent="inputEnter"
                @keyup.esc.prevent="isActive = false"
                @keydown.down.prevent="inputArrows('down')"
                @keydown.up.prevent="inputArrows('up')">

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
                    :class="{ 'is-opened-top': !isListInViewportVertically }"
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

            </transition-group>
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
