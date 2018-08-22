<template>
    <div>
        <b-field grouped class="b-progress">
            <progress
                class="progress control is-expanded"
                :class="cssClass"
                :value="value"
                max="1">
                {{ displayValue }}
            </progress>
            <p class="control" v-if="showText">
                {{ displayValue }}
            </p>
            <b-icon
                v-if="showIcon"
                class="is-left"
                :type="iconColor"
                :icon="icon"/>
        </b-field>
    </div>
</template>

<script>
    export default {
        name: 'BProgress',
        props: {
            value: {
                type: String | Number,
                default: '0',
                max: '1',
                min: '0'
            },
            size: {
                type: String,
                default: null,
                enum: [null, 'is-small', 'is-medium', 'is-large']
            },
            type: {
                type: String,
                default: 'is-primary',
                enum: [null, 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger']
            },
            showIcon: {
                type: Boolean,
                default: true
            },
            showText: {
                type: Boolean,
                default: true
            },
            valueFormatter: {
                type: Function,
                default: (v) => `${Math.floor(v * 100)} %`
            },
            iconChooser: {
                type: Function,
                default: (v) => v >= '1' ? 'check' : 'close'
            },
            iconColorChooser: {
                type: Function,
                default: (v) => v >= '1' ? 'is-success' : 'is-danger'
            },
            colorChooser: {
                type: Function,
                default: (v) => v >= '1' ? 'is-success' : 'is-danger'
            }
        },
        computed: {
            displayValue() {
                return this.valueFormatter(this.value)
            },
            icon() {
                return this.iconChooser(this.value)
            },
            iconColor() {
                return this.iconColorChooser(this.value)
            },
            /**
             * Based one the `type` the color is either dynamically chosen via `colorChooser`
             * if not set the static `type` is used.
             * @returns {String} The "calculated" CSS class.
             */
            cssClass() {
                let cssClass = !this.type ? this.colorChooser(this.value) : this.type
                if (this.size) {
                    cssClass += ' ' + this.size
                }
                return cssClass
            }
        }
    }
</script>
