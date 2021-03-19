<template>
    <b-tabs type="is-boxed">
        <b-tab-item>
            <template #header>
                <b-icon icon="information-outline"></b-icon>
                <span> Issues <b-tag rounded> 3 </b-tag> </span>
            </template>
        </b-tab-item>
        <b-tab-item>
            <template #header>
                <b-icon icon="source-pull"></b-icon>
                <span> Pull Requests <b-tag rounded> {{count}} </b-tag> </span>
            </template>
        </b-tab-item>
    </b-tabs>
</template>

<script>
export default {
    data() {
        return {
            count: 1
        }
    },
    mounted() {
        setTimeout(() => {
            this.count++;
        }, 3 * 1000)
    }
}
</script>

