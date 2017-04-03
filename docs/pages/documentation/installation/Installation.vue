<template>
    <div class="installation">
        <nav class="nav has-shadow">
            <div class="container">
                <div class="nav-left">
                    <router-link to="quick-start" class="nav-item is-tab">Quick Start</router-link>
                    <router-link to="customization" class="nav-item is-tab">Customization</router-link>
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
