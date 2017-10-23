<template>
    <section>
        <b-field>
            <b-input placeholder="Credit Card"
                v-cleave="masks.creditCard" />
        </b-field>

        <b-field>
            <b-input placeholder="Numeral"
                v-cleave="masks.numeral" />
        </b-field>

        <b-field :addons="false">
            <b-input ref="customInput"
                placeholder="Custom"
                v-model="custom"
                v-cleave="masks.custom" />
            <p><b>v-model</b>: {{ custom }}</p>
            <p><b>Raw value</b>: {{ rawCustom }}</p>
        </b-field>
    </section>
</template>

<script>
    // You have to install cleave.js to use it:
    // 'npm install cleave.js'
    import Cleave from 'cleave.js'

    /**
     * We add a new instance of Cleave when the element
     * is bound or updated, and destroy it when it's unbound.
     */
    const cleave = {
        name: 'cleave',
        bind(el, binding) {
            const input = el.querySelector('input')
            el._vCleave = new Cleave(input, binding.value)
        },
        update(el, binding) {
            const input = el.querySelector('input')
            el._vCleave.destroy()
            el._vCleave = new Cleave(input, binding.value)
        },
        unbind(el) {
            el._vCleave.destroy()
        }
    }

    export default {
        directives: { cleave },
        data() {
            return {
                custom: '',
                rawCustom: '',
                masks: {
                    creditCard: { creditCard: true },
                    numeral: {
                        numeral: true,
                        numeralThousandsGroupStyle: 'thousand',
                        prefix: '$ '
                    },
                    custom: {
                        delimiters: ['.', '.', '-'],
                        blocks: [3, 3, 3, 2],
                        numericOnly: true
                    }
                }
            }
        },
        watch: {
            custom() {
                this.rawCustom = this.$refs
                    .customInput
                    .$el
                    ._vCleave
                    .getRawValue()
            }
        }
    }
</script>
