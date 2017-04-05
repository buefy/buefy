<template>
    <section class="section">
        <div class="container">
            <h1 class="title mb-48">Componentes</h1>

            <hr>
            <b-field label="Username" type="is-success" message="Your username is available">
                <b-input type="email" value="johnsilver" maxlength="30">
                    <b-icon icon="person"></b-icon>
                </b-input>
            </b-field>

            <b-field label="Username" type="is-danger" message="Your username is unavailable">
                <b-input type="email" value="flint" maxlength="30"></b-input>
            </b-field>

            <b-field addons>
                <b-input v-model="input" placeholder="Search...">
                    <b-icon icon="search"></b-icon>
                </b-input>
                <p class="control"><button class="button is-primary">Search</button></p>
            </b-field>

            <b-field>
                <b-input v-model="input" placeholder="Search..." expanded></b-input>
                <p class="control"><button class="button is-primary">Search</button></p>
            </b-field>

            <b-field><b-input maxlength="200" type="textarea"></b-input></b-field>

            <b-field><b-input value="loading" loading><b-icon icon="person"></b-icon></b-input></b-field>

            <b-field><b-input type="password" value="teste" password-reveal></b-input></b-field>

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

            <hr>
            <h2 class="subtitle">Pagination</h2>
            <b-pagination :total="200" :current="pagination" @change="pageChanged"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" position="is-centered"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" position="is-right"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" size="is-small"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" size="is-medium"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" size="is-large"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" simple></b-pagination>
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
                radioGroupButton: 'James',
                pagination: 1
            }
        },
        methods: {
            pageChanged(value) {
                this.pagination = value
            }
        }
    }
</script>
