<template>
    <section>
        <button class="button block" @click="activeTab = 1">Set Music</button>
        <b-tabs v-model="activeTab">
            <b-tab-item label="Pictures">
                Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="Music">
                Lorem <br>
                ipsum <br>
                dolor <br>
                sit <br>
                amet.
            </b-tab-item>

            <b-tab-item label="Videos">
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
                activeTab: 0
            }
        }
    }
</script>
