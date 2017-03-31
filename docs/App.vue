<template>
    <div id="app">
        <nav class="nav has-shadow">
            <div class="container">
                <div class="nav-left">
                    <router-link to="/" exact class="nav-item"><strong>Buefy</strong></router-link>
                </div>
                <div class="nav-center">
                    <router-link to="/" exact class="nav-item">Home</router-link>
                    <router-link to="/table" exact class="nav-item">Table (Data)</router-link>
                </div>
            </div>
        </nav>
        <section class="section">
            <div class="container">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<style lang="scss">
    @import "~bulma";
    @import "../src/scss/main";
</style>
