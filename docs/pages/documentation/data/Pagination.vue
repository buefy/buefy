<template>
    <div>
        <h1 class="title is-spaced">Constructor Options</h1>
        <h2 class="subtitle">These are global default options, they are set on Buefy initialization</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-field label="Total">
                    <b-input type="number" v-model="total"></b-input>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Items per page">
                    <b-input type="number" v-model="perPage"></b-input>
                </b-field>
            </div>
            <div class="column">
                <p class="control">
                    <label class="label">Position</label>
                    <span class="select is-fullwidth">
                        <select v-model="position">
                            <option value="">default</option>
                            <option value="is-centered">is-centered</option>
                            <option value="is-right">is-right</option>
                        </select>
                    </span>
                </p>
            </div>
            <div class="column">
                <p class="control">
                    <label class="label">Size</label>
                    <span class="select is-fullwidth">
                        <select v-model="size">
                            <option value="">default</option>
                            <option value="is-small">is-small</option>
                            <option value="is-medium">is-medium</option>
                            <option value="is-large">is-large</option>
                        </select>
                    </span>
                </p>
            </div>
            <div class="column switch-container">
                <b-switch v-model="isSimple">Simple</b-switch>
            </div>
        </div>

        <div class="example">
            <b-pagination
                :total="total"
                :current="current"
                :position="position"
                :size="size"
                :simple="isSimple"
                :per-page="perPage"
                @change="pageChanged">
            </b-pagination>
        </div>

        <hr>

        <h3 class="subtitle">Properties</h3>
        <b-table
            :data="props"
            default-sort="name"
            html>
            <b-table-column
                field="name"
                label="Name">
            </b-table-column>
            <b-table-column
                field="description"
                label="Description"
                width="620">
            </b-table-column>
            <b-table-column
                field="type"
                label="Type">
            </b-table-column>
            <b-table-column
                field="values"
                label="Values">
            </b-table-column>
            <b-table-column
                field="default"
                label="Default">
            </b-table-column>
        </b-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                total: 200,
                current: 1,
                perPage: 20,
                position: '',
                size: '',
                isSimple: false,
                props: [
                    {
                        name: '<code>defaultIconPack</code>',
                        description: `Icon pack used internally and on the Icon component —
                            <a href="https://material.io/icons/" target="_blank">Material Design Icons</a> or
                            <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>`,
                        type: 'String',
                        values: '<code>mdi</code>, <code>fa</code>',
                        default: '<code>mdi</code>'
                    },
                    {
                        name: '<code>defaultContentElement</code>',
                        description: `Default container for floating Notices (Toasts & Snackbars). Note that this also
                            changes the <code>position</code> of the Notices from <code>fixed</code> to <code>absolute</code>.
                            Meaning that the container <em>should</em> be <code>fixed</code>.`,
                        type: 'String',
                        values: '—',
                        default: '—'
                    }
                ]
            }
        },
        methods: {
            pageChanged(value) {
                this.current = value
            }
        }
    }
</script>

<style scoped>
    .switch-container {
        flex-direction: column-reverse;
        display: flex;
    }
</style>
