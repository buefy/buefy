<template>
    <section>
        <b-field grouped>
            <b-switch v-model="isRounded">Rounded</b-switch>
            <b-switch v-model="isOutlined">Outlined</b-switch>
        </b-field>
        <b-field label="Type">
            <b-select expanded v-model="type" placeholder="Type">
                <option value="null">Default</option>
                <option value="is-primary">Primary</option>
                <option value="is-success">Success</option>
                <option value="is-warning">Warning</option>
                <option value="is-danger">Danger</option>
            </b-select>
        </b-field>
        <b-field label="Passive Type">
            <b-select expanded v-model="passiveType" placeholder="Passive Type">
                <option value="null">Default</option>
                <option value="is-primary">Primary</option>
                <option value="is-success">Success</option>
                <option value="is-warning">Warning</option>
                <option value="is-danger">Danger</option>
            </b-select>
        </b-field>
        <b-field label="Size">
            <b-select expanded v-model="size">
                <option value="">Default</option>
                <option value="is-small">is-small</option>
                <option value="is-medium">is-medium</option>
                <option value="is-large">is-large</option>
            </b-select>
        </b-field>
        <b-switch
            :rounded="isRounded"
            :outlined="isOutlined"
            :size="size"
            :type="type"
            :passive-type='passiveType'>Sample</b-switch>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                size: '',
                type: null,
                passiveType: null,
                isRounded: false,
                isOutlined: false,
            }
        }
    }
</script>
