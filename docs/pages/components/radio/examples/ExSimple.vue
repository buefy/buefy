<template>
    <section>
        <div class="block">
            <b-radio v-model="radio"
                native-value="Flint">
                Flint
            </b-radio>
            <b-radio v-model="radio"
                native-value="Silver">
                Silver
            </b-radio>
            <b-radio v-model="radio"
                native-value="Jack">
                Jack
            </b-radio>
            <b-radio v-model="radio"
                native-value="Vane"
                disabled>
                Vane
            </b-radio>
        </div>
        <p class="content">
            <b>Selection:</b>
            {{ radio }}
        </p>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                radio: 'Jack'
            }
        }
    }
</script>
