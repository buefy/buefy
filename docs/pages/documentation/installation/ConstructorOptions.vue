<template>
    <div>
        <h1 class="title is-spaced">Constructor Options</h1>
        <h2 class="subtitle">These are global default options, they are set on Buefy initialization</h2>

        <hr>

        <h3 class="subtitle">Example</h3>
        <pre v-highlight><code class="javascript">{{ usage }}</code></pre>

        <hr>

        <h3 class="subtitle">Options</h3>
        <b-table
            :data="options"
            default-sort="option"
            html>
            <b-table-column
                field="option"
                label="Option / Key">
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
                usage:
`Vue.use(Buefy, {
    defaultIconPack: 'fa',
    defaultContentElement: '#content',
    ...
})`,
                options: [
                    { option: '<code>defaultIconPack</code>', description: 'Icon pack used internally and on the Icon component — <a href="https://material.io/icons/" target="_blank">Material Design Icons</a> or <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>', type: 'string', values: '<code>mdi</code>, <code>fa</code>', default: '<code>mdi</code>' },
                    { option: '<code>defaultContentElement</code>', description: 'Default container for floating Notices (Toasts & Snackbars). Note that this also changes the <code>position</code> of the Notices from <code>fixed</code> to <code>absolute</code>. Meaning that the container <em>should</em> be <code>fixed</code>.', type: 'string', values: '—', default: '—' }
                ]
            }
        }
    }
</script>
