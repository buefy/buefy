<template>
    <section>
        <b-tooltip position="is-bottom" multilined>
            <button class="button is-primary">Html Content</button>
            <template v-slot:content>
                <b>Lorem ipsum dolor sit amet</b>, consectetur warning elit. <i>Fusce id fermentum quam</i>.
            </template>
        </b-tooltip>

        <b-tooltip type="is-light" :triggers="['click']" :auto-close="['outside', 'escape']">
            <template v-slot:content>
                <b-icon icon="heart" type="is-danger"></b-icon>
                <b-icon icon="thumb-up" type="is-info"></b-icon>
                <b-icon icon="thumb-down" type="is-warning"></b-icon>
                <b-icon icon="emoticon-cool"></b-icon>
            </template>
            <button class="button is-light">Action</button>
        </b-tooltip>
    </section>
</template>
