<template>
    <section>
        <div style="padding: 1.5rem">
            <b-field grouped group-multiline position="is-centered">
                <b-switch v-model="arrow">Arrow</b-switch>
                <b-switch v-model="arrowHover" :disabled="!arrow">Arrow on hover</b-switch>
                <b-switch v-model="drag">Drag event</b-switch>
                <b-switch v-model="gray" :disabled="opacity">Grayscale</b-switch>
                <b-switch v-model="opacity" :disabled="gray">Opacity</b-switch>
                <b-switch v-model="repeat">Repeat</b-switch>
            </b-field><br>
            <b-field grouped group-multiline position="is-centered">
                <b-field label="Value">
                    <b-numberinput v-model="values" min="0" :max="items.length - 1" controls-position="compact"/>
                </b-field>
                <b-field label="Items to List">
                    <b-numberinput v-model="perList" min="0" :max="items.length - 1" controls-position="compact"/>
                </b-field>
            </b-field>
        </div>
        <b-carousel-list
            v-model="values"
            :data="items"
            :arrow="arrow"
            :arrowHover="arrowHover"
            :itemsToList="perList"
            :repeat="repeat"
            :has-drag="drag"
            :has-grayscale="gray"
            :has-opacity="opacity" />
    </section>
</template>

<script>
export default {
    data() {
        return {
            arrow: true,
            arrowHover: true,
            drag: true,
            gray: false,
            opacity: false,
            values: 1,
            perList: 1,
            repeat: false,
            items: [
                {
                    title: 'Slide 1',
                    image: 'https://picsum.photos/id/0/1230/500'
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
}
</script>
