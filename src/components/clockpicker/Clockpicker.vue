<template>
    <div class="b-clockpicker control" :class="[size, type, {'is-expanded': expanded}]">
        <b-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            :position="position"
            :disabled="disabled"
            :inline="inline"
            :append-to-body="appendToBody"
            append-to-body-copy-parent
            @active-change="onActiveChange">
            <b-input
                v-if="!inline"
                ref="input"
                slot="trigger"
                autocomplete="off"
                :value="formatValue(computedValue)"
                :placeholder="placeholder"
                :size="size"
                :icon="icon"
                :icon-pack="iconPack"
                :loading="loading"
                :disabled="disabled"
                :readonly="!editable"
                :rounded="rounded"
                v-bind="$attrs"
                :use-html5-validation="useHtml5Validation"
                @click.native.stop="toggle(true)"
                @keyup.native.enter="toggle(true)"
                @change.native="onChangeNativePicker"
                @focus="handleOnFocus"
                @blur="onBlur() && checkHtml5Validity()"/>
            <div
                class="card"
                :disabled="disabled"
                custom>
                <header v-if="inline" class="card-header">
                    <div class="b-clockpicker-header card-header-title">
                        <div class="b-clockpicker-time">
                            <span
                                class="b-clockpicker-btn"
                                :class="{ active: isSelectingHour }"
                                @click="isSelectingHour = true">{{ hoursDisplay }}</span>
                            <span>:</span>
                            <span
                                class="b-clockpicker-btn"
                                :class="{ active: !isSelectingHour }"
                                @click="isSelectingHour = false">{{ minutesDisplay }}</span>
                        </div>
                        <div v-if="!isHourFormat24" class="b-clockpicker-period">
                            <div
                                class="b-clockpicker-btn"
                                :class="{ active: meridienSelected == AM }"
                                @click="onMeridienClick(AM)">am</div>
                            <div
                                class="b-clockpicker-btn"
                                :class="{ active: meridienSelected == PM }"
                                @click="onMeridienClick(PM)">pm</div>
                        </div>
                    </div>
                </header>
                <div class="card-content">
                    <div
                        class="b-clockpicker-body"
                        :style="{ width: faceSize + 'px', height: faceSize + 'px' }">
                        <div v-if="!inline" class="b-clockpicker-time">
                            <div
                                class="b-clockpicker-btn"
                                :class="{ active: isSelectingHour }"
                                @click="isSelectingHour = true">{{ hoursLabel }}</div>
                            <span
                                class="b-clockpicker-btn"
                                :class="{ active: !isSelectingHour }"
                                @click="isSelectingHour = false">{{ minutesLabel }}</span>
                        </div>
                        <div v-if="!isHourFormat24 && !inline" class="b-clockpicker-period">
                            <div
                                class="b-clockpicker-btn"
                                :class="{ active: meridienSelected == AM }"
                                @click="onMeridienClick(AM)">{{ AM }}</div>
                            <div
                                class="b-clockpicker-btn"
                                :class="{ active: meridienSelected == PM }"
                                @click="onMeridienClick(PM)">{{ PM }}</div>
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
                            @change="onClockChange" />
                    </div>
                </div>
                <footer
                    v-if="$slots.default !== undefined && $slots.default.length"
                    class="b-clockpicker-footer card-footer">
                    <slot/>
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
            :disabled="disabled"
            :readonly="false"
            v-bind="$attrs"
            :use-html5-validation="useHtml5Validation"
            @click.native.stop="toggle(true)"
            @keyup.native.enter="toggle(true)"
            @change.native="onChangeNativePicker"
            @focus="handleOnFocus"
            @blur="onBlur() && checkHtml5Validity()"/>
    </div>
</template>

<script>
import TimepickerMixin from '../../utils/TimepickerMixin'
import config from '../../utils/config'

import Dropdown from '../dropdown/Dropdown'
import DropdownItem from '../dropdown/DropdownItem'
import Input from '../input/Input'
import Field from '../field/Field'
import Icon from '../icon/Icon'

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
        hourFormat: {
            type: String,
            default: '12',
            validator: (value) => {
                return value === '24' || value === '12'
            }
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
            if (this.meridienSelected === this.PM) display -= 12
            if (display === 0) display = 12
            return display
        },
        minutesDisplay() {
            return this.minutesSelected == null ? '--' : this.pad(this.minutesSelected)
        },
        minFaceValue() {
            return this.isSelectingHour &&
                !this.isHourFormat24 &&
            this.meridienSelected === this.PM ? 12 : 0
        },
        maxFaceValue() {
            return this.isSelectingHour
                ? (!this.isHourFormat24 && this.meridienSelected === this.AM ? 11 : 23)
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
        }
    }
}
</script>
