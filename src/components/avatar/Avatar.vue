<template>
    <div class="avatar">
        <!-- <img class="image rounded" src="http://getdrawings.com/free-icon/male-avatar-icon-52.png"> -->
        <img
            v-if="src"
            :class="'avatar-picture '+ imgClasses"
            :src="src"
            :alt="alt">

        <!-- display username's first letters -->
        <div
            v-if="!src && !!username"
            :class="'avatar-text '+ imgClasses + ' ' + generateBgColorForAvatar"
        >
            <p class="username-first-letters">{{ setText }}</p>
        </div>
    </div>
</template>

<script>
// import config from '../../utils/config'

export default {
    name: 'BAvatar',
    props: {
        src: String,
        username: String,
        alt: {
            type: String,
            default: 'This is avatar for the user'
        },
        rounded: {
            type: Boolean,
            default: true
        },
        size: {
            type: String,
            default: '48x48'
        },
        variant: String
    },
    data() {
        return {
            textSizes: {
                // Text sizes are used to be compatible to appropriate avatar size
                // specified by the user
                size16: '0.5rem', // 8px
                size24: '0.625rem', // 10px
                size32: '0.9375rem', // 15px
                size48: '1.25rem', // 20px
                size64: '1.875rem', // 30px
                size96: '2.5rem', // 40px
                size128: '2.8125rem' // 45px
            },
            bulmaKnownSizes: ['16x16', '24x24', '32x32', '48x48', '64x64', '96x96', '128x128'],
            bulmaKnownColors: [
                'has-background-white',
                'has-background-black',
                'has-background-light',
                'has-background-dark',
                'has-background-primary',
                'has-background-link',
                'has-background-info',
                'has-background-success',
                'has-background-warning',
                'has-background-danger'
            ]
        }
    },
    computed: {
        imgClasses() {
            // check if the size known by bulma
            const bulmaKnownSize = this.bulmaKnownSizes.includes(this.size) ? this.size : '48x48'
            //
            if (this.rounded && this.size) {
                this.calculateTextSize()
                return `image rounded is-${bulmaKnownSize}`
            } else if (!this.rounded) {
                this.calculateTextSize()
                return `image is-${bulmaKnownSize}`
            }
        },
        generateBgColorForAvatar() {
            if (!this.src && this.username && this.variant) {
                // check if the size known by bulma
                const bulmaKnownColor = this.bulmaKnownColors.includes(this.variant) ? this.variant : 'has-background-link'
                return bulmaKnownColor
            } else {
                // Generate random color if the variant wasn't provided
                const variant = this.bulmaKnownColors[Math.floor(Math.random() * 10)]
                return variant
            }
        },
        setText() {
            if (!this.src && this.username) {
                return this.username.substr(0, 2).toUpperCase()
            } else {
                return ``
            }
        }
    },
    methods: {
        calculateTextSize: function () {
            const usernameFirstLetters = document.querySelector('.username-first-letters')
            const bulmaKnownSize = this.bulmaKnownSizes.includes(this.size) ? this.size : '48x48'
            // Set the avatar text size according to avatar size.
            if (!this.src && !!this.username && usernameFirstLetters !== null) {
                if (bulmaKnownSize === '16x16') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size16
                } else if (bulmaKnownSize === '24x24') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size24
                } else if (bulmaKnownSize === '32x32') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size32
                } else if (bulmaKnownSize === '48x48') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size48
                } else if (bulmaKnownSize === '64x64') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size64
                } else if (bulmaKnownSize === '96x96') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size96
                } else if (bulmaKnownSize === '128x128') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size128
                }
                return `set`
            } else { return `Waiting to inlclude username and exclude src...` }
        }
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {

    }
}
</script>

<style lang="css" scoped>
</style>
