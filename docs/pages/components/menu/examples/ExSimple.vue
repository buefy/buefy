<template>
    <section>
        <b-menu :is-dark="isDark" style="max-height: 300px">
            <div slot="title" style="padding-left: 10px; font-size:2rem;">Logo</div>
            <b-menuitem title="menu1" icon="home"></b-menuitem>
            <b-menuitem title="menu2" icon="qqchat"></b-menuitem>
            <b-submenu title="menu3" icon="wechat">
                <b-menuitem title="menu3-1" icon="account"></b-menuitem>
                <b-menuitem title="menu3-2" icon="access-point"></b-menuitem>
            </b-submenu>
            <b-submenu title="menu4" icon="twitter">
                <b-menuitem title="menu4-1"></b-menuitem>
                <b-menuitem title="menu4-2"></b-menuitem>
            </b-submenu>
        </b-menu>
        <button class="button block" @click="isDark = !isDark">{{ isDark ? 'Light' : 'Dark' }}</button>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                isDark: false
            }
        }
    }
</script>
