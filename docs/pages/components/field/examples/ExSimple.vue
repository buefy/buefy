<template>
    <section>
        <b-field label="Name">
            <b-input model-value="Kevin Garvey"></b-input>
        </b-field>

        <b-field label="Email"
            type="is-danger"
            message="This email is invalid">
            <b-input type="email"
                model-value="john@"
                maxlength="30">
            </b-input>
        </b-field>

        <b-field label="Username"
            type="is-success"
            message="This username is available">
            <b-input model-value="johnsilver" maxlength="30"></b-input>
        </b-field>

        <b-field label="Password"
            type="is-warning"
            :message="['Password is too short', 'Password must have at least 8 characters']">
            <b-input model-value="123" type="password" maxlength="30"></b-input>
        </b-field>

        <b-field label="Subject">
            <b-select placeholder="Select a subject">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </b-select>
        </b-field>
    </section>
</template>
