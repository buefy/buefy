<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    created(): any {
        this.$buefy.dialog
    },
    methods: {
        test(): string {
            console.log(this);
            return '';
        }
    }
})
</script>
