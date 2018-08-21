<template>
    <div class="example-component">
        <section>
            <b-field grouped>
                <b-field label="Value">
                    <b-input v-model="value" type="number" step="0.1"></b-input>
                </b-field>
                <b-field label="Type">
                    <b-select placeholder="Select a type" v-model="type">
                        <option
                            v-for="option in types"
                            :value="option"
                            :key="option">
                            {{ option }}
                        </option>
                    </b-select>
                </b-field>
                <b-field label="Size">
                    <b-select placeholder="Select a size" v-model="size">
                        <option
                            v-for="option in sizes"
                            :value="option"
                            :key="option">
                            {{ option }}
                        </option>
                    </b-select>
                </b-field>
            </b-field>
            <b-field label="Progress" :addons="false">
                <b-progress :value="value" :type="type" :size="size"></b-progress>
            </b-field>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 0.4,
                type: 'is-primary',
                size: null,
                types: [null, 'is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'],
                sizes: [null, 'is-small', 'is-medium', 'is-large']
            }
        }
    }
</script>
