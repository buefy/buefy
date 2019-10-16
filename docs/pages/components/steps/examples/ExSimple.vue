<template>
    <section>
        <div class="block">
            <button class="button" @click="activeStep = 1">Set Profile</button>
        </div>
        <div class="block">
            <b-switch v-model="showSocial"> Show Social step </b-switch>
            <b-switch v-model="isAnimated"> Animated </b-switch>
            <b-switch v-model="isStepsClickable"> Clickable Marker </b-switch>
        </div>
        <div class="block">
            <b-switch v-model="hasNavigation"> Navigation Buttons </b-switch>
            <b-switch v-model="customNavigation"> Custom Navigation </b-switch>
            <b-switch v-model="isProfileSuccess"> Set <code>is-success</code> for profile </b-switch>
        </div>
        <b-field v-if="hasNavigation" grouped group-multiline>
            <b-select v-model="prevIcon">
                <option value="chevron-left">Chevron prev icon </option>
                <option value="arrow-left">Arrow prev icon</option>
            </b-select>
            <b-select v-model="nextIcon">
                <option value="chevron-right">Chevron next icon </option>
                <option value="arrow-right">Arrow next icon</option>
            </b-select>
        </b-field>
        <b-steps
            v-model="activeStep"
            :animated="isAnimated"
            :has-navigation="hasNavigation"
            :icon-prev="prevIcon"
            :icon-next="nextIcon">
            <b-step-item label="Account" :clickable="isStepsClickable">
                <h1 class="title has-text-centered">Account</h1>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item label="Profile" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                <h1 class="title has-text-centered">Profile</h1>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item :visible="showSocial" label="Social" :clickable="isStepsClickable">
                <h1 class="title has-text-centered">Social</h1>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item label="Finish" :clickable="isStepsClickable" disabled>
                <h1 class="title has-text-centered">Finish</h1>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <template
                v-if="customNavigation"
                slot="navigation"
                slot-scope="{previous, next}">
                <b-button
                    outlined
                    type="is-danger"
                    icon-pack="fas"
                    icon-left="backward"
                    :disabled="previous.disabled"
                    @click.prevent="previous.action">
                    Previous
                </b-button>
                <b-button
                    outlined
                    type="is-success"
                    icon-pack="fas"
                    icon-right="forward"
                    :disabled="next.disabled"
                    @click.prevent="next.action">
                    Next
                </b-button>
            </template>
        </b-steps>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                activeStep: 0,
                showSocial: false,
                isAnimated: true,
                hasNavigation: true,
                customNavigation: false,
                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
                isStepsClickable: false,
                isProfileSuccess: false
            }
        }
    }
</script>
