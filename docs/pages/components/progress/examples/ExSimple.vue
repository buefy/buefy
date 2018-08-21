<template>
    <div class="example-component">
        <section>
            <b-progress :value="value"></b-progress>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 0.4
            }
        }
    }
</script>
