<template>
    <span>
        <b-icon :icon="icon" pack="fa"></b-icon>
        {{ data }}
    </span>
</template>

<script>
    export default {
        props: {
            data: String
        },
        computed: {
            icon() {
                switch (this.data) {
                    case 'Male': return 'mars'
                    case 'female': return 'venus'
                    default: return 'question'
                }
            }
        }
    }
</script>
