<template>
    <div>
        <b-field grouped class="b-progress">
            <progress
                class="progress control is-clearfix is-expanded"
                :class="type + ' ' + size"
                :value="value"
                max="1">
                {{ displayValue }}
            </progress>
            <p class="control" v-if="showText">
                {{ displayValue }}
            </p>
        </b-field>
    </div>
</template>

<script>
    export default {
        name: 'BProgress',
        props: {
            value: {
                type: Number,
                default: 0,
                max: 1,
                min: 0
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
                // no validation to allow custom bulma classes
            },
            showText: {
                type: Boolean,
                default: true
            },
            valueFormatter: {
                type: Function,
                default: (v) => `${Math.floor(v * 100)} %`
            }
        },
        computed: {
            displayValue() {
                return this.valueFormatter(this.value)
            }
        }
    }
</script>
