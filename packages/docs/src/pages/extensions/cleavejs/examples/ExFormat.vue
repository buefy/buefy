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
                @input="onInput">
            </b-input>
            <p><b>Formatted value (v-model)</b>: {{ value }}</p>
            <p><b>Raw value</b>: {{ rawValue }}</p>
        </b-field>
    </section>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import type { Directive } from 'vue'
    // You have to install cleave.js to use it:
    // 'npm install cleave.js'
    // 'npm install --save-dev @types/cleave.js'
    import Cleave from 'cleave.js'
    import type { CleaveOptions } from 'cleave.js/options'

    import { BField, BInput } from '@ntohq/buefy-next'

    interface CleaveContainer extends HTMLInputElement {
        _vCleave: Cleave
    }

    /**
     * We add a new instance of Cleave when the element
     * is bound and destroy it when it's unbound.
     */
    const cleave: Directive<HTMLElement, CleaveOptions> = {
        beforeMount(el, binding) {
            const input = el.querySelector('input') as CleaveContainer
            input._vCleave = new Cleave(input, binding.value)
        },
        unmounted(el) {
            const input = el.querySelector('input') as CleaveContainer
            input._vCleave.destroy()
        }
    }

    export default defineComponent({
        components: {
            BField,
            BInput
        },
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
            onInput(event: InputEvent) {
                this.rawValue = (event.target as unknown as CleaveContainer)._vCleave.getRawValue()
                this.value = (event.target as unknown as CleaveContainer)._vCleave.getFormattedValue()
            }
        }
    })
</script>
