<template>
    <div class="avatar">
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
import config from '../../utils/config'
// Defaults  size: 48x48, variant: has-background-primary rounded: true

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
            default: config.defaultAvatarRounded
        },
        size: {
            type: String,
            default: config.defaultAvatarSize
        },
        variant: String
    },
    data() {
        return {
            defaultAvatarSize: config.defaultAvatarSize,
            defaultVariant: config.defaultAvatarVariant,
            defaultAvatarRounded: config.defaultAvatarRounded,
            allowedTextSizes: {
                // Text sizes are used to be compatible to appropriate avatar size
                // specified by the user
                size16: '0.5rem', // 8px
                size24: '0.625rem', // 10px
                size32: '0.9375rem', // 15px
                size48: '1.20rem', // 19.2px
                size64: '1.525rem', // 24.4px
                size96: '2.1rem', // 33.6px
                size128: '2.8125rem' // 45px
            },
            bulmaKnownSizes: ['16x16', '24x24', '32x32', '48x48', '64x64', '96x96', '128x128'],
            bulmaKnownColors: [
                'has-background-black',
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
            const bulmaKnownSize =
              this.bulmaKnownSizes.includes(this.size) ? this.size : this.defaultAvatarSize
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
                const bulmaKnownColor =
                  this.bulmaKnownColors.includes(this.variant) ? this.variant : this.defaultVariant
                return bulmaKnownColor
            } else {
                // Generate random color if the variant wasn't provided
                const variant =
                  this.bulmaKnownColors[Math.ceil(Math.random() * 10)] || this.defaultVariant
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
            const bulmaKnownSize =
                this.bulmaKnownSizes.includes(this.size) ? this.size : this.defaultAvatarSize
            // Set the avatar text size according to avatar size.
            if (!this.src && !!this.username && usernameFirstLetters !== null) {
                if (bulmaKnownSize === '16x16') {
                    usernameFirstLetters.style.fontSize = this.allowedTextSizes.size16
                } else if (bulmaKnownSize === '24x24') {
                    usernameFirstLetters.style.fontSize = this.allowedTextSizes.size24
                } else if (bulmaKnownSize === '32x32') {
                    usernameFirstLetters.style.fontSize = this.allowedTextSizes.size32
                } else if (bulmaKnownSize === '48x48') {
                    usernameFirstLetters.style.fontSize = this.allowedTextSizes.size48
                } else if (bulmaKnownSize === '64x64') {
                    usernameFirstLetters.style.fontSize = this.allowedTextSizes.size64
                } else if (bulmaKnownSize === '96x96') {
                    usernameFirstLetters.style.fontSize = this.allowedTextSizes.size96
                } else if (bulmaKnownSize === '128x128') {
                    usernameFirstLetters.style.fontSize = this.allowedTextSizes.size128
                }
                return `set`
            } else { return `not set` }
        }
    },
    created() {
    },
    mounted() {
        this.calculateTextSize()
    },
    beforeDestroy() {
    }
}
</script>

<style lang="css" scoped>
</style>
