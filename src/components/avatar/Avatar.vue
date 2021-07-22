<template>
    <div class="avatar">
        <!-- <img class="image rounded" src="http://getdrawings.com/free-icon/male-avatar-icon-52.png"> -->
        <img
            v-if="src"
            :class="imgClasses"
            :src="src"
            :alt="alt">

        <!-- display username's first letters -->
        <div
            v-if="!src && !!username"
            :class="imgClasses + ' ' + generateBgColorForAvatar"
        >
            <p class="username-first-letters">{{ setText }}</p>
        </div>
    </div>
</template>

<script>
// import config from '../../utils/config'
// import { isWebpSupported } from '../../utils/helpers'

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
        avatarColor: String
    },
    data() {
        return {
            textSizes: {
                // Text sizes are used to be compatible to appropriate avatar size
                // specified by the user
                size16: '8px',
                size24: '10px',
                size32: '15px',
                size48: '20px',
                size64: '30px',
                size96: '40px',
                size128: '45px'
            },
            bulmaKnownSize: ['16x16', '24x24', '32x32', '48x48', '64x64', '96x96', '128x128']
        }
    },
    computed: {
        imgClasses() {
            if (this.rounded && this.size) {
                this.calculateTextSize()
                return `image rounded is-${this.size}`
            } else if (!this.rounded) {
                this.calculateTextSize()
                return `image is-${this.size}`
            }
        },
        generateBgColorForAvatar() {
            if (!this.src && this.username && this.avatarColor) {
                return `avatar-username`
            } else {
                return ``
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
            // Set the avatar text size according to avatar size.
            if (!this.src && !!this.username && usernameFirstLetters !== null) {
                if (this.size === '16x16') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size16
                } else if (this.size === '24x24') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size24
                } else if (this.size === '32x32') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size32
                } else if (this.size === '48x48') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size48
                } else if (this.size === '64x64') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size64
                } else if (this.size === '96x96') {
                    usernameFirstLetters.style.fontSize = this.textSizes.size96
                } else if (this.size === '128x128') {
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
    .rounded {
        border-radius: 50%;
    }
    .avatar-username {
        background-color: black;
    }
    .username-first-letters {
        color: white;
        text-align: center;
        font-weight: bolder;
        /* Center the text horizontally and vertically */
        margin-left: auto;
        margin-right: auto;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        /* Disable selecting the text */
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
