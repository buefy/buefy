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
            >
                {{ nameLetters }}
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
    data() {},
    computed: {
        avatarClasses() {
            return {
                'is-rounded': this.rounded,
                [this.size]: true,
                [this.type]: !this.src && this.label
            }
        },
        nameLetters() {
            if (!this.src && this.label) {
                return this.label.substr(0, 2).toUpperCase()
            }
        }
    }
}
</script>
