<template>
    <section>
        <b-image
            src="https://picsum.photos/id/1074/800/400"
            placeholder="/static/img/icons/favicon-32x32.png"
            ratio="2by1"
        ></b-image>
        <br>
        <b-image
            src="https://picsum.photos/id/237/800/400"
            placeholder="https://picsum.photos/id/237/200/100?blur=10"
            ratio="2by1"
        ></b-image>
        <br>
        <b-image
            src="https://picsum.photos/id/1062/800/400"
            ratio="2by1"
        >
            <template #placeholder>
                <b-skeleton
                    class="skeleton-placeholder"
                    height="100%"
                ></b-skeleton>
            </template>
        </b-image>
    </section>
</template>

<style scoped>
/* >>> and /deep/ are deprecated on Vue 3.
 * https://github.com/vuejs/rfcs/blob/master/active-rfcs/0023-scoped-styles-changes.md
 */
::v-deep(.b-skeleton) {
    height: 100%;
    position: absolute;
    top: 0;
}
</style>
