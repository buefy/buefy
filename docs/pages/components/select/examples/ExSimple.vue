<template>
    <section>
        <b-field label="Simple">
            <b-select placeholder="Select a name">
                <option
                    v-for="option in data"
                    :value="option.id"
                    :key="option.id">
                    {{ option.user.first_name }}
                </option>
            </b-select>
        </b-field>

        <b-field label="Grouped">
            <b-select placeholder="Select a character" icon="account">
                <optgroup label="Black Sails">
                    <option value="flint">Flint</option>
                    <option value="silver">Silver</option>
                    <option value="vane">Vane</option>
                    <option value="billy">Billy</option>
                    <option value="jack">Jack</option>
                </optgroup>

                <optgroup label="Breaking Bad">
                    <option value="heisenberg">Heisenberg</option>
                    <option value="jesse">Jesse</option>
                    <option value="saul">Saul</option>
                    <option value="mike">Mike</option>
                </optgroup>

                <optgroup label="Game of Thrones">
                    <option value="tyrion-lannister">Tyrion Lannister</option>
                    <option value="jamie-lannister">Jamie Lannister</option>
                    <option value="daenerys-targaryen">Daenerys Targaryen</option>
                    <option value="jon-snow">Jon Snow</option>
                </optgroup>
            </b-select>
        </b-field>

        <b-field
            label="Error"
            type="is-danger"
            message="Something went wrong with this field">
            <b-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Rounded">
            <b-select placeholder="Select a character" rounded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Required">
            <b-select placeholder="Select a character" required>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Loading">
            <b-select placeholder="Select a character" loading>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Disabled">
            <b-select placeholder="Select a character" disabled>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>

        <b-field label="Disabled option">
            <b-select placeholder="Select a character">
                <option value="flint">Flint</option>
                <option value="silver" disabled>Silver</option>
            </b-select>
        </b-field>

        <b-field
            label="Expanded">
            <b-select placeholder="Select a character" expanded>
                <option value="flint">Flint</option>
                <option value="silver">Silver</option>
            </b-select>
        </b-field>
    </section>
</template>

<script>
    const data = require('@/assets/data_test.json')

    export default {
        data() {
            return { data }
        }
    }
</script>
