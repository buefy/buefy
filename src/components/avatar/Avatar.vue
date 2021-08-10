<template>
    <div class="avatar">
        <img
            v-if="src"
            :class="'avatar-picture '+ avatarClasses"
            :src="src"
            :alt="alt">
        <div
            v-if="!src && !!label"
            :class="'avatar-text '+ avatarClasses + ' ' + setColorForAvatar"
        >
            <p :class="'label '+ dynamicClass">{{ setText }}</p>
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
            bulmaKnownSizes: ['is-16x16', 'is-24x24', 'is-32x32', 'is-48x48', 'is-64x64', 'is-96x96', 'is-128x128'],
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
        avatarClasses() {
            // check if the size known by bulma
            const avatarSize =
              this.bulmaKnownSizes.includes(this.size) ? this.size : this.defaultAvatarSize
            //
            if (this.rounded && this.size) {
                this.setTextSize()
                return `image is-rounded ${avatarSize}`
            } else if (!this.rounded) {
                this.setTextSize()
                return `image ${avatarSize}`
            }
        },
        setColorForAvatar() {
            if (!this.src && this.label && this.type) {
                // check if the color known by bulma
                const color =
                  this.bulmaKnownColors.includes(this.type) ? this.type : this.defaultVariant
                return color
            } else {
                // set random color if the type wasn't provided
                const color =
                  this.bulmaKnownColors[Math.ceil(Math.random() * 10)] || this.defaultVariant
                return color
            }
        },
        setText() {
            if (!this.src && this.label) {
                return this.label.substr(0, 2).toUpperCase()
            }
        }
    },
    methods: {
        setTextSize: function () {
            const usernameFirstLetters = document.querySelector('.' + this.dynamicClass)
            const bulmaKnownSize =
                this.bulmaKnownSizes.includes(this.size) ? this.size : this.defaultAvatarSize
            // Set the avatar text size relevant to avatar size.
            if (!this.src && !!this.label && usernameFirstLetters !== null) {
                if (bulmaKnownSize === 'is-16x16') {
                    usernameFirstLetters.classList.add('text-size-16x16')
                } else if (bulmaKnownSize === 'is-24x24') {
                    usernameFirstLetters.classList.add('text-size-24x24')
                } else if (bulmaKnownSize === 'is-32x32') {
                    usernameFirstLetters.classList.add('text-size-32x32')
                } else if (bulmaKnownSize === 'is-48x48') {
                    usernameFirstLetters.classList.add('text-size-48x48')
                } else if (bulmaKnownSize === 'is-64x64') {
                    usernameFirstLetters.classList.add('text-size-64x64')
                } else if (bulmaKnownSize === 'is-96x96') {
                    usernameFirstLetters.classList.add('text-size-96x96')
                } else if (bulmaKnownSize === 'is-128x128') {
                    usernameFirstLetters.classList.add('text-size-128x128')
                }
            }
        }
    },
    mounted() {
        this.setTextSize()
    }
}
</script>
