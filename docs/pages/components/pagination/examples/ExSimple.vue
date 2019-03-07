<template>
    <section>
        <b-field grouped group-multiline>
            <b-field label="Total">
                <b-input type="number" v-model="total"></b-input>
            </b-field>
            <b-field label="Items per page">
                <b-input type="number" v-model="perPage"></b-input>
            </b-field>
            <b-field label="Order">
                <b-select v-model="order">
                    <option value="">default</option>
                    <option value="is-centered">is-centered</option>
                    <option value="is-right">is-right</option>
                </b-select>
            </b-field>
            <b-field label="Size">
                <b-select v-model="size">
                    <option value="">default</option>
                    <option value="is-small">is-small</option>
                    <option value="is-medium">is-medium</option>
                    <option value="is-large">is-large</option>
                </b-select>
            </b-field>
        </b-field>
        <div class="block">
            <b-switch v-model="isSimple">Simple</b-switch>
            <b-switch v-model="isRounded">Rounded</b-switch>
        </div>

        <hr>
        <b-pagination
            :total="total"
            :current.sync="current"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page">
        </b-pagination>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                total: 200,
                current: 1,
                perPage: 20,
                order: '',
                size: '',
                isSimple: false,
                isRounded: false
            }
        }
    }
</script>
