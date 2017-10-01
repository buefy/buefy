<template>
    <div class="container">
        <h1 class="title is-spaced">Constructor options</h1>
        <h2 class="subtitle">These are global default options, which are set on Buefy initialization</h2>

        <hr>

        <div class="example is-paddingless">
            <code-view :code="usage | pre" lang="javascript"></code-view>
        </div>

        <hr>

        <h3 class="subtitle">Options</h3>
        <b-table :data="options" default-sort="name">
            <template scope="props">
                <b-table-column field="name" label="Name">
                    <span v-html="props.row.name"></span>
                </b-table-column>
                <b-table-column field="description" label="Description" width="480">
                    <span v-html="props.row.description"></span>
                </b-table-column>
                <b-table-column field="type" label="Type">
                    <span>{{ props.row.type }}</span>
                </b-table-column>
                <b-table-column field="values" label="Values">
                    <span v-html="props.row.values"></span>
                </b-table-column>
                <b-table-column field="default" label="Default">
                    <span v-html="props.row.default"></span>
                </b-table-column>
            </template>
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
                    defaultContainerElement: '#content',
                    // ...
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
                        name: '<code>defaultContainerElement</code>',
                        description: `Default container attribute for floating Notices (Toasts & Snackbars). Note that this also
                            changes the <code>position</code> of the Notices from <code>fixed</code> to <code>absolute</code>.
                            Meaning that the container <em>should</em> be <code>fixed</code>.`,
                        type: 'String',
                        values: '—',
                        default: '<code>body</code>'
                    },
                    {
                        name: '<code>defaultDialogConfirmText</code>',
                        description: `Default dialog <code>confirmText</code> attribute`,
                        type: 'String',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>defaultDialogCancelText</code>',
                        description: `Default dialog <code>cancelText</code> attribute`,
                        type: 'String',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>defaultSnackbarDuration</code>',
                        description: `Default snackbar <code>duration</code> attribute.`,
                        type: 'Number',
                        values: '—',
                        default: '<code>3500</code>'
                    },
                    {
                        name: '<code>defaultToastDuration</code>',
                        description: `Default toast <code>duration</code> attribute.`,
                        type: 'Number',
                        values: '—',
                        default: '<code>2000</code>'
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
                        name: '<code>defaultTooltipAnimated</code>',
                        description: `Default tooltip <code>animated</code> attribute.`,
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    },
                    {
                        name: '<code>defaultInputAutocomplete</code>',
                        description: `Default input <code>autocomplete</code> attribute.`,
                        type: 'String',
                        values: '<code>on</code>, <code>off</code>',
                        default: '<code>on</code>'
                    },
                    {
                        name: '<code>defaultDateFormatter</code>',
                        description: `Default datepicker <code>date-formatter</code> attribute`,
                        type: 'Function',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>defaultDateParser</code>',
                        description: `Default datepicker <code>date-parser</code> attribute`,
                        type: 'Function',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>defaultDayNames</code>',
                        description: `Default datepicker <code>day-names</code> attribute`,
                        type: 'Array',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>defaultMonthNames</code>',
                        description: `Default datepicker <code>month-names</code> attribute`,
                        type: 'Array',
                        values: '—',
                        default: '<code></code>'
                    },
                    {
                        name: '<code>defaultFirstDayOfWeek</code>',
                        description: `Default datepicker <code>first-day-of-week</code> attribute`,
                        type: 'Number',
                        values: '—',
                        default: '<code></code>'
                    }
                ]
            }
        }
    }
</script>
