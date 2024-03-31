<template>
    <div
        class="b-clockpicker control"
        :class="[size, type, {'is-expanded': expanded}]"
        v-bind="rootAttrs"
    >
        <b-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            :position="position"
            :disabled="disabledOrUndefined"
            :inline="inline"
            :mobile-modal="mobileModal"
            :append-to-body="appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange"
        >
            <template #trigger v-if="!inline">
                <slot name="trigger">
                    <b-input
                        ref="input"
                        autocomplete="off"
                        :value="formatValue(computedValue)"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-pack="iconPack"
                        :loading="loading"
                        :disabled="disabledOrUndefined"
                        :readonly="!editable"
                        :rounded="rounded"
                        v-bind="fallthroughAttrs"
                        :use-html5-validation="useHtml5Validation"
                        @click="onInputClick"
                        @keyup.enter="toggle(true)"
                        @change="onChange($event.target.value)"
                        @focus="handleOnFocus"
                        @blur="checkHtml5Validity()"
                    />
                </slot>
            </template>
            <div
                class="card"
                :disabled="disabledOrUndefined"
                custom
            >
                <header v-if="inline" class="card-header">
                    <div class="b-clockpicker-header card-header-title">
                        <div class="b-clockpicker-time">
                            <span
                                class="b-clockpicker-btn"
                                :class="{ active: isSelectingHour }"
                                @click="isSelectingHour = true"
                            >{{ hoursDisplay }}</span>
                            <span>{{ hourLiteral }}</span>
                            <span
                                class="b-clockpicker-btn"
                                :class="{ active: !isSelectingHour }"
                                @click="isSelectingHour = false"
                            >{{ minutesDisplay }}</span>
                        </div>
                        <div v-if="!isHourFormat24" class="b-clockpicker-period">
                            <div
                                class="b-clockpicker-btn"
                                :class="{
                                    active: meridienSelected === amString || meridienSelected === AM
                                }"
                                @click="onMeridienClick(amString)"
                            >
                                {{ amString }}
                            </div>
                            <div
                                class="b-clockpicker-btn"
                                :class="{
                                    active: meridienSelected === pmString || meridienSelected === PM
                                }"
                                @click="onMeridienClick(pmString)"
                            >
                                {{ pmString }}
                            </div>
                        </div>
                    </div>
                </header>
                <div class="card-content">
                    <div
                        class="b-clockpicker-body"
                        :style="{ width: faceSize + 'px', height: faceSize + 'px' }"
                    >
                        <div v-if="!inline" class="b-clockpicker-time">
                            <div
                                class="b-clockpicker-btn"
                                :class="{ active: isSelectingHour }"
                                @click="isSelectingHour = true"
                            >
                                {{ hoursLabel }}
                            </div>
                            <span
                                class="b-clockpicker-btn"
                                :class="{ active: !isSelectingHour }"
                                @click="isSelectingHour = false"
                            >{{ minutesLabel }}</span>
                        </div>
                        <div v-if="!isHourFormat24 && !inline" class="b-clockpicker-period">
                            <div
                                class="b-clockpicker-btn"
                                :class="{
                                    active: meridienSelected === amString || meridienSelected === AM
                                }"
                                @click="onMeridienClick(amString)"
                            >
                                {{ amString }}
                            </div>
                            <div
                                class="b-clockpicker-btn"
                                :class="{
                                    active: meridienSelected === pmString || meridienSelected === PM
                                }"
                                @click="onMeridienClick(pmString)"
                            >
                                {{ pmString }}
                            </div>
                        </div>
                        <b-clockpicker-face
                            :picker-size="faceSize"
                            :min="minFaceValue"
                            :max="maxFaceValue"
                            :face-numbers="isSelectingHour ? hours : minutes"
                            :disabled-values="faceDisabledValues"
                            :double="isSelectingHour && isHourFormat24"
                            :value="isSelectingHour ? hoursSelected : minutesSelected"
                            @input="onClockInput"
                            @change="onClockChange"
                        />
                    </div>
                </div>
                <footer
                    v-if="$slots.default !== undefined && $slots.default().length"
                    class="b-clockpicker-footer card-footer"
                >
                    <slot />
                </footer>
            </div>
        </b-dropdown>
        <b-input
            v-else
            ref="input"
            type="time"
            autocomplete="off"
            :value="formatHHMMSS(computedValue)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :loading="loading"
            :max="formatHHMMSS(maxTime)"
            :min="formatHHMMSS(minTime)"
            :disabled="disabledOrUndefined"
            :readonly="false"
            v-bind="fallthroughAttrs"
            :use-html5-validation="useHtml5Validation"
            @click.stop="toggle(true)"
            @keyup.enter="toggle(true)"
            @change="onChangeNativePicker"
            @focus="handleOnFocus"
            @blur="onBlur() && checkHtml5Validity()"
        />
    </div>
</template>

<script>
import TimepickerMixin from '../../utils/TimepickerMixin'
import config from '../../utils/config'

import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import Input from '../input/Input.vue'
import Field from '../field/Field.vue'
import Icon from '../icon/Icon.vue'

import ClockpickerFace from './ClockpickerFace'

const outerPadding = 12

export default {
    name: 'BClockpicker',
    components: {
        [ClockpickerFace.name]: ClockpickerFace,
        [Input.name]: Input,
        [Field.name]: Field,
        [Icon.name]: Icon,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem
    },
    mixins: [TimepickerMixin],
    props: {
        pickerSize: {
            type: Number,
            default: 290
        },
        incrementMinutes: {
            type: Number,
            default: 5
        },
        autoSwitch: {
            type: Boolean,
            default: true
        },
        type: {
            type: String,
            default: 'is-primary'
        },
        hoursLabel: {
            type: String,
            default: () => config.defaultClockpickerHoursLabel || 'Hours'
        },
        minutesLabel: {
            type: String,
            default: () => config.defaultClockpickerMinutesLabel || 'Min'
        }
    },
    data() {
        return {
            isSelectingHour: true,
            isDragging: false,
            _isClockpicker: true
        }
    },
    computed: {
        hoursDisplay() {
            if (this.hoursSelected == null) return '--'
            if (this.isHourFormat24) return this.pad(this.hoursSelected)

            let display = this.hoursSelected
            if (this.meridienSelected === this.pmString) {
                display -= 12
            }
            if (display === 0) display = 12
            return display
        },
        minutesDisplay() {
            return this.minutesSelected == null ? '--' : this.pad(this.minutesSelected)
        },
        minFaceValue() {
            return this.isSelectingHour &&
                !this.isHourFormat24 &&
                this.meridienSelected === this.pmString
                ? 12
                : 0
        },
        maxFaceValue() {
            return this.isSelectingHour
                ? (
                    !this.isHourFormat24 &&
                    this.meridienSelected === this.amString
                        ? 11
                        : 23
                )
                : 59
        },
        faceSize() {
            return this.pickerSize - (outerPadding * 2)
        },
        faceDisabledValues() {
            return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled
        }
    },
    methods: {
        onClockInput(value) {
            if (this.isSelectingHour) {
                this.hoursSelected = value
                this.onHoursChange(value)
            } else {
                this.minutesSelected = value
                this.onMinutesChange(value)
            }
        },
        onClockChange(value) {
            if (this.autoSwitch && this.isSelectingHour) {
                this.isSelectingHour = !this.isSelectingHour
            }
        },
        onMeridienClick(value) {
            if (this.meridienSelected !== value) {
                this.meridienSelected = value
                this.onMeridienChange(value)
            }
        },
        /*
         * Avoid dropdown toggle when is already visible
         */
        onInputClick(event) {
            if (this.$refs.dropdown.isActive) {
                event.stopPropagation()
            }
        }
    }
}
</script>
