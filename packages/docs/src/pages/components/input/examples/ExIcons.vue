<template>
    <section>
        <h3 class="subtitle">With Material Design Icons</h3>
        <b-field>
            <b-input placeholder="Search..."
                type="search"
                icon="magnify"
                icon-clickable
                @icon-click="searchIconClick">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Email"
                v-model="email"
                type="email"
                icon="email"
                icon-right="close-circle"
                icon-right-clickable
                @icon-right-click="clearIconClick">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Credit card"
                icon="credit-card">
            </b-input>
        </b-field>

        <h3 class="subtitle">With FontAwesome</h3>
        <b-field>
            <b-input placeholder="Search..."
                type="search"
                icon-pack="fas"
                icon="search">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Email"
                type="email"
                icon-pack="fas"
                icon="envelope">
            </b-input>
        </b-field>

        <b-field>
            <b-input placeholder="Credit card"
                icon-pack="far"
                icon="credit-card">
            </b-input>
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                email: '',
            }
        },
        methods: {
            searchIconClick() {
                alert('You wanna make a search?')
            },
            clearIconClick() {
                this.email = '';
                alert('Email cleared!')
            }
        }
    }
</script>
