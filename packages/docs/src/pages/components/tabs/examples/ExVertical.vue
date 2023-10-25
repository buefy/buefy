<template>
    <section>
        <b-field grouped group-multiline>
            <div class="control">
                <b-switch v-model="atRight"> Right position </b-switch>
            </div>
            <div class="control">
                <b-switch v-model="expanded"> Expanded </b-switch>
            </div>
            <b-field label="Size" label-position="on-border">
                <b-select v-model="size" placeholder="Size">
                    <option :value="null">Default</option>
                    <option value="is-small">Small</option>
                    <option value="is-medium">Medium</option>
                    <option value="is-large">Large</option>
                </b-select>
            </b-field>
            <b-field label="Type" label-position="on-border">
                <b-select v-model="type" placeholder="Type">
                    <option :value="null">Default</option>
                    <option value="is-boxed">Boxed</option>
                    <option value="is-toggle">Toggle</option>
                </b-select>
            </b-field>
        </b-field>

        <b-tabs :position="atRight ? 'is-right' : ''"
                :size="size"
                :type="type"
                vertical
                :expanded="expanded">
            <b-tab-item label="Pictures" icon="camera-iris">
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet. <br>
                Lorem ipsum dolor sit amet.
            </b-tab-item>

            <b-tab-item label="Music" icon="music-box-multiple">
                What light is light, if Silvia be not seen? <br>
                What joy is joy, if Silvia be not by— <br>
                Unless it be to think that she is by <br>
                And feed upon the shadow of perfection? <br>
                Except I be by Silvia in the night, <br>
                There is no music in the nightingale.
            </b-tab-item>

            <b-tab-item label="Videos" icon="video" disabled>
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
                expanded: false,
                atRight: false,
                size: null,
                type: null
            }
        }
    }
</script>
