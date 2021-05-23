<template>
    <section>
        <div class="block">
            <b-radio v-model="labelPosition"
                native-value="on-border">
                On Border
            </b-radio>
            <b-radio v-model="labelPosition"
                native-value="inside">
                Inside
            </b-radio>
        </div>

        <b-field label="Name" :label-position="labelPosition">
            <b-input model-value="Kevin Garvey"></b-input>
        </b-field>

        <b-field label="Email"
            :label-position="labelPosition"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                model-value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Username"
            :label-position="labelPosition"
            type="is-success"
            message="This username is available">
            <b-input model-value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password"
            :label-position="labelPosition"
            type="is-warning">
            <b-input model-value="123" type="password" maxlength="30"></b-input>
            <template #message>
                <div>Password is too short</div>
                <div>Password must have at least 8 characters</div>
            </template>
        </b-field>

        <b-field label="Subject"
            :label-position="labelPosition">
            <b-select placeholder="Select a subject">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </b-select>
        </b-field>

        <b-field label="Message"
            :label-position="labelPosition">
            <b-input maxlength="200" type="textarea"></b-input>
        </b-field>

        <b-field label="Find a JS framework" :label-position="labelPosition">
            <b-autocomplete
                rounded
                :data="['jQuery', 'Vue', 'React']"
                placeholder="e.g. jQuery"
                icon="magnify"
                clearable
                @select="option => selected = option">
                <template #empty>No results found</template>
            </b-autocomplete>
        </b-field>

        <b-field label="Select a date" :label-position="labelPosition">
            <b-datepicker
                placeholder="Click to select..."
                icon="calendar-today"
                trap-focus>
            </b-datepicker>
        </b-field>

        <b-field label="Select datetime" :label-position="labelPosition">
            <b-datetimepicker
                rounded
                placeholder="Click to select..."
                icon="calendar-today"
                horizontal-time-picker>
            </b-datetimepicker>
        </b-field>

        <b-field label="Number!" :label-position="labelPosition">
            <b-numberinput laceholder="99" :min="95"></b-numberinput>
        </b-field>

        <b-field label="Add some tags" :label-position="labelPosition">
            <b-taginput
                :model-value="['My first tag', 'My second tag']"
                ellipsis
                icon="label"
                placeholder="Add a tag">
            </b-taginput>
        </b-field>

        <b-field label="Select time" :label-position="labelPosition">
            <b-timepicker
                rounded
                placeholder="Click to select..."
                icon="clock">
            </b-timepicker>
        </b-field>

        <hr>
        <p class="title is-6">Also works for grouped field and with addons.</p>

        <b-field label="Search..." :label-position="labelPosition" grouped>
            <b-input placeholder="Search..." type="search"></b-input>
            <p class="control">
                <b-button class="button is-primary">Search</b-button>
            </p>
        </b-field>

        <b-field label="Search..." :label-position="labelPosition">
            <b-input placeholder="Search..." type="search"></b-input>
            <p class="control">
                <b-button class="button is-primary">Search</b-button>
            </p>
        </b-field>
    </section>
</template>

<script>
export default {
    data() {
        return {
            labelPosition: 'on-border'
        }
    }
}
</script>

