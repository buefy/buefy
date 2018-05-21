<template>
    <b-dropdown v-model="isPublic">
        <b-button
            btn="is-primary"
            slot="trigger"
            icon-position="before"
        >
            <template slot="contents">
                <template v-if="isPublic">
                    <b-icon icon="earth"></b-icon>
                    <span>Public</span>
                </template>
                <template v-else>
                    <b-icon icon="account-multiple"></b-icon>
                    <span>Friends</span>
                </template>
                <b-icon icon="menu-down"></b-icon>
            </template>
        </b-button>

        <b-dropdown-item :value="true">
            <div class="media">
                <b-icon class="media-left" icon="earth"></b-icon>
                <div class="media-content">
                    <h3>Public</h3>
                    <small>Everyone can see</small>
                </div>
            </div>
        </b-dropdown-item>

        <b-dropdown-item :value="false">
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
