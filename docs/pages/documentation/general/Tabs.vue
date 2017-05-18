<template>
    <div class="container">
        <h1 class="title is-spaced">Tabs</h1>
        <h2 class="subtitle"></h2>
        <hr>

        <b-tabs v-model="active">
            <b-tab-item label="Tab1">
                1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean lectus justo, feugiat sed nulla at, viverra gravida massa.
                Duis vulputate, nisi lobortis pulvinar luctus, enim purus tempus elit, at tristique lorem dui ut arcu.
            </b-tab-item>

            <b-tab-item label="Tab2">
                2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean lectus justo, feugiat sed nulla at, viverra gravida massa.
                Duis vulputate, nisi lobortis pulvinar luctus, enim purus tempus elit, at tristique lorem dui ut arcu.
                Aenean lectus justo, feugiat sed nulla at, viverra gravida massa.
                Duis vulputate, nisi lobortis pulvinar luctus, enim purus tempus elit, at tristique lorem dui ut arcu.
            </b-tab-item>

            <b-tab-item label="Tab3">
                3 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aenean lectus justo, feugiat sed nulla at, viverra gravida massa.
                Duis vulputate, nisi lobortis pulvinar luctus, enim purus tempus elit, at tristique lorem dui ut arcu.
                Aenean lectus justo, feugiat sed nulla at, viverra gravida massa.
                Duis vulputate, nisi lobortis pulvinar luctus, enim purus tempus elit, at tristique lorem dui ut arcu.
                Aenean lectus justo, feugiat sed nulla at, viverra gravida massa.
                Duis vulputate, nisi lobortis pulvinar luctus, enim purus tempus elit, at tristique lorem dui ut arcu.
                Aenean lectus justo, feugiat sed nulla at, viverra gravida massa.
                Duis vulputate, nisi lobortis pulvinar luctus, enim purus tempus elit, at tristique lorem dui ut arcu.
            </b-tab-item>
        </b-tabs>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                active: 0
            }
        }
    }
</script>
