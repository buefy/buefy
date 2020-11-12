<template>
    <b-dropdown v-model="isPublic" aria-role="list">

        <b-button
            v-if="isPublic"
            slot="trigger"
            label="Public"
            type="is-primary"
            icon-left="earth"
            icon-right="menu-down" />
        <b-button
            v-else
            slot="trigger"
            label="Friends"
            type="is-primary"
            icon-left="account-multiple"
            icon-right="menu-down" />

        <b-dropdown-item :value="true" aria-role="listitem">
            <div class="media">
                <b-icon class="media-left" icon="earth"></b-icon>
                <div class="media-content">
                    <h3>Public</h3>
                    <small>Everyone can see</small>
                </div>
            </div>
        </b-dropdown-item>

        <b-dropdown-item :value="false" aria-role="listitem">
            <div class="media">
                <b-icon class="media-left" icon="account-multiple"></b-icon>
                <div class="media-content">
                    <h3>Friends</h3>
                    <small>Only friends can see</small>
                </div>
            </div>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
    export default {
        data() {
            return {
                isPublic: true
            }
        }
    }
</script>
