<template>
    <section class="section">
        <div class="container">
            <h1 class="title mb-48">Componentes</h1>

            <hr>
            <h2 class="subtitle">Switch</h2>
            <div class="mb-8">
                <b-switch>Default</b-switch>
                <b-switch disabled>Disabled</b-switch>
                <b-switch disabled checked>Disabled Checked</b-switch>
            </div>
            <div>
                <b-switch is-on-off>On / Off</b-switch>
                <b-switch is-on-off disabled>On / Off Disabled</b-switch>
                <b-switch is-on-off disabled checked>On / Off Disabled Checked</b-switch>
            </div>

            <hr>
            <h2 class="subtitle">Checkbox</h2>
            <b-checkbox v-model="checkbox">{{ checkbox }}</b-checkbox>
            <b-checkbox disabled>Disabled</b-checkbox>
            <b-checkbox disabled checked>Disabled Checked</b-checkbox>

            <hr>
            <h2 class="subtitle">Checkbox Group</h2>
            <b-checkbox-group v-model="checkboxGroup">
                <b-checkbox label="Kobe">Kobe</b-checkbox>
                <b-checkbox label="James">James</b-checkbox>
                <b-checkbox label="Wade">Wade</b-checkbox>
                <b-checkbox label="Kyle" disabled>Kyle</b-checkbox>
            </b-checkbox-group>
            {{ checkboxGroup }}

            <hr>
            <h2 class="subtitle">Radio Group</h2>
            <b-radio-group v-model="radioGroup">
                <b-radio label="Kobe">Kobe</b-radio>
                <b-radio label="James">James</b-radio>
                <b-radio label="Wade">Wade</b-radio>
                <b-radio label="Kyle" disabled>Kyle</b-radio>
            </b-radio-group>
            {{ radioGroup }}

            <hr>
            <h2 class="subtitle">Radio Group — Button</h2>
            <b-radio-group v-model="radioGroupButton">
                <b-radio-button type="is-danger" label="Nop"><b-icon icon="clear"></b-icon>Nop</b-radio-button>
                <b-radio-button type="is-success" label="Yep"><b-icon icon="done"></b-icon>Yep</b-radio-button>
                <b-radio-button label="Default">Default</b-radio-button>
                <b-radio-button label="Disabled" disabled>Disabled</b-radio-button>
            </b-radio-group>
            {{ radioGroupButton }}
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                input: '',
                checkbox: true,
                checkboxGroup: ['Kobe'],
                radioGroup: 'Wade',
                radioGroupButton: 'James'
            }
        }
    }
</script>
