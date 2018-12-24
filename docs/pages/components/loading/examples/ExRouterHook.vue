<template>
    <div>
        <b-field>
            <button class="button is-primary is-medium">
                Launch loading
            </button>
        </b-field>
        <b-field>
            <b-switch>Display loader over full page</b-switch>
        </b-field>
        <b-notification :closable="false">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit sapien laoreet elit
        </b-notification>
    </div>
</template>

<script>
    function fetchData(id) {
        return {
            id: 1,
            firstName: 'John',
            lastName: 'Doe'
        }
    }

    export default {
        beforeRouteEnter(to, from, next) {
            const loading = Vue.prototype.$loading.open();

            fetchData(to.params.id).then(() => {
                next(() => loading.close())
            });
        },
        data() {
            return {
                isFullPage: true,
            }
        }
    }
</script>
