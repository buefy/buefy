<template>
    <section>
        <div class="example-component">
            <b-field grouped group-multiline>
                <div class="control">
                    <b-switch v-model="arrow">Arrow</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="arrowHover" :disabled="!arrow">Arrow on hover</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="drag">Drag event</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="gray" :disabled="opacity">Grayscale</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="opacity" :disabled="gray">Opacity</b-switch>
                </div>
                <div class="control">
                    <b-switch v-model="repeat">Repeat</b-switch>
                </div>
            </b-field>
            <b-field grouped group-multiline>
                <b-field label="Value">
                    <b-numberinput v-model="values" min="0" :max="items.length - 1" controls-position="compact"/>
                </b-field>
                <b-field label="Items to Show">
                    <b-numberinput v-model="perList" min="1" :max="items.length" controls-position="compact"/>
                </b-field>
                <b-field label="Items to List">
                    <b-numberinput v-model="increment" min="1" :max="items.length - 1" controls-position="compact"/>
                </b-field>
            </b-field>
        </div>
        <b-carousel-list
            v-model="values"
            :data="items"
            :arrow="arrow"
            :arrow-hover="arrowHover"
            :items-to-show="perList"
            :items-to-list="increment"
            :repeat="repeat"
            :has-drag="drag"
            :has-grayscale="gray"
            :has-opacity="opacity" />
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BCarouselList, BField, BNumberinput, BSwitch } from '@ntohq/buefy-next'

export default defineComponent({
    components: {
        BCarouselList,
        BField,
        BNumberinput,
        BSwitch
    },
    data() {
        return {
            arrow: true,
            arrowHover: true,
            drag: true,
            gray: false,
            opacity: false,
            values: 1,
            perList: 4,
            increment: 1,
            repeat: false,
            items: [
                {
                    alt: 'Slide 1',
                    title: 'Slide 1',
                    image: 'https://picsummm.photos/id/0/1230/500',
                    srcFallback: 'https://picsum.photos/id/0/1230/500'
                },
                {
                    title: 'Slide 2',
                    image: 'https://picsum.photos/id/1/1230/500'
                },
                {
                    title: 'Slide 3',
                    image: 'https://picsum.photos/id/2/1230/500'
                },
                {
                    title: 'Slide 4',
                    image: 'https://picsum.photos/id/3/1230/500'
                },
                {
                    title: 'Slide 5',
                    image: 'https://picsum.photos/id/4/1230/500'
                },
                {
                    title: 'Slide 6',
                    image: 'https://picsum.photos/id/5/1230/500'
                },
                {
                    title: 'Slide 7',
                    image: 'https://picsum.photos/id/6/1230/500'
                },
                {
                    title: 'Slide 8',
                    image: 'https://picsum.photos/id/7/1230/500'
                }
            ]
        }
    }
})
</script>
