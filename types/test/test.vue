<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
    created(): any {
        this.$dialog
    },
    methods: {
        test(): string {
            console.log(this);
            return '';
        }
    }
})
</script>
