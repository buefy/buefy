<template>
    <section>
        <div class="block">
            <button class="button" @click="activeStep = 1">Set Profile</button>
        </div>
        <div class="block">
            <b-switch v-model="showSocial"> Show Social step </b-switch>
            <b-switch v-model="isAnimated"> Animated </b-switch>
            <b-switch v-model="isStepsClickable"> Clickable Marker </b-switch>
            <b-switch v-model="hasNavigation"> Navigation Buttons </b-switch>
            <b-switch v-model="isProfileSuccess"> Set <code>is-success</code> for profile </b-switch>
        </div>
        <b-steps v-model="activeStep" :animated="isAnimated" :has-navigation="hasNavigation">
            <b-step-item label="Account" :clickable="isStepsClickable">
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item label="Profile" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item :visible="showSocial" label="Social" :clickable="isStepsClickable">
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item label="Finish" :clickable="isStepsClickable" disabled>
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.<br>
                Lorem ipsum dolor sit amet.
            </b-step-item>
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
                isStepsClickable: false,
                isProfileSuccess: false
            }
        }
    }
</script>
