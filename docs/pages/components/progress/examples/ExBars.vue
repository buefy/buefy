<template>
    <section>
        <b-progress format="percent" :max="80">
            <template #bar>
                <b-progress-bar :value="10" show-value></b-progress-bar>
                <b-progress-bar :value="20" type="is-primary" show-value></b-progress-bar>
                <b-progress-bar :value="30" type="is-warning" show-value></b-progress-bar>
            </template>
        </b-progress>
        <b-progress size="is-medium" type="is-success" show-value>
            <template #bar>
                <b-progress-bar :value="10"></b-progress-bar>
                <b-progress-bar :value="20" type="is-primary"></b-progress-bar>
                <b-progress-bar :value="30" type="is-warning">Wow!</b-progress-bar>
            </template>
        </b-progress>
        <b-progress :rounded="false" size="is-large">
            <template #bar>
                <b-progress-bar :value="10" show-value></b-progress-bar>
                <b-progress-bar :value="20" type="is-primary" show-value></b-progress-bar>
                <b-progress-bar :value="30" type="is-warning"></b-progress-bar>
            </template>
        </b-progress>
    </section>
</template>
