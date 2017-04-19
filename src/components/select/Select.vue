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
                :readonly="isReadonly"
                :name="name"
                :required="required"
                autocomplete="off"
                @click="isActive = !isActive"
                @focus="$emit('focus', $event)"
                @blur="blur"
                @keyup.enter.prevent="keyEnter"
                @keyup.esc.prevent="keyEsc"
                @keydown.down.prevent="keyArrows('down')"
                @keydown.up.prevent="keyArrows('up')">

            <transition-group
                appear
                appear-active-class="fadeIn"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut">

                <div
                    key="bg"
                    class="background is-hidden-desktop"
                    v-show="isActive || isMouseOverDropdown">
                </div>
                <span
                    key="dropbox"
                    class="box"
                    :class="{ 'is-opened-top': !isListInViewportVertically }"
                    v-show="isActive || isMouseOverDropdown"
                    ref="dropdown"
                    @mouseenter="isMouseOverDropdown = true"
                    @mouseleave="isMouseOverDropdown = false">
                    <ul>
                        <template v-for="(option, i) in filteredOptions">
                            <li class="subheader" v-if="isSubheader(option, filteredOptions[i - 1], i)">
                                {{ option.group }}
                            </li>
                            <li class="option is-unselectable"
                                :class="{
                                    'is-selected': option === selected,
                                    'is-hovered': option === hovered,
                                    'has-subheader': option.group
                                }"
                                :ref="option.uid"
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
