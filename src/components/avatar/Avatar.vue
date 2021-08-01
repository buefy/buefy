<template>
    <div class="avatar">
        <img
            v-if="src"
            :class="'avatar-picture '+ imgClasses"
            :src="src"
            :alt="alt">
        <div
            v-if="!src && !!label"
            :class="'avatar-text '+ imgClasses + ' ' + generateBgColorForAvatar"
        >
            <p :class="'label-first-letters '+ dynamicClass">{{ setText }}</p>
        </div>
    </div>
</template>

<script>
import config from '../../utils/config'

export default {
    name: 'BAvatar',
    props: {
        src: String,
        label: String,
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
        type: String
    },
    data() {
        return {
            defaultAvatarSize: config.defaultAvatarSize,
            defaultVariant: config.defaultAvatarVariant,
            defaultAvatarRounded: config.defaultAvatarRounded,
            dynamicClass: this.label + this.size + Math.ceil(Math.random() * 10),
            allowedTextSizes: {
                // Text sizes are used to be compatible to appropriate avatar size
                // specified by the user
                size16: '0.5rem',
                size24: '0.625rem',
                size32: '0.9375rem',
                size48: '1.20rem',
                size64: '1.525rem',
                size96: '2.1rem',
                size128: '2.8125rem'
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
            if (!this.src && this.label && this.type) {
                // check if the size known by bulma
                const bulmaKnownColor =
                  this.bulmaKnownColors.includes(this.type) ? this.type : this.defaultVariant
                return bulmaKnownColor
            } else {
                // Generate random color if the type wasn't provided
                const type =
                  this.bulmaKnownColors[Math.ceil(Math.random() * 10)] || this.defaultVariant
                return type
            }
        },
        setText() {
            if (!this.src && this.label) {
                return this.label.substr(0, 2).toUpperCase()
            } else {
                return ``
            }
        }
    },
    methods: {
        calculateTextSize: function () {
            const usernameFirstLetters = document.querySelector('.' + this.dynamicClass)
            const bulmaKnownSize =
                this.bulmaKnownSizes.includes(this.size) ? this.size : this.defaultAvatarSize
            // Set the avatar text size according to avatar size.
            if (!this.src && !!this.label && usernameFirstLetters !== null) {
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
