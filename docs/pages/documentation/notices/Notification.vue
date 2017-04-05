<template>
    <div>
        <h1 class="title is-spaced">Notification</h1>
        <h2 class="subtitle">Bold notification blocks, to alert your users of something</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <b-notification>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-notification>

                <b-notification type="is-success">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-notification>

                <b-notification type="is-danger">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-notification>

                <b-notification type="is-info" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-notification>

                <b-notification type="is-success" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-notification>

                <b-notification type="is-warning" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-notification>

                <b-notification type="is-danger" has-icon>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
                </b-notification>
            </div>
            <div class="column">
                <pre class="content" v-highlight><code class="html">{{ template }}</code></pre>
            </div>
        </div>

        <hr>

        <h2 class="subtitle">Properties</h2>
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

        <hr>

        <h2 class="subtitle">Events</h2>
        <b-table
            :data="events"
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
                field="parameters"
                label="Parameters">
            </b-table-column>
        </b-table>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                props: [
                    {
                        name: '<code>type</code>',
                        description: 'Color scheme',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>, <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>, <code>is-warning</code>, <code>is-danger</code>, and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '—'
                    },
                    {
                        name: '<code>closable</code>',
                        description: 'If the notification can be closed',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>true</code>'
                    },
                    {
                        name: '<code>hasIcon</code>',
                        description: 'Adds an icon on the left side depending on the <code>type</code>',
                        type: 'Boolean',
                        values: '—',
                        default: '<code>false</code>'
                    }
                ],
                events: [
                    {
                        name: '<code>close</code>',
                        description: 'When user closes the notification',
                        parameters: '—'
                    }
                ],
                template:
`<b-notification>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
</b-notification>

<b-notification type="is-success">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
</b-notification>

<b-notification type="is-danger">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
</b-notification>

<b-notification type="is-info" has-icon>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
</b-notification>

<b-notification type="is-success" has-icon>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
</b-notification>

<b-notification type="is-warning" has-icon>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
</b-notification>

<b-notification type="is-danger" has-icon>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
</b-notification>`
            }
        }
    }
</script>
