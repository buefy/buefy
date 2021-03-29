<template>
    <section>
        <b-pagination
            :total="200"
            v-model="current"
            :per-page="10">

            <template #default="props">
                <b-pagination-button
                    :page="props.page"
                    :id="`page${props.page.number}`"
                    tag="router-link"
                    :to="`/documentation/pagination#page${props.page.number}`">
                    {{ convertToRoman(props.page.number) }}
                </b-pagination-button>
            </template>


            <template #previous="props">
                <b-pagination-button
                    :page="props.page"
                    tag="router-link"
                    :to="`/documentation/pagination#page${props.page.number}`">
                    Previous
                </b-pagination-button>
            </template>

            <template #next="props">
                <b-pagination-button
                    :page="props.page"
                    tag="router-link"
                    :to="`/documentation/pagination#page${props.page.number}`">
                    Next
                </b-pagination-button>
            </template>

        </b-pagination>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                current: 10,
                basicRomanNumeral: ['',
                    'I','II','III','IV','V','VI','VII','VIII','IX','',
                    'X','XX','XXX','XL','L','LX','LXX','LXXX','XC','',
                    'C','CC','CCC','CD','D','DC','DCC','DCCC','CM','',
                    'M','MM','MMM'
                ]
            }
        },
        methods: {
            convertToRoman(num) {
                const numArray = num.toString().split('');
                const base = numArray.length;
                let count = base-1;
                const convertedRoman = numArray.reduce((roman, digit) => {
                    const digitRoman = this.basicRomanNumeral[+digit + count*10];
                    const result = roman + digitRoman;
                    count -= 1;
                    return result;
                },'');
                return convertedRoman;
            }
        },
        watch: {
            $route: {
                immediate: true,
                handler(newVal, oldVal) {
                    if (newVal.hash) {
                        this.current = parseInt(newVal.hash.replace(/\#page/g, ''))
                    }
                },
            },
        }
    }
</script>
