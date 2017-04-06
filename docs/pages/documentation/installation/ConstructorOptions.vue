<template>
    <div>
        <h1 class="title is-spaced">Constructor Options</h1>
        <h2 class="subtitle">These are global default options, which are set on Buefy initialization</h2>

        <hr>

        <div class="example">
            <pre v-highlight><code class="javascript">{{ usage | pre }}</code></pre>
        </div>

        <hr>

        <h3 class="subtitle">Options</h3>
        <b-table
            :data="options"
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
                usage: `
                    Vue.use(Buefy, {
                        defaultIconPack: 'fa',
                        defaultContentElement: '#content',
                        ...
                    })`,
                options: [
                    {
                        name: '<code>defaultIconPack</code>',
                        description: `Icon pack used internally and on the Icon component attribute —
                            <a href="https://material.io/icons/" target="_blank">Material Design Icons</a> or
                            <a href="http://fontawesome.io/" target="_blank">FontAwesome</a>`,
                        type: 'String',
                        values: '<code>mdi</code>, <code>fa</code>',
                        default: '<code>mdi</code>'
                    },
                    {
                        name: '<code>defaultContentElement</code>',
                        description: `Default container attribute for floating Notices (Toasts & Snackbars). Note that this also
                            changes the <code>position</code> of the Notices from <code>fixed</code> to <code>absolute</code>.
                            Meaning that the container <em>should</em> be <code>fixed</code>.`,
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>defaultTooltipType</code>',
                        description: `Default tooltip type (color) attribute.`,
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '<code>is-primary</code>'
                    },
                    {
                        name: '<code>defaultTooltipIsAnimated</code>',
                        description: `Default tooltip animated attribute.`,
                        type: 'Boolean',
                        values: '<code>false</code>'
                    }
                ]
            }
        }
    }
</script>
