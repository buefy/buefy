<template>
    <section>
        <button class="button is-medium is-info" @click="confirm">
            Launch confirm (default)
        </button>

        <button class="button is-medium is-info" @click="confirmCustom">
            Launch confirm (custom)
        </button>

        <button class="button is-medium is-danger" @click="confirmCustomDelete">
            Launch confirm (custom)
        </button>
    </section>
</template>

<script>
    export default {
        methods: {
            confirm() {
                this.$dialog.confirm({
                    message: 'Continue on this task?',
                    onConfirm: () => this.$toast.open('User confirmed')
                })
            },
            confirmCustom() {
                this.$dialog.confirm({
                    title: 'Privacy Politics',
                    message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Fusce id fermentum quam. Proin sagittis,
                        nibh id hendrerit imperdiet, elit sapien laoreet elit,
                        ac scelerisque diam velit in nisl. Nunc maximus ex non
                        laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim,
                        augue purus placerat justo,
                        sit amet porttitor dui metus in nisl.
                        Nulla non leo placerat, porta metus eu, laoreet risus.
                        Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus,
                        sit amet sodales quam dui nec odio.
                        Nullam porta mollis est. Quisque aliquet malesuada fringilla.
                        Pellentesque volutpat lacus at ante posuere,
                        non pulvinar ante porta. Proin viverra eu massa nec porta.
                        Aliquam rhoncus velit quis sem hendrerit,
                        ut dictum nisl accumsan. Maecenas erat enim, scelerisque non ligula ac,
                        eleifend venenatis ligula.
                        Praesent molestie mauris sed elit posuere, non malesuada libero gravida.
                        In hac habitasse platea dictumst.
                        Pellentesque habitant morbi tristique senectus
                        et netus et malesuada fames ac turpis egestas.`,
                    cancelText: 'Disagree',
                    confirmText: 'Agree',
                    type: 'is-success',
                    onConfirm: () => this.$toast.open('User agreed')
                })
            },
            confirmCustomDelete() {
                this.$dialog.confirm({
                    title: 'Deleting account',
                    message: 'Are you sure you want to <b>delete</b> your account? This action cannot be undone.',
                    confirmText: 'Delete Account',
                    type: 'is-danger',
                    hasIcon: true,
                    onConfirm: () => this.$toast.open('Account deleted!')
                })
            }
        }
    }
</script>
