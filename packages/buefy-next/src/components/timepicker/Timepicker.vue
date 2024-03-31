<template>
    <div
        class="timepicker control"
        :class="[size, {'is-expanded': expanded}]"
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
                        :model-value="formatValue(computedValue)"
                        :placeholder="placeholder"
                        :size="size"
                        :icon="icon"
                        :icon-pack="iconPack"
                        :loading="loading"
                        :disabled="disabledOrUndefined"
                        :readonly="!editable || undefined"
                        :rounded="rounded"
                        v-bind="fallthroughAttrs"
                        :use-html5-validation="useHtml5Validation"
                        @keyup.enter="toggle(true)"
                        @change="onChange($event.target.value)"
                        @focus="handleOnFocus"
                    />
                </slot>
            </template>

            <b-dropdown-item
                :disabled="disabledOrUndefined"
                :focusable="focusable"
                custom
            >
                <b-field grouped position="is-centered">
                    <b-select
                        v-model="hoursSelected"
                        @change="onHoursChange($event.target.value)"
                        :disabled="disabledOrUndefined"
                        placeholder="00"
                    >
                        <option
                            v-for="hour in hours"
                            :value="hour.value"
                            :key="hour.value"
                            :disabled="isHourDisabled(hour.value) || undefined"
                        >
                            {{ hour.label }}
                        </option>
                    </b-select>
                    <span class="control is-colon">{{ hourLiteral }}</span>
                    <b-select
                        v-model="minutesSelected"
                        @change="onMinutesChange($event.target.value)"
                        :disabled="disabledOrUndefined"
                        placeholder="00"
                    >
                        <option
                            v-for="minute in minutes"
                            :value="minute.value"
                            :key="minute.value"
                            :disabled="isMinuteDisabled(minute.value) || undefined"
                        >
                            {{ minute.label }}
                        </option>
                    </b-select>
                    <template v-if="enableSeconds">
                        <span class="control is-colon">{{ minuteLiteral }}</span>
                        <b-select
                            v-model="secondsSelected"
                            @change="onSecondsChange($event.target.value)"
                            :disabled="disabledOrUndefined"
                            placeholder="00"
                        >
                            <option
                                v-for="second in seconds"
                                :value="second.value"
                                :key="second.value"
                                :disabled="isSecondDisabled(second.value) || undefined"
                            >
                                {{ second.label }}
                            </option>
                        </b-select>
                        <span class="control is-colon">{{ secondLiteral }}</span>
                    </template>
                    <b-select
                        v-model="meridienSelected"
                        @change="onMeridienChange($event.target.value)"
                        v-if="!isHourFormat24"
                        :disabled="disabledOrUndefined"
                    >
                        <option
                            v-for="meridien in meridiens"
                            :value="meridien"
                            :key="meridien"
                        >
                            {{ meridien }}
                        </option>
                    </b-select>
                </b-field>

                <footer
                    v-if="$slots.default !== undefined"
                    class="timepicker-footer"
                >
                    <slot />
                </footer>
            </b-dropdown-item>
        </b-dropdown>

        <b-input
            v-else
            ref="input"
            type="time"
            :step="nativeStep"
            autocomplete="off"
            :model-value="formatHHMMSS(computedValue)"
            :placeholder="placeholder"
            :size="size"
            :icon="icon"
            :icon-pack="iconPack"
            :rounded="rounded"
            :loading="loading"
            :max="formatHHMMSS(maxTime)"
            :min="formatHHMMSS(minTime)"
            :disabled="disabledOrUndefined"
            :readonly="false"
            v-bind="fallthroughAttrs"
            :use-html5-validation="useHtml5Validation"
            @change="onChange($event.target.value)"
            @focus="handleOnFocus"
            @blur="onBlur() && checkHtml5Validity()"
        />
    </div>
</template>

<script>
import TimepickerMixin from '../../utils/TimepickerMixin'
import Dropdown from '../dropdown/Dropdown.vue'
import DropdownItem from '../dropdown/DropdownItem.vue'
import Input from '../input/Input.vue'
import Field from '../field/Field.vue'
import Select from '../select/Select.vue'
import Icon from '../icon/Icon.vue'

export default {
    name: 'BTimepicker',
    components: {
        [Input.name]: Input,
        [Field.name]: Field,
        [Select.name]: Select,
        [Icon.name]: Icon,
        [Dropdown.name]: Dropdown,
        [DropdownItem.name]: DropdownItem
    },
    mixins: [TimepickerMixin],
    data() {
        return {
            _isTimepicker: true
        }
    },
    computed: {
        nativeStep() {
            if (this.enableSeconds) {
                return '1'
            } else {
                return undefined
            }
        }
    }
}
</script>
