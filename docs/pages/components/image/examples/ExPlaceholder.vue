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
            <b-skeleton
                class="skeleton-placeholder"
                slot="placeholder"
                height="100%"
            ></b-skeleton>
        </b-image>
    </section>
</template>

<style scoped>
/deep/ .b-skeleton {
    height: 100%;
    position: absolute;
    top: 0;
}
</style>
