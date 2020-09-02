<template>
    <section>
        <b-progress format="percent" :max="80">
            <b-progress-bar slot="bar" :value="10" show-value></b-progress-bar>
            <b-progress-bar slot="bar" :value="20" type="is-primary" show-value></b-progress-bar>
            <b-progress-bar slot="bar" :value="30" type="is-warning" show-value></b-progress-bar>
        </b-progress>
        <b-progress size="is-medium" type="is-success" show-value>
            <b-progress-bar slot="bar" :value="10"></b-progress-bar>
            <b-progress-bar slot="bar" :value="20" type="is-primary"></b-progress-bar>
            <b-progress-bar slot="bar" :value="30" type="is-warning">Wow!</b-progress-bar>
        </b-progress>
        <b-progress size="is-large">
            <b-progress-bar slot="bar" :value="10" show-value></b-progress-bar>
            <b-progress-bar slot="bar" :value="20" type="is-primary" show-value></b-progress-bar>
            <b-progress-bar slot="bar" :value="30" type="is-warning"></b-progress-bar>
        </b-progress>
    </section>
</template>
