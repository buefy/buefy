<template>
    <div>
        <h1 class="title is-spaced">Toast</h1>
        <h2 class="subtitle">Toasts are simple text messages to inform the user</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <p class="content">They have a slightly transparency and are queued — they queue with <router-link to="/documentation/notices/snackbar">Snackbars</router-link> as well — to not confuse the user.</p>
                <button class="button" @click="toast">Toast (default)</button>
                <button class="button is-success" @click="success">Toast (success)</button>
                <button class="button is-danger" @click="danger">Toast (danger & bottom)</button>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template }}</code></pre>
                <pre v-highlight><code class="javascript">{{ code }}</code></pre>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                template:
`<button class="button" @click="toast">Toast (default)</button>
<button class="button is-success" @click="success">Toast (success)</button>
<button class="button is-danger" @click="danger">Toast (danger & bottom)</button>`,
                code:
`export default {
    methods: {
        toast() {
            this.$toast.open({
                message: 'Something happened.'
            })
        },
        success() {
            this.$toast.open({
                message: 'Something happened correctly!',
                type: 'is-success'
            })
        },
        danger() {
            this.$toast.open({
                message: 'Something\\'s not good, also I\\'m on bottom.',
                position: 'bottom',
                type: 'is-danger'
            })
        }
    }
}`
            }
        },
        methods: {
            toast() {
                this.$toast.open({
                    message: 'Something happened.'
                })
            },
            success() {
                this.$toast.open({
                    message: 'Something happened correctly!',
                    type: 'is-success'
                })
            },
            danger() {
                this.$toast.open({
                    message: 'Something\'s not good, also I\'m on bottom.',
                    position: 'bottom',
                    type: 'is-danger'
                })
            }
        }
    }
</script>
