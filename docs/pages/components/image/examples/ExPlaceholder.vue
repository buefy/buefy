<template>
    <section>
        <b-image
            src="https://picsum.photos/800/450"
            placeholder="/static/img/icons/favicon-32x32.png"
            ratio="16by9"
        ></b-image>
        <br>
        <b-image
            src="https://picsum.photos/800/450"
            ratio="16by9"
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
