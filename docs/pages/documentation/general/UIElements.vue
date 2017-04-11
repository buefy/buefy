<template>
    <div>
        <h1 class="title is-spaced">UI Elements & Layout</h1>
        <h2 class="subtitle">Buefy has the entire Bulma's core built in. You can use any feature from Bulma, plus all the components Buefy offers</h2>
        <hr>

        <p class="content">
            <ul>
                <li><a href="http://bulma.io/documentation/grid/columns/" target="_blank">Grid system</a></li>
                <li><a href="http://bulma.io/documentation/grid/tiles/" target="_blank">Tile system</a></li>
                <li><a href="http://bulma.io/documentation/elements/button/" target="_blank">Button</a></li>
                <li><a href="http://bulma.io/documentation/components/card/" target="_blank">Card</a></li>
                <li><a href="http://bulma.io/documentation/components/nav/" target="_blank">Nav</a></li>
                <li><a href="http://bulma.io/documentation/layout/container/" target="_blank">Container</a></li>
                <li><a href="http://bulma.io/documentation/layout/hero/" target="_blank">Hero</a></li>
                <li><a href="http://bulma.io/documentation/layout/section/" target="_blank">Section</a></li>
                <li><a href="http://bulma.io/documentation/layout/footer/" target="_blank">Footer</a></li>
            </ul>
        </p>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                props: [
                    {
                        name: '<code>type</code>',
                        description: 'Type (color) of the icon, optional',
                        type: 'String',
                        values: `<code>is-white</code>, <code>is-black</code>, <code>is-light</code>,
                            <code>is-dark</code>, <code>is-primary</code>, <code>is-info</code>, <code>is-success</code>,
                            <code>is-warning</code>, <code>is-danger</code>,
                            and any other colors you've set in the <code>$colors</code> list on Sass`,
                        default: '—'
                    },
                    {
                        name: '<code>pack</code>',
                        description: 'Icon pack to use',
                        type: 'String',
                        values: '<code>mdi</code>, <code>fa</code>',
                        default: '<code>mdi</code>'
                    },
                    {
                        name: '<code>icon</code>',
                        description: 'Icon name',
                        type: 'String',
                        values: '—',
                        default: '—'
                    },
                    {
                        name: '<code>size</code>',
                        description: 'Icon size, optional',
                        type: 'String',
                        values: '<code>is-small</code>, <code>is-medium</code>, <code>is-large</code>',
                        default: '—'
                    }
                ],
                template: `
                    <div class="block">
                        <b-icon icon="person"></b-icon>
                        <b-icon icon="home"></b-icon>
                        <b-icon icon="dashboard"></b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            icon="person"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            icon="home"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            icon="dashboard"
                            size="is-medium">
                        </b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            icon="person"
                            size="is-large"
                            type="is-success">
                        </b-icon>
                        <b-icon
                            icon="home"
                            size="is-large"
                            type="is-info">
                        </b-icon>
                        <b-icon
                            icon="dashboard"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                    </div>

                    <button class="button is-dark">
                        <b-icon icon="done"></b-icon>
                        <span>Finish</span>
                    </button>

                    <button class="button is-warning">
                        <b-icon icon="done"></b-icon>
                        <span>Finish</span>
                    </button>`,
                template2: `
                    <div class="block">
                        <b-icon
                            pack="fa"
                            icon="user">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="home">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="dashboard">
                        </b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            pack="fa"
                            icon="user"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="home"
                            size="is-medium">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="dashboard"
                            size="is-medium">
                        </b-icon>
                    </div>

                    <div class="block">
                        <b-icon
                            pack="fa"
                            icon="user"
                            size="is-large"
                            type="is-success">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="home"
                            size="is-large"
                            type="is-info">
                        </b-icon>
                        <b-icon
                            pack="fa"
                            icon="dashboard"
                            size="is-large"
                            type="is-primary">
                        </b-icon>
                    </div>

                    <button class="button is-dark">
                        <b-icon pack="fa" icon="check"></b-icon>
                        <span>Finish</span>
                    </button>

                    <button class="button is-warning">
                        <b-icon pack="fa" icon="check"></b-icon>
                        <span>Finish</span>
                    </button>`
            }
        }
    }
</script>
