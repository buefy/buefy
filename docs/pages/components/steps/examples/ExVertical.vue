<template>
    <section>
        <b-field grouped>
            <b-field grouped>
                <b-switch v-model="position" true-value="is-right"> Right position </b-switch>
            </b-field>
            <b-field label="Size">
                <b-select v-model="size" placeholder="Size">
                    <option :value="null">Default</option>
                    <option value="is-small">Small</option>
                    <option value="is-medium">Medium</option>
                    <option value="is-large">Large</option>
                </b-select>
            </b-field>
            <b-field label="Label position">
                <b-select v-model="labelPosition">
                    <option value="bottom">Bottom</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </b-select>
            </b-field>
        </b-field>

        <b-steps
            :position="position"
            :label-position="labelPosition"
            :size="size"
            vertical>
            <b-step-item label="Account" icon="account-key">
                Account: Lorem ipsum dolor sit amet. <br />
                Account: Lorem ipsum dolor sit amet. <br />
                Account: Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item label="Profile" icon="account">
                Profile: Lorem ipsum dolor sit amet. <br />
                Profile: Lorem ipsum dolor sit amet.? <br />
                Profile: Lorem ipsum dolor sit amet. <br />
                Profile: Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item label="Social" icon="account-plus" disabled>
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet. <br />
                Social: Lorem ipsum dolor sit amet.
            </b-step-item>
        </b-steps>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                labelPosition: 'bottom',
                position: null,
                size: null,
            }
        }
    }
</script>
