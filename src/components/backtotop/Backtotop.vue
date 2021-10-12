<template>
    <div>
        <b-button
            icon-pack="ionicons"
            icon-left="arrow-round-up"
            @click="backToTop"
            v-bind="$attrs"
        >
            <slot />
        </b-button>
    </div>
</template>

<script>
export default {

    name: 'BBacktotop',

    inheritAttrs: false,

    props: {
        position: {
            type: String,
            default: ''
        },
        fixed: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {

        }
    },
    methods: {
        backToTop: () => {
            window.alert('It works!')
        }
    }
}
</script>
