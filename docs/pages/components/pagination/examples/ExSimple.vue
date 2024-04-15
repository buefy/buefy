<template>
    <section>
        <b-field grouped group-multiline>
            <b-field label="Total">
                <b-input type="number" v-model="total"/>
            </b-field>
            <b-field label="Items per page">
                <b-input type="number" v-model="perPage"/>
            </b-field>
        </b-field>
        <b-field grouped group-multiline>
            <b-field label="Show buttons before current">
                <b-input
                    type="number"
                    v-model="rangeBefore"
                    min="0"
                />
            </b-field>
            <b-field label="Show buttons after current">
                <b-input
                    type="number"
                    v-model="rangeAfter"
                    min="0"
                />
            </b-field>
        </b-field>
        <b-field grouped group-multiline>
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
        <b-field grouped group-multiline>
            <b-field label="Previous icon">
                <b-select v-model="prevIcon">
                    <option value="chevron-left">Chevron</option>
                    <option value="arrow-left">Arrow</option>
                </b-select>
            </b-field>
            <b-field label="Next icon">
                <b-select v-model="nextIcon">
                    <option value="chevron-right">Chevron</option>
                    <option value="arrow-right">Arrow</option>
                </b-select>
            </b-field>
        </b-field>
        <div class="block">
            <b-switch v-model="isSimple">Simple</b-switch>
            <b-switch v-model="isRounded">Rounded</b-switch>
            <b-switch v-model="hasInput">input</b-switch>
        </div>
        <b-field grouped group-multiline>
            <b-field label="Input position">
                <b-select v-model="inputPosition">
                    <option value="">default</option>
                    <option value="is-input-right">is-input-right</option>
                    <option value="is-input-left">is-input-left</option>
                </b-select>
            </b-field>
            <b-field label="Debounce input">
                <b-input
                    type="number"
                    placeholder="milliseconds"
                    v-model="inputDebounce"
                    min="0"
                />
            </b-field>
        </b-field>

        <hr>
        <b-pagination
            :total="total"
            v-model="current"
            :range-before="rangeBefore"
            :range-after="rangeAfter"
            :order="order"
            :size="size"
            :simple="isSimple"
            :rounded="isRounded"
            :per-page="perPage"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            aria-next-label="Next page"
            aria-previous-label="Previous page"
            aria-page-label="Page"
            aria-current-label="Current page"
            :page-input="hasInput"
            :page-input-position="inputPosition"
            :debounce-page-input="inputDebounce"
        />
    </section>
</template>

<script>
export default {
    data() {
        return {
            total: 200,
            current: 10,
            perPage: 10,
            rangeBefore: 3,
            rangeAfter: 1,
            order: '',
            size: '',
            isSimple: false,
            isRounded: false,
            hasInput: false,
            prevIcon: 'chevron-left',
            nextIcon: 'chevron-right',
            inputPosition: '',
            inputDebounce: ''
        }
    }
}
</script>
