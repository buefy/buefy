<template>
    <div>
        <Example :component="ExSimple" :code="ExSimpleCode"/>

        <Example :component="ExObjArray" :code="ExObjArrayCode" title="Object array"/>

        <Example :component="ExHeader" :code="ExHeaderCode" title="Header">
            <p>You can add your custom header to the autocomplete.</p>
        </Example>

        <Example :component="ExFooter" :code="ExFooterCode" title="Footer">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.7.6</span>
            </div>
            <p>You can add your custom footer to the autocomplete.</p>
        </Example>

        <Example :component="ExGroups" :code="ExGroupsCode" title="Groups">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.9.2</span>
            </div>
            <p>You can show options by groups</p>
        </Example>
        
        <Example :component="ExKeepFirst" :code="ExKeepFirstCode" title="Keep First">
            <div class="tags has-addons">
                <span class="tag is-success">Since</span>
                <span class="tag is-info">0.9.9</span>
            </div>
            <p>You can select the first option when pressing enter or tab with <code>keep-first</code>.</p>
            <p>Additionally, use <code>select-on-click-outside</code> to automatically select the first element when clicking outside of
                the <code>input</code> element.</p>
        </Example>
        
        <Example :component="ExCustomAsync" :code="ExCustomAsyncCode" title="Async with custom template">
            <p>You can have a custom template by adding a scoped slot to it.</p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small>.</p>
        </Example>

        <Example :component="ExInfiniteScroll" :code="ExInfiniteScrollCode" title="Async with infinite scroll">
            <p>With <code>check-infinite-scroll</code> and <code>infinite-scroll</code> event you can listen to the end of the scroll list to implement an infinite scroll strategy.</p>
            <p><small>API from <a href="https://www.themoviedb.org" target="_blank">TMDb</a></small>.</p>
        </Example>

        <ApiView :data="api"/>
        <VariablesView :data="variables"/>
    </div>
</template>

<script>
    import api from './api/autocomplete'
    import variables from './variables/autocomplete'

    import ExSimple from './examples/ExSimple'
    import ExSimpleCode from '!!raw-loader!./examples/ExSimple'

    import ExObjArray from './examples/ExObjArray'
    import ExObjArrayCode from '!!raw-loader!./examples/ExObjArray'

    import ExHeader from './examples/ExHeader'
    import ExHeaderCode from '!!raw-loader!./examples/ExHeader'

    import ExFooter from './examples/ExFooter'
    import ExFooterCode from '!!raw-loader!./examples/ExFooter'

    import ExGroups from './examples/ExGroups'
    import ExGroupsCode from '!!raw-loader!./examples/ExGroups'

    import ExCustomAsync from './examples/ExCustomAsync'
    import ExCustomAsyncCode from '!!raw-loader!./examples/ExCustomAsync'

    import ExInfiniteScroll from './examples/ExInfiniteScroll'
    import ExInfiniteScrollCode from '!!raw-loader!./examples/ExInfiniteScroll'
    
    import ExKeepFirst from './examples/ExKeepFirst'
    import ExKeepFirstCode from '!!raw-loader!./examples/ExKeepFirst'

    export default {
        data() {
            return {
                api,
                variables,
                ExSimple,
                ExSimpleCode,
                ExObjArrayCode,
                ExObjArray,
                ExHeader,
                ExHeaderCode,
                ExFooter,
                ExFooterCode,
                ExCustomAsyncCode,
                ExCustomAsync,
                ExInfiniteScroll,
                ExInfiniteScrollCode,
                ExGroups,
                ExGroupsCode,
                ExKeepFirst,
                ExKeepFirstCode
            }
        }
    }
</script>
