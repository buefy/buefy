<template>
    <section>
        <b-field>
            <b-input
                placeholder="Credit Card"
                v-cleave="masks.creditCard">
            </b-input>
        </b-field>

        <b-field>
            <b-input
                placeholder="Numeral"
                v-cleave="masks.numeral">
            </b-input>
        </b-field>

        <b-field :addons="false">
            <b-input
                placeholder="Custom"
                :value="value"
                v-cleave="masks.custom"
                @input.native="onInput">
            </b-input>
            <p><b>Formatted value (v-model)</b>: {{ value }}</p>
            <p><b>Raw value</b>: {{ rawValue }}</p>
        </b-field>
    </section>
</template>

<script>
    // You have to install cleave.js to use it:
    // 'npm install cleave.js'
    import Cleave from 'cleave.js'

    /**
     * We add a new instance of Cleave when the element
     * is bound and destroy it when it's unbound.
     */
    const cleave = {
        name: 'cleave',
        bind(el, binding) {
            const input = el.querySelector('input')
            input._vCleave = new Cleave(input, binding.value)
        },
        unbind(el) {
            const input = el.querySelector('input')
            input._vCleave.destroy()
        }
    }

    export default {
        directives: { cleave },
        data() {
            return {
                value: '',
                rawValue: '',
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
        methods: {
            onInput(event) {
                this.rawValue = event.target._vCleave.getRawValue()
                this.value = event.target._vCleave.getFormattedValue()
            }
        }
    }
</script>
