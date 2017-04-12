<template>
    <p class="control has-icon has-icon-right">
        <slot></slot>
        <span class="select">
            <input
                v-model="search"
                class="input"
                :class="[statusType, size]"
                ref="input"
                type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="!searchable"
                @click="isActive = !isActive"
                @input="input"
                @focus="$emit('focus', $event)"
                @change="$emit('change', selected)">

            <span
                class="box"
                v-show="isActive"
                ref="list">
                <ul>
                    <li class="option"
                        v-for="option in options"
                        @click="select(option)">
                        {{ option.label }}
                    </li>
                </ul>
            </span>

        </span>
    </p>
</template>

<script>
    import Icon from '../icon'

    export default {
        name: 'bSelect',
        components: {
            [Icon.name]: Icon
        },
        props: {
            value: [String, Number],
            size: String,
            placeholder: String,
            disabled: Boolean,
            searchable: Boolean
        },
        data() {
            return {
                options: [],
                selected: null,
                isActive: false,
                search: '',
                isSelectComponent: true // Used internally by Option
            }
        },
        computed: {
            statusType() {
                if (this.$parent.isFieldComponent) {
                    return this.$parent.newType
                }
            }
        },
        methods: {
            select(option) {
                this.selected = option
            },
            input() {
                // ...
            },
            clickedOutside(event) {
                // Close if clicked outside
                if (event.target !== this.$refs.input && event.target !== this.$refs.list) {
                    this.isActive = false
                }
            }
        },
        created() {
            document.addEventListener('click', this.clickedOutside)
        },
        beforeDestroy() {
            document.removeEventListener('click', this.clickedOutside)
        }
    }
</script>
