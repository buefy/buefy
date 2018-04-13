<template>
    <div class="clock-picker is-info">
        <b-dropdown
            v-if="!isMobile || inline"
            ref="dropdown"
            :position="position"
            :disabled="disabled"
            :inline="inline">
            <b-input
                v-if="!inline"
                ref="input"
                slot="trigger"
                autocomplete="off"
                :value="formatValue(dateSelected)"
                :placeholder="placeholder"
                :size="size"
                :icon="icon"
                :icon-pack="iconPack"
                :loading="loading"
                :disabled="disabled"
                :readonly="readonly"
                :rounded="rounded"
                v-bind="$attrs"
                @change.native="onChange($event.target.value)"
                @focus="$emit('focus', $event)"
                @blur="$emit('blur', $event) && checkHtml5Validity()"/>

            <div
                class="card"
                style="height: auto;"
                :disabled="disabled"
                custom>
                <header v-if="inline" class="card-header">
                    <div class="clock-picker__header card-header-title">
                        <div class="clock-picker__time">
                            <span
                                class="clock-picker__btn"
                                :class="{ active: isSelectingHour }"
                                @click="isSelectingHour = true">{{ hoursDisplay }}</span>
                            <span>:</span>
                            <span
                                class="clock-picker__btn"
                                :class="{ active: !isSelectingHour }"
                                @click="isSelectingHour = false">{{ minutesDisplay }}</span>
                        </div>
                        <div v-if="!isHourFormat24" class="clock-picker__period">
                            <div
                                class="clock-picker__btn"
                                :class="{ active: meridienSelected == AM }"
                                @click="onMeridienClick(AM)">am</div>
                            <div
                                class="clock-picker__btn"
                                :class="{ active: meridienSelected == PM }"
                                @click="onMeridienClick(PM)">pm</div>
                        </div>
                    </div>
                </header>
                <div
                    class="clock-picker__body"
                    :style="{ width: (pickerSize - 20) + 'px', height: (pickerSize - 20) + 'px' }">
                    <div v-if="!isHourFormat24 && !inline" class="clock-picker__period">
                        <div
                            class="clock-picker__btn"
                            :class="{ active: meridienSelected == AM }"
                            @click="onMeridienClick(AM)">{{ AM }}</div>
                        <div
                            class="clock-picker__btn"
                            :class="{ active: meridienSelected == PM }"
                            @click="onMeridienClick(PM)">{{ PM }}</div>
                    </div>
                    <b-clockpicker-face
                        v-if="isSelectingHour"
                        :picker-size="pickerSize"
                        :min="minFaceValue"
                        :max="maxFaceValue"
                        :face-numbers="hours"
                        :disabled-values="faceDisabledValues()"
                        :double="isSelectingHour && isHourFormat24"
                        :value="hoursSelected"
                        @input="onClockInput"
                        @change="onClockChange" />
                    <b-clockpicker-face
                        v-else
                        :picker-size="pickerSize"
                        :min="minFaceValue"
                        :max="maxFaceValue"
                        :face-numbers="minutes"
                        :disabled-values="faceDisabledValues()"
                        :value="minutesSelected"
                        @input="onClockInput"
                        @change="onClockChange" />
                <!-- {{ value }}<br>
                    {{ dateSelected }} -->
                </div>
                <footer
                    v-if="$slots.default !== undefined && $slots.default.length"
                    class="card-footer">
                    <slot/>
                </footer>
            </div>
        </b-dropdown>
    </div>

</template>

<script>
import { default as TimepickerMixin } from '../../utils/TiimepickerMixin'

import ClockpickerFace from './ClockpickerFace'
import { Dropdown, DropdownItem } from '../dropdown'
import Input from '../input'
import Field from '../field'
import Icon from '../icon'

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
            default: () => this.HOUR_FORMAT_12,
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
            default: false
        }
    },
    data() {
        return {
            isSelectingHour: true,
            isDragging: false
        }
    },
    computed: {
        hoursDisplay() {
            if (this.hoursSelected == null) return '--'
            if (this.isHourFormat24) return this.pad(this.hoursSelected)
            if (this.meridienSelected === this.PM) return this.hoursSelected - 12
            return this.hoursSelected
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
        faceFormatter() {
            return this.isSelectingHour && !this.isHourFormat24
                ? (val) => val
                : this.formatNumber
        }
    },
    methods: {
        onClockInput(value) {
            // console.log('onClockInput: ', value)
            if (this.isSelectingHour) {
                this.hoursSelected = value
                this.onHoursChange(value)
            } else {
                this.minutesSelected = value
                this.onMinutesChange(value)
            }
        },
        onClockChange(value) {
            // console.log('onClockChange: ', value)
            // if (this.isSelectingHour) {
            //     this.hoursSelected = value
            // } else {
            //     this.minutesSelected = value
            // }
            if (this.autoSwitch || !this.inline) {
                this.isSelectingHour = !this.isSelectingHour
            }
        },
        onMeridienClick(value) {
            if (this.meridienSelected !== value) {
                this.meridienSelected = value
                this.onMeridienChange(value)
            }
        },
        faceDisabledValues() {
            return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled
        },
        formatNumber(value) {
            return this.isSelectingHour && !this.isHourFormat24
                ? value
                : this.pad(value)
        },
        pad(value) {
            return (value < 10 ? '0' : '') + value
        }
    },
    created() {
        this.incrementMinutes = 5
    }
}
</script>

<style>

</style>
