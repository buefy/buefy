<template>
    <div class="container">
        <h1 class="title is-spaced">Notification</h1>
        <h2 class="subtitle">Bold notification blocks to alert your users of something</h2>
        <hr>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-simple/>
                </div>
            </div>
            <div class="column">
                <CodeView :code="ExSimpleCode" />
            </div>
        </div>

        <hr>

        <h2 class="title">Types</h2>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-types/>
                </div>
            </div>
            <div class="column">
                <CodeView :code="ExTypesCode" />
            </div>
        </div>

        <hr>

        <h2 class="title">Icons</h2>

        <div class="columns">
            <div class="column">
                <div class="example">
                    <ex-icons/>
                </div>
            </div>
            <div class="column">
                <CodeView :code="ExIconsCode" />
            </div>
        </div>

        <hr>
        <h2 class="title is-spaced">API</h2>
        <ApiView :data="api" />
    </div>
</template>

<script>
    import api from '@/apis/apiNotification'

    import ExSimple from '@/examples/notification/ExSimple'
    import ExSimpleCode from '!!raw-loader!@/examples/notification/ExSimple'

    import ExTypes from '@/examples/notification/ExTypes'
    import ExTypesCode from '!!raw-loader!@/examples/notification/ExTypes'

    import ExIcons from '@/examples/notification/ExIcons'
    import ExIconsCode from '!!raw-loader!@/examples/notification/ExIcons'

    export default {
        components: {
            ExSimple,
            ExTypes,
            ExIcons
        },
        data() {
            return {
                api,
                ExSimpleCode,
                ExTypesCode,
                ExIconsCode
            }
        }
    }
</script>
