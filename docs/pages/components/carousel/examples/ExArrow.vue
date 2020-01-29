<template>
    <section>
        <div style="padding: 1.5rem">
            <b-field grouped group-multiline position="is-centered">
                <b-switch v-model="arrow"><strong>Arrow</strong></b-switch>
                <b-switch v-model="arrowBoth" :disabled="!arrow">Both</b-switch>
                <b-switch v-model="arrowHover" :disabled="!arrow">Hover</b-switch>
            </b-field><br>
            <b-field grouped group-multiline position="is-centered">
                <b-field label="Icon Pack">
                    <b-input v-model="iconPack" placeholder="e.g. mdi, fa or other"/>
                </b-field>
                <b-field label="Icon Size">
                    <b-select v-model="iconSize">
                        <option value="">default</option>
                        <option value="is-small">is-small</option>
                        <option value="is-medium">is-medium</option>
                        <option value="is-large">is-large</option>
                    </b-select>
                </b-field>
                <b-field label="Icon Prev">
                    <b-input v-model="iconPrev"/>
                </b-field>
                <b-field label="Icon Next">
                    <b-input v-model="iconNext"/>
                </b-field>
            </b-field>
        </div>

        <b-carousel
            :arrow="arrow"
            :arrow-both="arrowBoth"
            :arrow-hover="arrowHover"
            :icon-pack="iconPack"
            :icon-prev="iconPrev"
            :icon-next="iconNext"
            :icon-size="iconSize">
            <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                <section :class="`hero is-medium is-${carousel.color}`">
                    <div class="hero-body has-text-centered">
                        <h1 class="title">{{carousel.title}}</h1>
                    </div>
                </section>
            </b-carousel-item>
        </b-carousel>
    </section>
</template>

<script>
export default {
    data() {
        return {
            arrow: true,
            arrowBoth: false,
            arrowHover: false,
            iconPack: 'mdi',
            iconPrev: 'arrow-left',
            iconNext: 'arrow-right',
            iconSize: '',
            carousels: [
                { title: 'Slide 1', color: 'info' },
                { title: 'Slide 2', color: 'success' },
                { title: 'Slide 3', color: 'warning' },
                { title: 'Slide 4', color: 'danger' }
            ]
        }
    }
}
</script>
