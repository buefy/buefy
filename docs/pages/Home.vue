<template>
    <section class="section">
        <div class="container">
            <h1 class="title mb-48">Componentes</h1>

            <hr>
            <h2 class="subtitle">Dialog</h2>
            <button class="button" @click="alertDialog">Alert</button>
            <button class="button" @click="alertDialogWTitle">Alert with title</button>

            <br><br>

            <button class="button" @click="confirmDialog">Confirm</button>
            <button class="button" @click="confirmDialogCustom">Confirm customized</button>
            <button class="button" @click="confirmDialogCustomWCallback">Confirm customized with callback</button>

            <hr>
            <h2 class="subtitle">Snackbar</h2>
            <button class="button" @click="snackbar">Default Snackbar</button>
            <button class="button is-info" @click="infoSnackbar">Snackbar Blue Action</button>
            <button class="button is-warning" @click="warningSnackbar">Snackbar Yellow Action</button>
            <button class="button is-danger" @click="dangerSnackbar">Snackbar Red Action</button>

            <hr>
            <h2 class="subtitle">Toast</h2>
            <button class="button" @click="toast">Toast</button>
            <button class="button is-success" @click="successToast">Toast Success</button>
            <button class="button is-danger" @click="dangerToast">Toast Danger</button>

            <hr>
            <h2 class="subtitle">Notification</h2>
            <b-notification>
                Default notification
            </b-notification>

            <b-notification type="is-success">
                Success notification
            </b-notification>

            <b-notification type="is-success" show-icon>
                Success notification with icon
            </b-notification>

            <hr>
            <h2 class="subtitle">Message</h2>
            <b-message title="Hello World">
                Default message
            </b-message>

            <b-message title="Hello World" type="is-danger">
                Danger message
            </b-message>

            <b-message title="Hello World" type="is-danger" show-icon>
                Danger message with icon
            </b-message>

            <b-message type="is-danger">
                Danger message body only — automatically non-closable
            </b-message>

            <hr>
            <h2 class="subtitle">Switch</h2>
            <div class="mb-8">
                <b-switch>Default</b-switch>
                <b-switch disabled>Disabled</b-switch>
                <b-switch disabled checked>Disabled Checked</b-switch>
            </div>
            <div>
                <b-switch is-on-off>On / Off</b-switch>
                <b-switch is-on-off disabled>On / Off Disabled</b-switch>
                <b-switch is-on-off disabled checked>On / Off Disabled Checked</b-switch>
            </div>

            <hr>
            <h2 class="subtitle">Checkbox</h2>
            <b-checkbox v-model="checkbox">{{ checkbox }}</b-checkbox>
            <b-checkbox disabled>Disabled</b-checkbox>
            <b-checkbox disabled checked>Disabled Checked</b-checkbox>

            <hr>
            <h2 class="subtitle">Checkbox Group</h2>
            <b-checkbox-group v-model="checkboxGroup">
                <b-checkbox label="Kobe">Kobe</b-checkbox>
                <b-checkbox label="James">James</b-checkbox>
                <b-checkbox label="Wade">Wade</b-checkbox>
                <b-checkbox label="Kyle" disabled>Kyle</b-checkbox>
            </b-checkbox-group>
            {{ checkboxGroup }}

            <hr>
            <h2 class="subtitle">Radio Group</h2>
            <b-radio-group v-model="radioGroup">
                <b-radio label="Kobe">Kobe</b-radio>
                <b-radio label="James">James</b-radio>
                <b-radio label="Wade">Wade</b-radio>
                <b-radio label="Kyle" disabled>Kyle</b-radio>
            </b-radio-group>
            {{ radioGroup }}

            <hr>
            <h2 class="subtitle">Radio Group — Button</h2>
            <b-radio-group v-model="radioGroupButton">
                <b-radio-button type="is-danger" label="Nop"><b-icon icon="clear"></b-icon>Nop</b-radio-button>
                <b-radio-button type="is-success" label="Yep"><b-icon icon="done"></b-icon>Yep</b-radio-button>
                <b-radio-button label="Default">Default</b-radio-button>
                <b-radio-button label="Disabled" disabled>Disabled</b-radio-button>
            </b-radio-group>
            {{ radioGroupButton }}

            <hr>
            <h2 class="subtitle">Pagination</h2>
            <b-pagination :total="200" :current="pagination" @change="pageChanged"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" position="is-centered"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" position="is-right"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" size="is-small"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" size="is-medium"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" size="is-large"></b-pagination>

            <br>

            <b-pagination :total="200" :current="pagination" @change="pageChanged" simple></b-pagination>

            <hr>
            <h2 class="subtitle">Tooltip</h2>

            <b-tooltip label="Tooltip left" dashed>Dashed tooltip</b-tooltip>

            <br><br>

            <b-tooltip label="Tooltip left" position="is-left">
                <button class="button is-dark">Left</button>
            </b-tooltip>

            <b-tooltip label="Tooltip top">
                <button class="button is-dark">Top (default)</button>
            </b-tooltip>
            <b-tooltip label="Tooltip bottom" position="is-bottom">
                <button class="button is-dark">Bottom</button>
            </b-tooltip>

            <b-tooltip label="Tooltip right" position="is-right">
                <button class="button is-dark">Right</button>
            </b-tooltip>

            <br><br>

            <b-tooltip label="Tooltip small multilined" multilined multiline-size="is-small">
                <button class="button is-dark">Small Multiline</button>
            </b-tooltip>

            <b-tooltip label="Tooltip multilined, probably because it's too long" multilined>
                <button class="button is-dark">Medium Multiline (default)</button>
            </b-tooltip>

            <b-tooltip
                label="Tooltip large multilined, because it's really long to be on a medium size. Did I tell you it's really long? Not sure."
                position="is-bottom"
                multilined
                multiline-size="is-large">
                <button class="button is-dark">Large Bottom Multiline</button>
            </b-tooltip>

            <br><br>

            <b-tooltip label="Maybe you like a little animation" position="is-right" animated>
                <button class="button">Animated</button>
            </b-tooltip>

            <br><br>

            <b-tooltip label="Primary is the default color">
                <button class="button">Default</button>
            </b-tooltip>

            <b-tooltip label="You prefer dark?" type="is-dark">
                <button class="button">Dark</button>
            </b-tooltip>

            <b-tooltip label="Or light?" type="is-light">
                <button class="button">Light</button>
            </b-tooltip>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                checkbox: true,
                checkboxGroup: ['Kobe'],
                radioGroup: 'Wade',
                radioGroupButton: 'James',
                pagination: 1
            }
        },
        methods: {
            pageChanged(value) {
                this.pagination = value
            },
            snackbar() {
                this.$snackbar.open({
                    message: 'Default Snackbar, the button is a green \'OK\' and it closes'
                })
            },
            infoSnackbar() {
                this.$snackbar.open({
                    message: 'Snackbar with blue action and positioned on top',
                    type: 'is-info',
                    actionText: 'Retry',
                    position: 'top',
                    onAction: () => window.alert('Action clicked!')
                })
            },
            warningSnackbar() {
                this.$snackbar.open({
                    message: 'Snackbar with yellow action and positioned on bottom',
                    type: 'is-warning',
                    position: 'bottom'
                })
            },
            dangerSnackbar() {
                this.$snackbar.open({
                    message: 'Snackbar with red action and positioned on top-left',
                    type: 'is-danger',
                    actionText: 'Undo',
                    position: 'top-left'
                })
            },

            toast() {
                this.$toast.open({
                    message: 'Something happened.'
                })
            },
            successToast() {
                this.$toast.open({
                    message: 'Something happened correctly!',
                    type: 'is-success'
                })
            },
            dangerToast() {
                this.$toast.open({
                    message: 'Something\'s not good, also I\'m on bottom.',
                    position: 'bottom',
                    type: 'is-danger'
                })
            },

            alertDialog() {
                this.$dialog.alert({
                    message: 'Everything looks <strong>fine</strong>!'
                })
            },
            alertDialogWTitle() {
                this.$dialog.alert({
                    title: 'Title Alert',
                    message: 'I have a title! And a custom button!',
                    confirmText: 'Cool!'
                })
            },
            confirmDialog() {
                this.$dialog.confirm({
                    message: 'Continue on this task?'
                })
            },
            confirmDialogCustom() {
                this.$dialog.confirm({
                    title: 'Privacy Politics',
                    message: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit, ac scelerisque diam velit in nisl. Nunc maximus ex non laoreet semper. Nunc scelerisque, libero sit amet pretium dignissim, augue purus placerat justo, sit amet porttitor dui metus in nisl. Nulla non leo placerat, porta metus eu, laoreet risus. Etiam lacinia, purus eu luctus maximus, elit ex viverra tellus, sit amet sodales quam dui nec odio. Nullam porta mollis est. Quisque aliquet malesuada fringilla. Pellentesque volutpat lacus at ante posuere, non pulvinar ante porta. Proin viverra eu massa nec porta. Aliquam rhoncus velit quis sem hendrerit, ut dictum nisl accumsan. Maecenas erat enim, scelerisque non ligula ac, eleifend venenatis ligula. Praesent molestie mauris sed elit posuere, non malesuada libero gravida. In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. ',
                    cancelText: 'Disagree',
                    confirmText: 'Agree',
                    type: 'is-success'
                })
            },
            confirmDialogCustomWCallback() {
                this.$dialog.confirm({
                    title: 'Deleting account',
                    message: 'Are you sure you want to <strong>delete</strong> your account? This action cannot be undone.',
                    confirmText: 'Delete Account',
                    type: 'is-danger',
                    showIcon: true,
                    onConfirm: () => {
                        this.$toast.open({
                            message: 'Account deleted!'
                        })
                    }
                })
            }
        }
    }
</script>
