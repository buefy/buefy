<template>
    <section>
        <h3 class="subtitle">With Material Design Icons</h3>
        <b-field>
            <b-select placeholder="Country" icon="earth">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </b-select>
        </b-field>

        <b-field>
            <b-select placeholder="Client" icon="account">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </b-select>
        </b-field>

        <h3 class="subtitle">With FontAwesome</h3>
        <b-field>
            <b-select
                placeholder="Country"
                icon="globe"
                icon-pack="fas">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </b-select>
        </b-field>

        <b-field>
            <b-select
                placeholder="Client"
                icon="user"
                icon-pack="fas">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </b-select>
        </b-field>
    </section>
</template>
