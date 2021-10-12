<template>
    <div class="avatar">
        <section
            v-if="src"
            class="avatar-picture"
            :class="avatarClasses"
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
            class="avatar-text"
            :class="avatarClasses"
        >
            <p
                class="label"
                :class="dynamicClass"
            >
                {{ setText }}
            </p>
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
            dynamicClass: this.label + this.size + Math.ceil(Math.random() * 10)
        }
    },
    computed: {
        avatarClasses() {
            this.setTextSize()
            return {
                'is-rounded': this.rounded,
                [this.size]: true,
                [this.type]: !this.src && this.label
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
            // Set the avatar text size relevant to avatar size.
            if (!this.src && !!this.label && label !== null) {
                /*
                <avatarResolution> returns just resolution (eg: 16x16; 48x48; 64x64)
                instead of full bulma class (eg: is-16x16; is-48x48; is-64x64)
                */
                const avatarResolution = this.size.substr(3)

                label.classList.add(`text-size-${avatarResolution}`)
            }
        }
    },
    mounted() {
        this.setTextSize()
    }
}
</script>
