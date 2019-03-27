<template>
    <section>
        <form @submit.prevent="validateBeforeSubmit">

            <b-field label="First name"
                :type="{'is-danger': errors.has('firstname')}"
                :message="errors.first('firstname')">
                <b-input v-model="firstname" name="firstname" v-validate="'required'" />
            </b-field>

            <b-field label="Last name"
                :type="{'is-danger': errors.has('lastname')}"
                :message="errors.first('lastname')">
                <b-input v-model="lastname" name="lastname" v-validate="'required'" />
            </b-field>

            <b-field label="Age"
                :type="{'is-danger': errors.has('age')}"
                :message="errors.first('age')">
                <b-input type="number" v-model="age" name="age" v-validate="'required|integer|between:18,65'" />
            </b-field>

            <b-field label="Gender"
                :addons="false"
                :type="{'is-danger': errors.has('gender')}"
                :message="errors.first('gender')">
                <b-radio v-model="gender" name="gender" native-value="M" v-validate="'required'">
                    Male
                </b-radio>
                <b-radio v-model="gender" name="gender" native-value="F" v-validate="'required'">
                    Female
                </b-radio>
            </b-field>

            <b-field label="Username"
                :type="{'is-danger': errors.has('username')}"
                :message="errors.first('username')">
                <b-input type="text" v-model="username" name="username" v-validate="'required|alpha'" />
            </b-field>

            <b-field label="Password"
                :type="{'is-danger': errors.has('password')}"
                :message="errors.first('password')">
                <b-input type="password" v-model="password" name="password" v-validate="'required|min:8'" />
            </b-field>

            <b-field label="Confirm password"
                :type="{'is-danger': errors.has('confirm-password')}"
                :message="[{
                    'The confirm password field is required' : errors.firstByRule('confirm-password', 'required'),
                    'The confirm password is not valid' : errors.firstByRule('confirm-password', 'is')
                }]">
                <b-input type="password" v-model="confirmPassword" name="confirm-password"
                    v-validate="{ required: true, is: password }" />
            </b-field>

            <b-field label="Where did you find us ?"
                :type="{'is-danger': errors.has('question')}"
                :message="errors.first('question')">
                <b-select v-model="question" name="question" placeholder="Select an option" v-validate="'required'">
                    <option value="google">Google</option>
                    <option value="github">Github</option>
                    <option value="other">Other</option>
                </b-select>
            </b-field>

            <b-field label=""
                :type="{'is-danger': errors.has('flag-terms')}"
                :message="{'Please check this box to proceed' : errors.firstByRule('flag-terms', 'required')}">
                <b-checkbox v-model="flagTerms" name="flag-terms" v-validate="'required:false'">
                    I agree to the terms and conditions
                </b-checkbox>
            </b-field>

            <button type="submit" class="button is-primary"> Submit </button>
        </form>
    </section>
</template>

<script>
    import Vue from 'vue'
    // You have to install VeeValidate to use it:
    // 'npm install vee-validate'
    import VeeValidate from 'vee-validate'

    Vue.use(VeeValidate, {
        events: ''
    })

    export default {
        data() {
            return {
                firstname: null,
                lastname: null,
                age: null,
                username: null,
                password: null,
                confirmPassword: null,
                gender: null,
                question: null,
                flagTerms: false
            }
        },
        methods: {
            validateBeforeSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        this.$toast.open({
                            message: 'Form is valid!',
                            type: 'is-success',
                            position: 'is-bottom'
                        })
                        return;
                    }
                    this.$toast.open({
                        message: 'Form is not valid! Please check the fields.',
                        type: 'is-danger',
                        position: 'is-bottom'
                    })
                });
            }
        }
    }
</script>
