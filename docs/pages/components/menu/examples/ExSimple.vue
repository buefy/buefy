<template>
    <b-menu>
        <b-menu-list label="Menu">
            <b-menu-item icon="information-outline" label="Info" />
            <b-menu-item icon="settings" active expanded>
                <template slot="label" slot-scope="props">
                    Administrator
                    <b-icon
                        class="is-pulled-right"
                        :icon="props.expanded ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </template>
                <b-menu-item icon="account" label="Users" />
                <b-menu-item icon="cellphone-link" label="Devices" />
                <b-menu-item icon="cash-multiple" label="Payments" disabled />
            </b-menu-item>
            <b-menu-item icon="account" label="My Account">
                <b-menu-item label="Account data" />
                <b-menu-item label="Addresses" />
            </b-menu-item>
        </b-menu-list>
        <b-menu-list>
            <b-menu-item
                label="Expo"
                icon="link"
                tag="router-link"
                target="_blank"
                to="/expo" />
        </b-menu-list>
        <b-menu-list label="Actions">
            <b-menu-item label="Logout" />
        </b-menu-list>
    </b-menu>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                { label: 'Info', icon: 'information-outline' },
                { label: '', icon: 'settings',
                    children: [
                        { label: 'Info', icon: 'information-outline' },
                        { label: 'Info', icon: 'information-outline' }
                    ]
                }
            ]
        }
    }
}
</script>
