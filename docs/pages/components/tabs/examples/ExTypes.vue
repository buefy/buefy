<template>
    <section>
        <div class="block">
            <b-radio v-model="type" native-value="is-boxed">Boxed</b-radio>
            <b-radio v-model="type" native-value="is-toggle">Toggle</b-radio>
        </div>
        <b-tabs :type="type">
            <b-tab-item label="Pictures" icon="google-photos"></b-tab-item>
            <b-tab-item label="Music" icon="library-music"></b-tab-item>
            <b-tab-item label="Videos" icon="video"></b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                type: 'is-boxed'
            }
        }
    }
</script>
