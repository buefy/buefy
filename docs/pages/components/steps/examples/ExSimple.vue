<template>
    <section>
        <div class="block">
            <b-switch v-model="showSocial"> Show Social step </b-switch>
            <b-switch v-model="isAnimated"> Animated </b-switch>
            <b-switch v-model="isRounded"> Rounded </b-switch>
            <b-switch v-model="isStepsClickable"> Clickable Marker </b-switch>
        </div>
        <div class="block">
            <b-switch v-model="hasNavigation"> Navigation Buttons </b-switch>
            <b-switch v-model="customNavigation"> Custom Navigation </b-switch>
            <b-switch v-model="isProfileSuccess"> Set <code>is-success</code> for profile </b-switch>
        </div>
        <b-field v-if="hasNavigation" grouped group-multiline>
            <b-field label="Prev icon">
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
            <b-field label="Label position">
                <b-select v-model="labelPosition">
                    <option value="bottom">Bottom</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                </b-select>
            </b-field>
        </b-field>
        <b-steps
            v-model="activeStep"
            :animated="isAnimated"
            :rounded="isRounded"
            :has-navigation="hasNavigation"
            :icon-prev="prevIcon"
            :icon-next="nextIcon"
            :label-position="labelPosition">
            <b-step-item step="1" label="Account" :clickable="isStepsClickable">
                <h1 class="title has-text-centered">Account</h1>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item step="2" label="Profile" :clickable="isStepsClickable" :type="{'is-success': isProfileSuccess}">
                <h1 class="title has-text-centered">Profile</h1>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item step="3" :visible="showSocial" label="Social" :clickable="isStepsClickable">
                <h1 class="title has-text-centered">Social</h1>
                Lorem ipsum dolor sit amet.
            </b-step-item>

            <b-step-item :step="showSocial ? 4 : 3" label="Finish" :clickable="isStepsClickable" disabled>
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
                isRounded: true,
                isStepsClickable: false,

                hasNavigation: true,
                customNavigation: false,
                isProfileSuccess: false,

                prevIcon: 'chevron-left',
                nextIcon: 'chevron-right',
                labelPosition: 'bottom'
            }
        }
    }
</script>
