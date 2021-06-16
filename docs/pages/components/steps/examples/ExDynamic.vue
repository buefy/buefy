<template>
    <section>
        <div class="block">
            <b-switch v-model="showMusic"> Show Music item (using <code>v-if</code>) </b-switch>
        </div>
        <div class="block">
            <b-switch v-model="showBooks"> Show books item (by adding / removing from the array) </b-switch>
        </div>
        <div class="block">
            <b-switch v-model="showGames"> Show games item (by using the visible property) </b-switch>
        </div>
        <b-steps v-model="activeStep">
            <template v-for="(step, index) in steps" :key="index">
                <b-step-item
                    v-if="step.displayed"
                    :visible="step.visible !== undefined ? step.visible : true"
                    :label="step.label"
                    :order="index"
                >
                    {{ step.content }}
                </b-step-item>
            </template>
        </b-steps>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                activeStep: 0,
                showMusic: true,
                showBooks: false,
                showGames: false
            }
        },
        computed: {
            baseSteps() {
                return [
                    {
                        label: 'Pictures',
                        content: 'Pictures: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    },
                    {
                        label: 'Music',
                        content: 'Music: Lorem ipsum dolor sit amet.',
                        displayed: this.showMusic,
                    },
                    {
                        label: 'Games',
                        content: 'Games: Lorem ipsum dolor sit amet.',
                        displayed: true,
                        visible: this.showGames
                    },
                    {
                        label: 'Videos',
                        content: 'Videos: Lorem ipsum dolor sit amet.',
                        displayed: true,
                    }
                ]
            },
            steps() {
                const steps = [...this.baseSteps]
                if (this.showBooks) {
                    steps.splice(steps.length - 1, 0, this.bookStep);
                }
                return steps
            },
            bookStep() {
                return {
                    label: 'Books',
                    content: 'Books: Lorem ipsum dolor sit amet.',
                    displayed: true,
                }
            }
        }
    }
</script>
