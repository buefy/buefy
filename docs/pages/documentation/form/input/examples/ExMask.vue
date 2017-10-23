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
            <b-input placeholder="Custom"
                v-model="value"
                v-cleave="masks.custom"
                @input.native="(event) => rawValue = event.target._vCleave.getRawValue()" />
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
     * is bound or updated, and destroy it when it's unbound.
     */
    const cleave = {
        name: 'cleave',
        bind(el, binding) {
            const input = el.querySelector('input')
            input._vCleave = new Cleave(input, binding.value)
        },
        update(el, binding) {
            const input = el.querySelector('input')
            input._vCleave.destroy()
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
        }
    }
</script>
