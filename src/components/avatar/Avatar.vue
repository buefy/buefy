<template>
    <div class="avatar">
        <section
            v-if="src"
            :class="'avatar-picture '+ avatarClasses"
        >
            <b-image
                :src="src"
                :src-fallback="srcFallback"
                :webp-fallback="webpFallback"
                :alt="alt"
                :rounded="rounded"
            />
        </section>
        <section
            v-if="!src && !!label"
            :class="'avatar-text '+ avatarClasses + ' ' + setColorForAvatar"
        >
            <p :class="'label '+ dynamicClass">{{ setText }}</p>
        </section>
    </div>
</template>

<script>
import BImage from '../image/Image'
import config from '../../utils/config'

export default {
    name: 'BAvatar',
    components: {
        BImage
    },
    props: {
        src: String,
        srcFallback: String,
        webpFallback: String,
        label: String,
        alt: {
            type: String,
            default: () => {
                return 'This is avatar for the user'
            }
        },
        rounded: {
            type: Boolean,
            default: () => {
                return config.defaultAvatarRounded
            }
        },
        size: {
            type: String,
            default: () => {
                return config.defaultAvatarSize
            }
        },
        type: {
            type: String,
            default: () => {
                return config.defaultAvatarVariant
            }
        }
    },
    data() {
        return {
            defaultAvatarRounded: config.defaultAvatarRounded,
            defaultAvatarSize: config.defaultAvatarSize,
            defaultVariant: config.defaultAvatarVariant,
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
                return `is-rounded ${avatarSize}`
            } else if (!this.rounded) {
                this.setTextSize()
                return `${avatarSize}`
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
            const label = document.querySelector('.' + this.dynamicClass)
            const textSize =
                this.bulmaKnownSizes.includes(this.size) ? this.size : this.defaultAvatarSize

            // Set the avatar text size relevant to avatar size.
            if (!this.src && !!this.label && label !== null) {
                /*
                <textResolution> returns just resolution (eg: 16x16; 48x48; 64x64)
                instead of full bulma class (eg: is-16x16; is-48x48; is-64x64)
                */
                const textResolution = textSize.substr(3)

                label.classList.add(`text-size-${textResolution}`)
            }
        }
    },
    mounted() {
        this.setTextSize()
    }
}
</script>
