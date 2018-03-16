<template>
    <section>
        <div class="block">
            <button class="button" @click="activeTab = 1">Set Music</button>
        </div>
        <div class="block">
            <b-switch v-model="showBooks"> Show Books item </b-switch>
        </div>
        <b-tabs v-model="activeTab">
            <b-tab-item label="Pictures">
                <template slot="label">
                    <span
                        class="my-class" 
                        :class="{'is-dark': true}" 
                        style="color: red;"> 
                        <strong> {{ text }} </strong> 
                        <b-icon pack="fa" :icon="text"></b-icon>
                    </span>
                </template>
                <div class="block">
                    <button class="button is-primary" @click="switchText">
                        Switch
                    </button>
                </div>
                Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="Music">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </b-tab-item>

            <b-tab-item :visible="showBooks" label="Books">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </b-tab-item>

            <b-tab-item label="Videos" disabled>
                Nunc nec velit nec libero vestibulum eleifend.
                Curabitur pulvinar congue luctus.
                Nullam hendrerit iaculis augue vitae ornare.
                Maecenas vehicula pulvinar tellus, id sodales felis lobortis eget.
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                activeTab: 0,
                showBooks: false,
                text: 'home'
            }
        },
        methods: {
            switchText() {
                this.text = (this.text === 'home' ? 'user' : 'home')
            }
        }
    }
</script>
