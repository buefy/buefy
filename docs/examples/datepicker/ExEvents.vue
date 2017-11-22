<template>
    <span>
        <b-field>
            <b-switch v-model="bars">Bars</b-switch>
        </b-field>
        <b-datepicker
            inline
            v-model="date" 
            :events="events"
            :indicators="indicators"
            >
        </b-datepicker>
    </span>
</template>

<script>
    export default {
        computed: {
            indicators() {
                return this.bars ? 'bars' : 'dots'
            }
        },
        data() {
            return {
                date: new Date(2017, 10, 1),
                events: [
                    '11/02/2017',
                    new Date(2017, 10, 4),
                    '11/06/2017',
                    {
                        date: new Date(2017, 10, 8),
                        type: 'is-danger'
                    },
                    {
                        date: new Date(2017, 10, 10),
                        type: 'is-success'
                    },
                    {
                        date: new Date(2017, 10, 10),
                        type: 'is-link'
                    },
                    new Date(2017, 10, 12),
                    {
                        date: new Date(2017, 10, 12),
                        type: 'is-warning'
                    },
                    {
                        date: new Date(2017, 10, 16),
                        type: 'is-danger'
                    },
                    new Date(2017, 10, 20),
                    {
                        date: new Date(2017, 10, 29),
                        type: 'is-success'
                    },
                    {
                        date: new Date(2017, 10, 29),
                        type: 'is-warning'
                    },
                    {
                        date: new Date(2017, 10, 29),
                        type: 'is-info'
                    }
                ],
                bars: false
            }
        }
    }
</script>
