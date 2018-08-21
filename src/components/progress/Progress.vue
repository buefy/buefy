<template>
    <div>
        <progress
            class="progress"
            :class="type + ' ' + size"
            :value="value"
            max="1"/>
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
            }
        }
    }
</script>
